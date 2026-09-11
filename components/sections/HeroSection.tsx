'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const VIDEO_INTRO_DURATION = 2;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: VIDEO_INTRO_DURATION, duration: 1 },
};

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] bg-[#030303]">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="https://res.cloudinary.com/epea8suu/video/upload/v1789140783/aarom-hero.mp4"
          poster="/hero-frames/frame-0060.webp"
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-[2] flex min-h-[100dvh] items-center justify-center px-6 pt-16">
        <div className="w-full max-w-4xl text-center">
          <motion.p {...fadeUp} className="text-label mb-6 text-white/65">
            Aarom Villanueva <span className="mx-2 text-white/30">·</span> Software Developer & Product Engineer
          </motion.p>

          <motion.div {...fadeUp}>
            <h1 className="text-display mx-auto max-w-[14ch] text-white">
              Diseño y construyo sistemas web que escalan.
            </h1>
          </motion.div>

          <motion.p {...fadeUp} className="mx-auto mt-8 max-w-2xl text-body-large text-white/55">
            Especializado en arquitectura backend con Java/Spring Boot y .NET, e interfaces dinámicas con Next.js. De la idea a la producción.
          </motion.p>

          <motion.div {...fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
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