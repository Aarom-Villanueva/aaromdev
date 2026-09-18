'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const REVEAL_FALLBACK_MS = 1200;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setReady(true);
      return;
    }

    const video = videoRef.current;
    const markReady = () => setReady(true);

    if (video && video.readyState >= 2) {
      markReady();
    } else {
      video?.addEventListener('loadeddata', markReady, { once: true });
      video?.addEventListener('canplay', markReady, { once: true });
    }

    const fallback = window.setTimeout(markReady, REVEAL_FALLBACK_MS);

    return () => {
      video?.removeEventListener('loadeddata', markReady);
      video?.removeEventListener('canplay', markReady);
      window.clearTimeout(fallback);
    };
  }, [prefersReducedMotion]);

  return (
    <section id="hero" className="relative min-h-[100dvh] bg-[#030303]">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="https://res.cloudinary.com/epea8suu/video/upload/v1789140783/aarom-hero.mp4"
          poster="https://res.cloudinary.com/epea8suu/video/upload/so_0,w_1600,q_auto,f_auto/v1789140783/aarom-hero.jpg"
          preload="metadata"
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-[2] flex min-h-[100dvh] items-center justify-center px-6 pt-16">
        <div className="w-full max-w-4xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            transition={{ duration: 1 }}
            className="text-label mb-6 text-white/65"
          >
            Aarom Villanueva <span className="mx-2 text-white/30">·</span> Software Developer & Product Engineer
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate={ready ? 'visible' : 'hidden'} transition={{ duration: 1 }}>
            <h1 className="text-display mx-auto max-w-[14ch] text-white">
              Diseño y construyo sistemas web que escalan.
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            transition={{ duration: 1 }}
            className="mx-auto mt-8 max-w-2xl text-body-large text-white/55"
          >
            Especializado en arquitectura backend con Java/Spring Boot y .NET, e interfaces dinámicas con Next.js. De la idea a la producción.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            transition={{ duration: 1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#proyectos" className="btn-primary">
              Explorar productos <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contacto" className="btn-secondary">
              Contactarme
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-1.5 pb-0">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Desliza para descubrir</span>
        <ArrowDown className="scroll-indicator h-4 w-4 text-white/30" />
      </div>
    </section>
  );
}
