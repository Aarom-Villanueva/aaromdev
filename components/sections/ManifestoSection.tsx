'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const lines = [
  'Software pensado',
  'para funcionar.',
  'Productos pensados',
  'para crecer.',
];

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgTransition = useTransform(scrollYProgress, [0, 0.5, 1], ['#030303', '#08090B', '#111318']);

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: bgTransition as unknown as string }}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(209,141,98,0.045)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
        <div className="space-y-1">
          {lines.map((line, i) => (
            <ManifestoLine key={i} index={i} text={line} reduceMotion={!!reduceMotion} />
          ))}
        </div>

        <motion.p
          className="text-body-large text-white/45 mt-16 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Combino desarrollo backend, interfaces modernas, cloud y visión de producto para convertir ideas en soluciones que puedan utilizarse de verdad.
        </motion.p>
      </div>
    </motion.section>
  );
}

function ManifestoLine({ index, text, reduceMotion }: { index: number; text: string; reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.62'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [30, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['blur(0px)', 'blur(0px)'] : ['blur(8px)', 'blur(0px)']);

  return (
    <motion.div ref={ref} style={{ opacity, y, filter: blur }}>
      <h2 className={`text-headline font-bold tracking-tight ${index % 2 === 1 ? 'text-white/60' : 'text-white'}`}>
        {text}
      </h2>
    </motion.div>
  );
}
