'use client';

import { useAnimate } from 'framer-motion';
import { ArrowRight, ArrowDown, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHeroReady } from '@/components/HeroReadyProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useTypewriter } from '@/hooks/useTypewriter';

const REVEAL_FALLBACK_MS = 1200;
// The Hero's text/CTA reveal must never wait on video.play() resolving — Safari iOS
// (Low Power Mode, certain contexts) can reject even a muted+playsInline attempt. This
// is the hard cap: whichever of "video actually starts" or this timeout comes first.
const HERO_TEXT_REVEAL_FALLBACK_MS = 700;
// Separate cap for the video specifically: if it's still paused this long after the
// automatic attempt begins (rejected outright, or silently never actually started),
// surface the "Toca para iniciar" overlay immediately rather than leaving the visitor
// to discover by accident that a tap/scroll would have started it.
const VIDEO_STILL_PAUSED_CHECK_MS = 700;

// q_auto re-muxes the MP4 with a front-loaded moov atom (verified via ffprobe: the
// original upload has moov at the very end, which iOS Safari's AVFoundation player can
// refuse to start progressive playback on — Android/desktop are far more lenient about
// this). Same H.264 High/yuv420p + AAC codec, ~57% smaller. The original upload is
// untouched; this is a derived, cached transformation.
const HERO_VIDEO_SRC = 'https://res.cloudinary.com/epea8suu/video/upload/q_auto/v1789140783/aarom-hero.mp4';
const HERO_VIDEO_POSTER =
  'https://res.cloudinary.com/epea8suu/video/upload/so_0,w_1600,q_auto,f_auto/v1789140783/aarom-hero.jpg';

function logDev(label: string, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production') return;
  // eslint-disable-next-line no-console
  console.log(`[hero-video] ${label}`, data ?? {});
}
const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// RIGHT — four lines, explicitly sequential (not "all at once"). Desktop timing is the
// source of truth; mobile derives from it via `timeScale` (delay/duration/stagger all
// scale together), which lands mobile within its own slightly-faster target range.
const RIGHT_LINE_STARTS_MS = [200, 500, 800, 1100];
const RIGHT_LINE_DURATION_S = 1.0;
const RIGHT_CHAR_STAGGER_S = 0.03;

// LEFT — hybrid: typewriter for the eyebrow, fast character reveal for the name,
// word-by-word for the description, staggered buttons. Only the coarse per-block start
// offsets scale down for mobile (via timeScale); the fine per-character/word cadence
// stays the same crispness on both.
const LEFT_MARKER_START_S = 0.2;
const LEFT_CURSOR_MS = 200;
const LEFT_TYPE_START_MS = 300;
const LEFT_TYPE_MS_PER_CHAR = 45;
const LEFT_NAME_START_MS = 850;
const LEFT_NAME_CHAR_STAGGER_S = 0.04;
const LEFT_NAME_CHAR_DURATION_S = 0.45;
const LEFT_DESC_START_MS = 1350;
const LEFT_DESC_WORD_STAGGER_S = 0.045;
const LEFT_DESC_WORD_DURATION_S = 0.5;
const LEFT_BUTTONS_START_MS = 1900;
const LEFT_BUTTON_GAP_MS = 120;
const LEFT_BUTTON_DURATION_S = 0.5;
const CURSOR_LINGER_MS = 350;

// Below `lg`, the LEFT block lives in its own panel under the video instead of the
// desktop three-zone layout — its entrance only plays once that panel is actually
// on screen (desktop's panel is already in the first viewport, so this gate is
// effectively immediate there; on mobile/tablet it waits for scroll).
const PANEL_IN_VIEW_THRESHOLD = 0.25;

const EYEBROW_TEXT = '01 SOFTWARE DEVELOPER';
const NAME_LINES = ['Aarom', 'Villanueva'];
const DESCRIPTION_WORDS = 'Diseño y desarrollo de experiencias digitales que convierten ideas en productos funcionales.'.split(
  ' '
);
const DESCRIPTION_TEXT = DESCRIPTION_WORDS.join(' ');

type PhraseLine = { key: string; text: string; accent?: boolean };

const PHRASE_LINES: PhraseLine[] = [
  { key: 'construyo', text: 'Construyo' },
  { key: 'productos', text: 'Productos.' },
  { key: 'no-solo', text: 'No solo', accent: true },
  { key: 'proyectos', text: 'Proyectos.' },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const { markHeroReady, heroRevealStarted, preloaderDone } = useHeroReady();
  const prefersReducedMotion = usePrefersReducedMotion();

  const rightAnimatedRef = useRef(false);
  const leftAnimatedRef = useRef(false);
  // Guards the text/CTA reveal so it only ever fires once, from whichever path (the
  // video actually starting, or the fallback cap) gets there first.
  const heroRevealedRef = useRef(false);
  // True while a play() attempt is in flight or has succeeded; reset to false only on
  // rejection, so a manual retry (via the "Toca para iniciar" overlay, or the first
  // tap/touch anywhere on the Hero) is possible without ever allowing a
  // duplicate/concurrent play() call.
  const videoAttemptRef = useRef(false);
  // Guards the Hero-wide pointerdown/touchend fallback so it only ever fires once.
  const heroTapResumeAttemptedRef = useRef(false);
  const [heroStarted, setHeroStarted] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [panelInView, setPanelInView] = useState(false);
  const [typewriterStart, setTypewriterStart] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const { visibleText: eyebrowVisible, done: eyebrowDone } = useTypewriter(
    EYEBROW_TEXT,
    typewriterStart && !prefersReducedMotion,
    LEFT_TYPE_MS_PER_CHAR
  );

  const revealHero = useCallback(() => {
    if (heroRevealedRef.current) return;
    heroRevealedRef.current = true;
    setHeroStarted(true);
  }, []);

  // Dev-only diagnostic (stripped from production by the NODE_ENV check inside logDev).
  useEffect(() => {
    logDev('prefers-reduced-motion', { prefersReducedMotion });
  }, [prefersReducedMotion]);

  // Tells the Preloader (unchanged) that the video has buffered enough data — this only
  // affects when the Preloader is willing to start its exit, never playback itself.
  useEffect(() => {
    if (prefersReducedMotion) {
      markHeroReady();
      return;
    }

    const video = videoRef.current;
    const markReady = () => markHeroReady();

    if (video && video.readyState >= 2) {
      markReady();
    } else {
      video?.addEventListener('loadeddata', markReady, { once: true });
      video?.addEventListener('canplay', markReady, { once: true });
    }

    const fallback = window.setTimeout(markReady, REVEAL_FALLBACK_MS);

    return () => {
      video?.removeEventListener('loadeddata', markReady);
      video?.removeEventListener('canplay', markReady);
      window.clearTimeout(fallback);
    };
  }, [prefersReducedMotion, markHeroReady]);

  // The single protected entry point for the automatic (non-gesture) playback attempt.
  // videoAttemptRef is set to true BEFORE awaiting play(), so no second/concurrent call
  // can ever run this again — except a deliberate retry after a rejection (see the
  // catch branch), which is the only case that resets the guard. Never resets
  // currentTime (a fresh <video> already starts at 0, and a retry must never jump the
  // playhead) and never touches heroStarted: a failed or never-resolving play() must
  // not be able to leave the Hero's text/CTAs hidden.
  const startHeroVideo = useCallback(async () => {
    if (videoAttemptRef.current) return;
    const video = videoRef.current;
    if (!video) return;

    videoAttemptRef.current = true;
    setPlaybackBlocked(false);

    // Set imperatively right before play() — Safari iOS is more reliable about
    // honoring muted/inline playback this way than trusting the HTML attributes alone.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    try {
      await video.play();
      logDev('play() resolved', { readyState: video.readyState, networkState: video.networkState });
      // Belt-and-suspenders: the 'playing' event listener below is the primary path,
      // but if it already fired first this is a no-op (revealHero is guarded).
      revealHero();
    } catch (error) {
      // Safari (Low Power Mode, certain contexts) can reject even a muted+playsInline
      // play() call. The video simply stays on its poster/first frame — composition
      // and the text/CTA reveal (already handled separately) are unaffected. The
      // VIDEO_STILL_PAUSED_CHECK_MS check in the calling effect surfaces the "Toca
      // para iniciar" overlay; the first tap/touch anywhere on the Hero also retries.
      const err = error instanceof Error ? error : null;
      logDev('play() rejected', {
        name: err?.name,
        message: err?.message,
        readyState: video.readyState,
        networkState: video.networkState,
        videoError: video.error ? { code: video.error.code, message: video.error.message } : null,
      });
      videoAttemptRef.current = false;
      setPlaybackBlocked(true);
    }
  }, [revealHero]);

  // Manual, gesture-driven playback attempt: video.play() is the very first thing this
  // function does, synchronously, with no `await` before it — required for Safari to
  // credit the call to the real tap/click that invoked it (an async function's first
  // `await`, a setTimeout, or a chained promise breaks that gesture chain). Used
  // directly by the "Toca para iniciar" overlay's onClick and the Hero-wide
  // pointerdown/touchend fallback. Shares videoAttemptRef with startHeroVideo so the
  // two can never both have a call in flight at once.
  const attemptManualVideoPlay = useCallback(() => {
    if (videoAttemptRef.current) return;
    const video = videoRef.current;
    if (!video) return;

    videoAttemptRef.current = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    setPlaybackBlocked(false);

    video
      .play()
      .then(() => {
        logDev('manual play() resolved', { readyState: video.readyState });
        revealHero();
      })
      .catch((error: unknown) => {
        const err = error instanceof Error ? error : null;
        logDev('manual play() rejected', {
          name: err?.name,
          message: err?.message,
          readyState: video.readyState,
          networkState: video.networkState,
          videoError: video.error ? { code: video.error.code, message: video.error.message } : null,
        });
        videoAttemptRef.current = false;
        setPlaybackBlocked(true);
      });
  }, [revealHero]);

  // Hides the retry affordance and reveals the Hero the instant the video is actually
  // rendering frames — the most reliable signal, independent of when the play()
  // promise itself settles (which can lag slightly behind on some browsers).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => {
      logDev('playing event');
      setPlaybackBlocked(false);
      revealHero();
    };
    video.addEventListener('playing', onPlaying);
    return () => video.removeEventListener('playing', onPlaying);
  }, [revealHero]);

  // The text/CTA reveal is keyed on heroRevealStarted (the instant the curtain begins
  // leaving — unchanged from before, already confirmed working) and is fully decoupled
  // from whether the video ever plays: capped by HERO_TEXT_REVEAL_FALLBACK_MS
  // regardless of what the separate video-attempt effect below is doing.
  useEffect(() => {
    if (!heroRevealStarted) return;

    if (prefersReducedMotion) {
      revealHero();
      return;
    }

    const fallback = window.setTimeout(revealHero, HERO_TEXT_REVEAL_FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [heroRevealStarted, prefersReducedMotion, revealHero]);

  // The automatic video.play() attempt is a separate concern, keyed on preloaderDone —
  // the curtain's real exit animation actually finishing (Preloader's phase reaching
  // 'done'), not just beginning to leave. Calling play() while that animation is still
  // mid-flight is exactly what was showing up as a silent, unexplained rejection on
  // some iPhones. Two rAFs after that let the resulting layout/paint settle before
  // Safari is asked to start decoding. If the video is still paused
  // VIDEO_STILL_PAUSED_CHECK_MS later — rejected outright, or silently stalled —
  // the "Toca para iniciar" overlay appears immediately, without waiting for the
  // visitor to stumble onto the tap/scroll fallback below by accident.
  useEffect(() => {
    if (!preloaderDone || prefersReducedMotion) return;

    const video = videoRef.current;
    let raf1 = 0;
    let raf2 = 0;
    let blockedCheck = 0;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!video) return;
        if (video.readyState >= 2) {
          startHeroVideo();
        } else {
          video.addEventListener('canplay', startHeroVideo, { once: true });
        }

        blockedCheck = window.setTimeout(() => {
          if (video.paused) {
            logDev('still paused after check window — showing tap overlay', {
              readyState: video.readyState,
              networkState: video.networkState,
            });
            setPlaybackBlocked(true);
          }
        }, VIDEO_STILL_PAUSED_CHECK_MS);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(blockedCheck);
      video?.removeEventListener('canplay', startHeroVideo);
    };
  }, [preloaderDone, prefersReducedMotion, startHeroVideo]);

  // Last-resort fallback: if the video is still paused by the time the visitor's first
  // tap/click lands anywhere on the Hero, treat it as the real user gesture Safari
  // wants and retry once. No-ops (and never re-arms) once the video is playing.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = scope.current;
    if (!el) return;

    const tryResume = () => {
      if (heroTapResumeAttemptedRef.current) return;
      const video = videoRef.current;
      if (!video || !video.paused) return;
      heroTapResumeAttemptedRef.current = true;
      logDev('resuming from first Hero pointerdown/touchend');
      attemptManualVideoPlay();
    };

    el.addEventListener('pointerdown', tryResume, { once: true });
    el.addEventListener('touchend', tryResume, { once: true });
    return () => {
      el.removeEventListener('pointerdown', tryResume);
      el.removeEventListener('touchend', tryResume);
    };
  }, [prefersReducedMotion, attemptManualVideoPlay, scope]);

  // Gates the LEFT panel's entrance below `lg`, where it sits under the fold on short
  // viewports. Fires once, never re-triggers on scroll-out (once: true equivalent).
  useEffect(() => {
    if (prefersReducedMotion) {
      setPanelInView(true);
      return;
    }
    const el = panelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPanelInView(true);
          observer.disconnect();
        }
      },
      { threshold: PANEL_IN_VIEW_THRESHOLD }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // RIGHT — display phrase. Runs purely off heroStarted, on every breakpoint, exactly
  // as before: it's part of the video-reveal beat, not the below-the-fold panel.
  useEffect(() => {
    if (!heroStarted || rightAnimatedRef.current || !scope.current) return;
    rightAnimatedRef.current = true;

    if (prefersReducedMotion) {
      animate('[data-right-line], [data-right-char]', { opacity: 1 }, { duration: 0.25 });
      return;
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const timeScale = isMobile ? 0.8 : 1;
    const lineFromX = isMobile ? 60 : 140;
    const blurPx = isMobile ? 3 : 5;
    const charStagger = RIGHT_CHAR_STAGGER_S * timeScale;

    const lines = Array.from(scope.current?.querySelectorAll('[data-right-line]') ?? []) as HTMLElement[];
    lines.forEach((lineEl, li) => {
      const delay = (RIGHT_LINE_STARTS_MS[li] / 1000) * timeScale;
      animate(
        lineEl,
        { x: [lineFromX, 0], clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'] },
        { duration: RIGHT_LINE_DURATION_S * timeScale, delay, ease: cinematicEase }
      );
      const chars = Array.from(lineEl.querySelectorAll('[data-right-char]')) as HTMLElement[];
      chars.forEach((charEl, ci) => {
        animate(
          charEl,
          { opacity: [0, 1], y: [22, 0], skewY: [4, 0], filter: [`blur(${blurPx}px)`, 'blur(0px)'] },
          { duration: RIGHT_LINE_DURATION_S * 0.65 * timeScale, delay: delay + ci * charStagger, ease: cinematicEase }
        );
      });
    });
  }, [heroStarted, prefersReducedMotion, animate, scope]);

  // LEFT — marker, typewriter eyebrow, name reveal, description, buttons. Gated on the
  // panel actually being in view so it never plays off-screen on mobile/tablet.
  useEffect(() => {
    if (!heroStarted || !panelInView || leftAnimatedRef.current || !scope.current) return;
    leftAnimatedRef.current = true;

    if (prefersReducedMotion) {
      animate('[data-name-char], [data-desc-word], [data-left-button]', { opacity: 1 }, { duration: 0.25 });
      return;
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const timeScale = isMobile ? 0.8 : 1;

    const marker = scope.current?.querySelector('[data-left-marker]') as HTMLElement | null;
    if (marker) {
      animate(marker, { scaleX: [0, 1] }, { duration: 0.3, delay: LEFT_MARKER_START_S * timeScale, ease: cinematicEase });
    }

    const timers = [
      window.setTimeout(() => setCursorVisible(true), LEFT_CURSOR_MS * timeScale),
      window.setTimeout(() => setTypewriterStart(true), LEFT_TYPE_START_MS * timeScale),
      window.setTimeout(() => {
        const nameChars = Array.from(scope.current?.querySelectorAll('[data-name-char]') ?? []) as HTMLElement[];
        nameChars.forEach((el, ci) => {
          animate(
            el,
            { y: [16, 0], opacity: [0, 1] },
            { duration: LEFT_NAME_CHAR_DURATION_S, delay: ci * LEFT_NAME_CHAR_STAGGER_S, ease: cinematicEase }
          );
        });
      }, LEFT_NAME_START_MS * timeScale),
      window.setTimeout(() => {
        const words = Array.from(scope.current?.querySelectorAll('[data-desc-word]') ?? []) as HTMLElement[];
        words.forEach((el, wi) => {
          animate(
            el,
            { y: [10, 0], opacity: [0, 1] },
            { duration: LEFT_DESC_WORD_DURATION_S, delay: wi * LEFT_DESC_WORD_STAGGER_S, ease: cinematicEase }
          );
        });
      }, LEFT_DESC_START_MS * timeScale),
      window.setTimeout(() => {
        const buttons = Array.from(scope.current?.querySelectorAll('[data-left-button]') ?? []) as HTMLElement[];
        buttons.forEach((el, bi) => {
          animate(
            el,
            { x: [-16, 0], opacity: [0, 1], clipPath: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'] },
            { duration: LEFT_BUTTON_DURATION_S, delay: (bi * LEFT_BUTTON_GAP_MS) / 1000, ease: cinematicEase }
          );
        });
      }, LEFT_BUTTONS_START_MS * timeScale),
    ];

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [heroStarted, panelInView, prefersReducedMotion, animate, scope]);

  // Cursor stops blinking once typing finishes, fades shortly after.
  useEffect(() => {
    if (!eyebrowDone) return;
    const t = window.setTimeout(() => setCursorVisible(false), CURSOR_LINGER_MS);
    return () => window.clearTimeout(t);
  }, [eyebrowDone]);

  return (
    <section
      id="hero"
      ref={scope}
      className="relative overflow-x-hidden bg-[#030303] lg:min-h-[100dvh] lg:overflow-hidden"
    >
      {/* VISUAL SCENE — video + phrase. Below `lg` this is a contained block (its own
          height, its own bottom gradient); at `lg` it becomes the full-bleed backdrop
          for the absolute three-zone desktop layout, unchanged from before. */}
      <div className="relative h-[70svh] min-h-[440px] w-full overflow-hidden sm:h-[72svh] md:h-[78svh] lg:absolute lg:inset-0 lg:h-full lg:min-h-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[center_22%] lg:object-center"
          src={HERO_VIDEO_SRC}
          poster={HERO_VIDEO_POSTER}
          preload="auto"
          // Conditional, not the static `autoPlay` JSX shorthand: reduced-motion must
          // stay on its poster with no autoplay attempt at all, matching the effect
          // below — a bare `autoPlay` attribute would bypass that entirely.
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45" />
        {/* Bottom fade reaches full black so the scene meets the panel below it with no
            visible seam or color mismatch — the panel is solid black too. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:from-black/30 lg:via-transparent lg:to-transparent" />

        {/* Discreet tap-to-play overlay for the confirmed real-world case: Safari iOS
            rejects the autoplay attempt (Low Power Mode, certain contexts) until it
            receives a genuine gesture. Covers the video's own area so a tap anywhere
            on it counts; poster stays visible underneath (transparent, not a scrim) so
            nothing about the composition is hidden — text and CTAs are already visible
            regardless, this only concerns the video itself. Appears immediately (no
            waiting for the visitor to discover scroll/tap by accident); removed the
            instant the native 'playing' event fires. */}
        {playbackBlocked && (
          <button
            type="button"
            onClick={attemptManualVideoPlay}
            aria-label="Reproducir video de fondo"
            className="hero-play-overlay absolute inset-0 z-[3] flex items-center justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/60 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md">
              <Play className="h-4 w-4" aria-hidden="true" />
              Toca para iniciar
            </span>
          </button>
        )}

        {/* RIGHT — display phrase (design unchanged: font, sizes, colors, position at
            `lg`). Below `lg` it overlays the bottom of the visual scene instead of
            sitting beside the portrait. At `lg`, vertically centered against the Hero's
            full height via top:50% + a translateY nudge (not inset-y-0, which a stray
            bottom override was fighting — pinning it flush to the Navbar). */}
        <h1 className="absolute inset-x-5 bottom-6 z-[2] text-left text-white sm:inset-x-8 sm:bottom-8 md:inset-x-10 lg:inset-x-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-[55%] lg:right-[clamp(2rem,4vw,6rem)] lg:flex lg:w-[33vw] lg:flex-col">
          <span className="sr-only">Construyo productos. No solo proyectos.</span>
          <div aria-hidden="true">
            {PHRASE_LINES.map((line) => (
              <div key={line.key} className="relative">
                {line.accent && (
                  <span aria-hidden="true" className="absolute -left-4 top-[8%] h-[78%] w-[3px] bg-[#789DFF]" />
                )}
                <div className="overflow-hidden">
                  <div
                    data-right-line
                    style={{ fontFamily: 'var(--font-antonio)', clipPath: 'inset(0% 100% 0% 0%)' }}
                    className={`flex text-[clamp(2.8rem,12vw,4.8rem)] font-bold uppercase leading-[0.86] tracking-[-0.02em] md:text-[clamp(3.2rem,6.2vw,5rem)] lg:text-[clamp(4rem,5.4vw,7.5rem)] lg:leading-[0.85] lg:tracking-[-0.025em] ${
                      line.accent ? 'text-[#A9C5FF]' : 'text-white'
                    }`}
                  >
                    {Array.from(line.text).map((ch, ci) => (
                      <span key={ci} data-right-char className="inline-block opacity-0">
                        {ch === ' ' ? ' ' : ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </h1>
      </div>

      {/* LEFT — editorial identity block. Below `lg` this is a normal-flow panel under
          the visual scene (two-column on tablet); at `lg` it's the absolute, vertically
          centered column, unchanged in composition, just regrouped so the eyebrow,
          name, description and buttons read as one unit instead of being spread across
          a justify-between 55vh box. */}
      <div
        ref={panelRef}
        className="relative z-[2] flex flex-col gap-6 px-6 pb-12 pt-8 sm:px-8 sm:pt-10 md:grid md:grid-cols-2 md:items-start md:gap-x-10 md:gap-y-2 md:px-10 md:pb-14 md:pt-10 lg:absolute lg:inset-y-0 lg:left-[clamp(2rem,4vw,6rem)] lg:my-auto lg:flex lg:h-auto lg:w-[clamp(280px,25vw,430px)] lg:flex-col lg:justify-center lg:gap-[clamp(1.1rem,2.4vh,2.25rem)] lg:px-0 lg:pb-0 lg:pt-0"
      >
        <div className="flex flex-col gap-6 lg:gap-[clamp(1.1rem,2.4vh,2.25rem)]">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              data-left-marker
              className={`h-px w-8 origin-left bg-white/40 ${prefersReducedMotion ? '' : 'scale-x-0'}`}
            />
            <span className="sr-only">{EYEBROW_TEXT}</span>
            <span
              aria-hidden="true"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
              className="inline-flex items-center text-[11px] uppercase tracking-[0.3em] text-white/65"
            >
              {prefersReducedMotion ? EYEBROW_TEXT : eyebrowVisible}
              {!prefersReducedMotion && (
                <span
                  className={`ml-0.5 inline-block h-[1em] w-[2px] bg-white/70 ${
                    cursorVisible ? 'cursor-blink opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </span>
          </div>

          <div
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            className="text-[clamp(2.4rem,11vw,4rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white lg:text-[clamp(2.6rem,3.7vw,5.5rem)]"
          >
            <span className="sr-only">Aarom Villanueva</span>
            <div aria-hidden="true">
              {NAME_LINES.map((line) => (
                <div key={line} className="overflow-hidden">
                  <div className="flex">
                    {Array.from(line).map((ch, ci) => (
                      <span key={ci} data-name-char className={`inline-block ${prefersReducedMotion ? '' : 'opacity-0'}`}>
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="max-w-[34rem] text-[0.95rem] leading-[1.55] text-white/85 lg:max-w-[340px] lg:text-[clamp(0.95rem,1vw,1.15rem)] lg:leading-[1.5]">
            <span className="sr-only">{DESCRIPTION_TEXT}</span>
            <span aria-hidden="true">
              {DESCRIPTION_WORDS.map((word, wi) => (
                <span key={wi} data-desc-word className={`inline-block ${prefersReducedMotion ? '' : 'opacity-0'}`}>
                  {wi < DESCRIPTION_WORDS.length - 1 ? `${word} ` : word}
                </span>
              ))}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3 [@media(max-width:359px)]:flex-col [@media(max-width:359px)]:items-stretch">
            <a
              href="#proyectos"
              data-left-button
              className={`btn-primary min-h-[44px] justify-center [@media(max-width:359px)]:w-full ${prefersReducedMotion ? '' : 'opacity-0'}`}
            >
              Ver proyectos <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contacto"
              data-left-button
              className={`btn-secondary min-h-[44px] justify-center [@media(max-width:359px)]:w-full ${prefersReducedMotion ? '' : 'opacity-0'}`}
            >
              Hablemos
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:absolute lg:bottom-3 lg:left-1/2 lg:z-[2] lg:flex lg:-translate-x-1/2 lg:flex-col lg:items-center lg:gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Desliza para descubrir</span>
        <ArrowDown className="scroll-indicator h-4 w-4 text-white/30" />
      </div>
    </section>
  );
}
