'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Monogram, Wordmark } from './Logo';

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type BrandMarkProps = {
  showWordmark?: boolean;
  monogramClassName?: string;
  wordmarkClassName?: string;
  wordmarkVisibilityClassName?: string;
  className?: string;
};

/**
 * Renders identically wherever it's used (Navbar, Preloader) so a shared-position
 * handoff between two instances never shows a mismatched shape.
 */
export function BrandMark({
  showWordmark = true,
  monogramClassName = 'h-5 w-auto',
  wordmarkClassName = 'h-3.5 w-auto',
  wordmarkVisibilityClassName = 'hidden lg:block',
  className = '',
}: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className={monogramClassName} />
      <AnimatePresence>
        {showWordmark && (
          <motion.span
            key="wordmark"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: cinematicEase }}
            className={wordmarkVisibilityClassName}
          >
            <Wordmark className={wordmarkClassName} />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
