'use client';

import { useEffect, useState } from 'react';

/**
 * Reveals `text` one character at a time once `start` becomes true. No external
 * typewriter library — just a self-cleaning setTimeout chain.
 */
export function useTypewriter(text: string, start: boolean, msPerChar: number) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;

    let cancelled = false;
    let timer: number;

    const tick = (next: number) => {
      if (cancelled) return;
      setCount(next);
      if (next >= text.length) {
        setDone(true);
        return;
      }
      timer = window.setTimeout(() => tick(next + 1), msPerChar);
    };

    timer = window.setTimeout(() => tick(1), msPerChar);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [start, text, msPerChar]);

  return { visibleText: text.slice(0, count), done };
}
