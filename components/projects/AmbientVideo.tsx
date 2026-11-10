'use client';

import { useEffect, useState } from 'react';

/** Moving, blurred copy of the project video behind the detail-page hero.
 * Only on large screens, never with reduced motion or data saver: on phones the
 * static blurred poster underneath is enough and saves battery and data. */
export default function AmbientVideo({ src, className }: { src: string; className: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const update = () => setEnabled(wide.matches && !calm.matches && !saveData);
    update();
    wide.addEventListener('change', update);
    calm.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      calm.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className={`transition-opacity duration-1000 ${className}`}
    />
  );
}
