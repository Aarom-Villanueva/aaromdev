'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useHeroReady } from '@/components/HeroReadyProvider';
import { services } from '@/data/services';
import { formatRemaining, usePromo } from '@/hooks/usePromo';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { formatSoles } from '@/lib/format';

const BAR_HEIGHT_PX = 36;
/** Safety net in case the hero video never plays (autoplay blocked, slow network). */
const FALLBACK_DELAY_MS = 20_000;

function readDismissed(key: string) {
  try {
    return window.sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function saveDismissed(key: string) {
  try {
    window.sessionStorage.setItem(key, '1');
  } catch {
    // Storage unavailable (private mode, embedded view): dismissal just lasts this view.
  }
}

/** Promo strip above the navbar. On the home page it appears when the hero video finishes
 * its first play-through (or as soon as the visitor scrolls past the hero); on any
 * other page, right after the preloader. Hides itself when the promo expires. */
export default function PromoBar() {
  const promo = usePromo();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const prefersReducedMotion = usePrefersReducedMotion();
  const { heroLoopDone, preloaderDone } = useHeroReady();
  const [triggered, setTriggered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const storageKey = promo ? `promo-dismissed:${promo.endsAt}` : '';

  useEffect(() => {
    if (storageKey) setDismissed(readDismissed(storageKey));
  }, [storageKey]);

  useEffect(() => {
    if (triggered || !preloaderDone) return;
    if (!isHome || heroLoopDone) {
      setTriggered(true);
      return;
    }

    const hero = document.getElementById('hero');
    const onScroll = () => {
      if (!hero || window.scrollY > hero.offsetHeight * 0.6) setTriggered(true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = window.setTimeout(() => setTriggered(true), FALLBACK_DELAY_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(fallback);
    };
  }, [triggered, preloaderDone, isHome, heroLoopDone]);

  const visible = Boolean(promo) && triggered && !dismissed;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--promo-bar-h', visible ? `${BAR_HEIGHT_PX}px` : '0px');
    return () => {
      root.style.setProperty('--promo-bar-h', '0px');
    };
  }, [visible]);

  if (!promo) return null;

  const discounted = services.filter((service) => promo.prices[service.slug] !== undefined);
  const items = [
    promo.message,
    ...discounted.map(
      (service) =>
        `${service.name}: ${formatSoles(promo.prices[service.slug]!)} (antes ${formatSoles(service.price)})`
    ),
    `Hasta el ${promo.endsLabel} · quedan ${formatRemaining(promo.remainingMs)}`,
  ];
  const servicesHref = isHome ? '#servicios' : '/#servicios';

  const track = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {items.map((item, index) => (
        <span key={`${copy}-${index}`} className="flex items-center">
          <span className="whitespace-nowrap px-6">{item}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#030303]/40" />
        </span>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="promo-bar"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: BAR_HEIGHT_PX }}
          className="fixed inset-x-0 top-0 z-[55] flex items-center overflow-hidden bg-[#789DFF] text-[#030303]"
          role="region"
          aria-label="Promoción vigente"
        >
          <a
            href={servicesHref}
            className="promo-marquee group flex h-full min-w-0 flex-1 items-center overflow-hidden text-[12px] font-semibold uppercase tracking-[0.08em]"
          >
            {prefersReducedMotion ? (
              <span className="truncate px-6">{items[0]} · {items[items.length - 1]}</span>
            ) : (
              <div className="promo-marquee-track flex">
                {track(0)}
                {track(1)}
              </div>
            )}
          </a>
          <button
            type="button"
            onClick={() => {
              saveDismissed(storageKey);
              setDismissed(true);
            }}
            aria-label="Cerrar promoción"
            className="flex h-full w-10 shrink-0 items-center justify-center bg-[#789DFF] text-[#030303]/70 transition-colors hover:text-[#030303]"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
