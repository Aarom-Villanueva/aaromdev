'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const MotionImage = motion.create(Image);

type AutoScrollImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
};

export default function AutoScrollImage({
  src,
  alt,
  width,
  height,
  sizes = '(min-width: 1024px) 600px, 100vw',
  className = 'w-full h-auto max-w-none block align-top',
}: AutoScrollImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const updateDistance = useCallback(() => {
    if (containerRef.current && imgRef.current) {
      const diff = imgRef.current.clientHeight - containerRef.current.clientHeight;
      setTranslateY(diff > 0 ? diff : 0);
    }
  }, []);

  useEffect(() => {
    if (imgRef.current?.complete) {
      updateDistance();
    }
  }, [updateDistance]);

  useEffect(() => {
    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, [updateDistance]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <MotionImage
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
        onLoad={updateDistance}
        initial={{ y: 0 }}
        whileInView={prefersReducedMotion ? undefined : { y: [0, -translateY] }}
        viewport={{ once: false, amount: 'some' }}
        onViewportEnter={updateDistance}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className={className}
      />
    </div>
  );
}
