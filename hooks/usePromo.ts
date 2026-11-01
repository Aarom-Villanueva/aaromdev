'use client';

import { useEffect, useState } from 'react';
import { isPromoActive, promo } from '@/data/promo';
import type { Promo } from '@/data/promo';

export type ActivePromo = Promo & {
  /** Milliseconds left until `endsAt`. */
  remainingMs: number;
};

/** The promo only exists on the client: the page is static, so deciding on the server
 * would freeze whatever was true at build time. Returns null before mount and after
 * `endsAt`, and re-checks every 30 s so the countdown and the expiry stay live. */
export function usePromo(): ActivePromo | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (now === null || !isPromoActive(promo, now)) return null;
  return { ...promo, remainingMs: new Date(promo.endsAt).getTime() - now };
}

/** "3d 12h", "5h 20min", "18min". */
export function formatRemaining(ms: number): string {
  const totalMinutes = Math.max(0, Math.floor(ms / 60_000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}min`;
  return `${minutes}min`;
}
