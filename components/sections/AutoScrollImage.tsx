'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

type AutoScrollImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function AutoScrollImage({
  src,
  alt,
  className = 'w-full h-auto max-w-none block align-top',
}: AutoScrollImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [translateY, setTranslateY] = useState(0);

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
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={updateDistance}
        initial={{ y: 0 }}
        whileInView={{ y: [0, -translateY] }}
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