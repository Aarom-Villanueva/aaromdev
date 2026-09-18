'use client';

import { useInView, type UseInViewOptions } from 'framer-motion';
import { useRef, type RefObject } from 'react';

export function useIsInViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = { amount: 0.3 }
): { ref: RefObject<T>; isInView: boolean } {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, options);
  return { ref, isInView };
}
