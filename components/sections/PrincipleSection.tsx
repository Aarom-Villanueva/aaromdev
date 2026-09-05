'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const lines = ['No parto de la tecnología', 'por la tecnología.', 'Parto del problema,', 'la experiencia y la estructura.'];

export default function PrincipleSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ['#030303', '#111318']);

  return (
    <motion.section ref={ref} style={{ backgroundColor }} className="relative overflow-hidden py-28 lg:py-36">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <span className="section-label">Principio de trabajo</span>
        <div className="space-y-1">{lines.map((line, index) => <PrincipleLine key={line} text={line} muted={index % 2 === 1} reduceMotion={!!reduceMotion} />)}</div>
        <p className="text-body-large mt-14 max-w-2xl text-white/50">Antes de construir, busco entender qué necesita la persona, cómo debe sentirse la experiencia y qué estructura permite que la solución funcione de verdad.</p>
      </div>
    </motion.section>
  );
}

function PrincipleLine({ text, muted, reduceMotion }: { text: string; muted: boolean; reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.62'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.14, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [26, 0]);
  return <motion.div ref={ref} style={{ opacity, y }}><h2 className={`text-headline font-bold tracking-tight ${muted ? 'text-white/55' : 'text-white'}`}>{text}</h2></motion.div>;
}
