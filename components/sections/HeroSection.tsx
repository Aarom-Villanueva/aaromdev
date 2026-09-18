'use client';

import { useAnimate } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHeroReady } from '@/components/HeroReadyProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useTypewriter } from '@/hooks/useTypewriter';

const REVEAL_FALLBACK_MS = 1200;
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
  const { markHeroReady, heroRevealStarted } = useHeroReady();
  const prefersReducedMotion = usePrefersReducedMotion();

  const rightAnimatedRef = useRef(false);
  const leftAnimatedRef = useRef(false);
  const videoStartedRef = useRef(false);
  const videoStartPromiseRef = useRef<Promise<void> | null>(null);
  const [heroStarted, setHeroStarted] = useState(false);
  const [panelInView, setPanelInView] = useState(false);
  const [typewriterStart, setTypewriterStart] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const { visibleText: eyebrowVisible, done: eyebrowDone } = useTypewriter(
    EYEBROW_TEXT,
    typewriterStart && !prefersReducedMotion,
    LEFT_TYPE_MS_PER_CHAR
  );

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

  // The single protected entry point for playback. videoStartedRef is set to true
  // BEFORE awaiting play(), so no second call — from anywhere — can ever run this
  // again, including a second React Strict Mode effect pass.
  const startHeroVideo = useCallback(async () => {
    if (videoStartedRef.current) return;
    const video = videoRef.current;
    if (!video) return;

    videoStartedRef.current = true;
    video.currentTime = 0;

    try {
      videoStartPromiseRef.current = video.play();
      await videoStartPromiseRef.current;
      setHeroStarted(true);
    } catch {
      videoStartedRef.current = false;
    }
  }, []);

  // The ONLY trigger for video.play()/currentTime: heroRevealStarted. Not
  // preloaderDone, not heroReady, not canplay/loadeddata directly, not a timeout.
  useEffect(() => {
    if (!heroRevealStarted) return;

    if (prefersReducedMotion) {
      setHeroStarted(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      startHeroVideo();
    } else {
      video.addEventListener('canplay', startHeroVideo, { once: true });
      return () => video.removeEventListener('canplay', startHeroVideo);
    }
  }, [heroRevealStarted, prefersReducedMotion, startHeroVideo]);

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
          src="https://res.cloudinary.com/epea8suu/video/upload/v1789140783/aarom-hero.mp4"
          poster="https://res.cloudinary.com/epea8suu/video/upload/so_0,w_1600,q_auto,f_auto/v1789140783/aarom-hero.jpg"
          preload="auto"
          autoPlay={false}
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45" />
        {/* Bottom fade reaches full black so the scene meets the panel below it with no
            visible seam or color mismatch — the panel is solid black too. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:from-black/30 lg:via-transparent lg:to-transparent" />

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
