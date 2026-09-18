'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

/** Single source of truth for which instance of the brand mark is the "real" one.
 * Starts owned by the Preloader's floating logo; flips to the Navbar in one atomic
 * update the instant the floating logo's travel animation lands exactly on the
 * Navbar's target rect. Never two owners at once, never zero. */
export type BrandOwner = 'preloader' | 'navbar';

type HeroReadyContextValue = {
  heroReady: boolean;
  markHeroReady: () => void;
  preloaderDone: boolean;
  markPreloaderDone: () => void;
  /** Fires exactly once, from Preloader.tsx, the instant its black panel begins
   * leaving the viewport (y: 0% -> -100%). This is the ONLY signal HeroSection uses to
   * time its text/CTA reveal fallback — never heroReady/canplay/a timeout. The video's
   * own play() attempt instead waits for preloaderDone (below), since it needs the
   * curtain's exit animation to have actually finished, not just started. */
  heroRevealStarted: boolean;
  markHeroRevealStarted: () => void;
  brandOwner: BrandOwner;
  /** One-way handoff: preloader -> navbar. Called from the floating logo's
   * onAnimationComplete, never from a timer. */
  claimNavbarBrand: () => void;
};

const HeroReadyContext = createContext<HeroReadyContextValue | null>(null);

export function HeroReadyProvider({ children }: { children: ReactNode }) {
  const [heroReady, setHeroReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [heroRevealStarted, setHeroRevealStarted] = useState(false);
  const [brandOwner, setBrandOwner] = useState<BrandOwner>('preloader');
  const markHeroReady = useCallback(() => setHeroReady(true), []);
  const markPreloaderDone = useCallback(() => setPreloaderDone(true), []);
  const markHeroRevealStarted = useCallback(() => setHeroRevealStarted(true), []);
  const claimNavbarBrand = useCallback(() => setBrandOwner('navbar'), []);

  return (
    <HeroReadyContext.Provider
      value={{
        heroReady,
        markHeroReady,
        preloaderDone,
        markPreloaderDone,
        heroRevealStarted,
        markHeroRevealStarted,
        brandOwner,
        claimNavbarBrand,
      }}
    >
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  const ctx = useContext(HeroReadyContext);
  if (!ctx) {
    throw new Error('useHeroReady must be used within a HeroReadyProvider');
  }
  return ctx;
}
