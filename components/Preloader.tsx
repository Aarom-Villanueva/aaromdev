'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Wordmark } from '@/components/brand/Logo';
import { useHeroReady } from '@/components/HeroReadyProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const LOGO_REVEAL_MS = 400;
const HOLD_ON_WHITE_MS = 300;
const CURTAIN_RISE_MS = 450;
const TRAVEL_MS = 500;
const AWAIT_HERO_CAP_MS = 400;
const CURTAIN_EXIT_MS = 600;
const REDUCED_MOTION_HOLD_MS = 350;

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DARK_BG = '#030303';
const LOGO_DARK = '#0A0C10';
const LOGO_LIGHT = '#F3F4F6';

type Phase =
  | 'reveal' // logo clip-path reveal on white
  | 'holdWhite' // brief hold, still white
  | 'curtainRise' // dark panel rises to cover white; logo color transitions dark -> light
  | 'traveling' // logo shrinks + travels to the Navbar
  | 'awaiting' // wait for heroReady (capped)
  | 'curtainExit' // dark panel continues rising off-screen, revealing the page
  | 'done';

type Transform = { x: number; y: number; scale: number };

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('reveal');
  const [transform, setTransform] = useState<Transform | null>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const { heroReady, markPreloaderDone, markHeroRevealStarted, brandOwner, claimNavbarBrand } = useHeroReady();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Runs on every real mount — i.e. every full page load / reload. There is no
  // sessionStorage/localStorage/cookie gate: the preloader always plays. A ref (not
  // persisted anywhere) only guards against React Strict Mode's dev-only double effect
  // invocation starting two timelines in the same mount.
  useLayoutEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    try {
      history.scrollRestoration = 'manual';
    } catch {
      // Not available in this environment — safe to ignore.
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      markPreloaderDone();
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [phase, markPreloaderDone]);

  useEffect(() => {
    if (phase !== 'reveal' || prefersReducedMotion) return;
    const t = window.setTimeout(() => setPhase('holdWhite'), LOGO_REVEAL_MS);
    return () => window.clearTimeout(t);
  }, [phase, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== 'holdWhite' || prefersReducedMotion) return;
    const t = window.setTimeout(() => setPhase('curtainRise'), HOLD_ON_WHITE_MS);
    return () => window.clearTimeout(t);
  }, [phase, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== 'curtainRise' || prefersReducedMotion) return;
    const t = window.setTimeout(() => setPhase('traveling'), CURTAIN_RISE_MS);
    return () => window.clearTimeout(t);
  }, [phase, prefersReducedMotion]);

  // Measures the real Navbar brand target (never hardcoded) — the floating logo's
  // travel animation always aims at this rect, on whatever device/viewport is live.
  const measureTarget = useCallback(() => {
    const floatingEl = floatingRef.current;
    const targetEl = document.getElementById('navbar-brand-target');
    if (!floatingEl || !targetEl) return false;
    const floatingRect = floatingEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const scale = targetRect.height / floatingRect.height;
    const x = targetRect.left + targetRect.width / 2 - (floatingRect.left + floatingRect.width / 2);
    const y = targetRect.top + targetRect.height / 2 - (floatingRect.top + floatingRect.height / 2);
    setTransform({ x, y, scale });
    return true;
  }, []);

  // Measure right before the travel starts.
  useLayoutEffect(() => {
    if (phase !== 'traveling') return;
    if (!measureTarget()) setPhase('awaiting');
  }, [phase, measureTarget]);

  // Re-measure on a relevant resize/orientation change while still traveling, so the
  // logo never lands on a stale rect from before the viewport changed.
  useEffect(() => {
    if (phase !== 'traveling') return;
    const onResize = () => measureTarget();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [phase, measureTarget]);

  // Enter curtainExit exactly once the black panel is about to start y: 0% -> -100%.
  // This is the single instant heroRevealStarted fires — HeroSection uses only this
  // signal to begin its text/CTA reveal timing. The video's own play() attempt instead
  // waits for preloaderDone (phase reaching 'done', below) — the curtain's exit
  // animation actually finishing, not just beginning — since calling play() while it's
  // still mid-flight was producing unexplained rejections on some iPhones.
  const beginCurtainExit = () => {
    markHeroRevealStarted();
    // Safety net for the reduced-motion path, which never travels to the Navbar rect
    // and so never fires the travel onAnimationComplete handoff below. Idempotent for
    // the main path, where the handoff has already happened by this point.
    claimNavbarBrand();
    setPhase('curtainExit');
  };

  useEffect(() => {
    if (phase !== 'awaiting' || prefersReducedMotion) return;
    if (heroReady) {
      beginCurtainExit();
      return;
    }
    const t = window.setTimeout(beginCurtainExit, AWAIT_HERO_CAP_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, heroReady, prefersReducedMotion]);

  // Reduced motion: short fixed hold, plain opacity fade, no kinetic sequence.
  useEffect(() => {
    if (phase !== 'reveal' || !prefersReducedMotion) return;
    const t = window.setTimeout(beginCurtainExit, REDUCED_MOTION_HOLD_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, prefersReducedMotion]);

  if (phase === 'done') return null;

  if (prefersReducedMotion) {
    const exiting = phase === 'curtainExit';
    return (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          if (exiting) setPhase('done');
        }}
      >
        <Wordmark className="h-10 w-auto max-w-[calc(100vw-48px)] text-[#0A0C10]" />
      </motion.div>
    );
  }

  const curtainCovering = phase === 'curtainRise' || phase === 'traveling' || phase === 'awaiting' || phase === 'curtainExit';
  const curtainY = phase === 'curtainExit' ? '-100%' : curtainCovering ? '0%' : '100%';
  const logoColor = curtainCovering ? LOGO_LIGHT : LOGO_DARK;
  // White must exist only through the rise itself — removed the instant the panel has
  // fully covered it, never while it's retreating (that would flash white again, since
  // retreating uncovers whatever sits beneath the dark panel).
  const whiteVisible = phase === 'reveal' || phase === 'holdWhite' || phase === 'curtainRise';

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* Visible only until the dark panel has fully risen to cover it — never during
          the exit, which would otherwise flash it back into view. */}
      {whiteVisible && <div className="absolute inset-0 bg-white" />}

      {/* One continuous curtain: rises from below to cover (white -> dark), then keeps
          rising up and off-screen to reveal the real page underneath. */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: DARK_BG }}
        initial={{ y: '100%' }}
        animate={{ y: curtainY }}
        transition={{ duration: (phase === 'curtainExit' ? CURTAIN_EXIT_MS : CURTAIN_RISE_MS) / 1000, ease: cinematicEase }}
        onAnimationComplete={() => {
          if (phase === 'curtainExit') setPhase('done');
        }}
      />

      {/*
        A single logo instance lives here for the whole sequence — it is never removed
        or swapped for a second copy, and only one SVG asset (the horizontal wordmark)
        is ever used. Its color animates dark -> light in sync with the curtain so it
        stays legible on white first, then on the dark backdrop. The instant the travel
        animation lands exactly on the Navbar's target rect, brandOwner flips to
        "navbar" and this floating copy stops rendering in that same render — the real
        Navbar BrandMark (kept measurable-but-invisible until then) is what's already
        underneath. No crossfade, no frame with two logos or zero logos.
      */}
      {brandOwner === 'preloader' && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            ref={floatingRef}
            initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0, x: 0, y: 0, scale: 1, color: LOGO_DARK }}
            animate={{
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              x: transform?.x ?? 0,
              y: transform?.y ?? 0,
              scale: transform?.scale ?? 1,
              color: logoColor,
            }}
            transition={{
              duration: transform ? TRAVEL_MS / 1000 : LOGO_REVEAL_MS / 1000,
              ease: cinematicEase,
              color: { duration: CURTAIN_RISE_MS / 1000, ease: cinematicEase },
            }}
            onAnimationComplete={() => {
              if (transform) {
                // Atomic handoff: same render flips brandOwner (removing this floating
                // copy) and advances the phase — React 18 batches both state updates
                // from this callback into a single commit.
                claimNavbarBrand();
                setPhase('awaiting');
              }
            }}
            style={{ transformOrigin: 'center center' }}
            className="inline-flex"
          >
            <Wordmark className="h-auto w-[min(72vw,380px)] max-w-[calc(100vw-48px)] sm:w-[420px]" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
