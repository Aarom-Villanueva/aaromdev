'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Layers } from 'lucide-react';
import type { Product } from '@/data/products';

export default function FeaturedProduct({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.05]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 2]);

  return (
    <section id="productos" ref={ref} className="relative min-h-[190vh] bg-[#08090B]">
      <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(120,157,255,0.06)_0%,transparent_65%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-7">
            <motion.div style={{ scale, rotate }} className="project-card-frame relative aspect-[16/10] noise-overlay glow-blue">
              <div className="flex items-center gap-2 border-b border-white/[0.05] bg-white/[0.01] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="mx-auto font-mono text-[10px] text-white/30">aromacloud.app</span>
              </div>
              <div className="grid h-[calc(100%-44px)] grid-cols-[18%_1fr]">
                <div className="hidden border-r border-white/[0.05] p-4 sm:block">
                  <div className="space-y-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-2 rounded-full bg-white/[0.07]" />)}</div>
                </div>
                <div className="p-4 sm:p-7">
                  <div className="mb-6 flex items-start justify-between"><div className="space-y-2"><div className="h-3 w-28 rounded-full bg-white/20" /><div className="h-2 w-20 rounded-full bg-white/[0.08]" /></div><div className="h-8 w-8 rounded-full border border-[#789DFF]/30 bg-[#789DFF]/10" /></div>
                  <div className="mb-5 grid grid-cols-3 gap-3">{Array.from({ length: 3 }, (_, index) => <div key={index} className="rounded-lg border border-white/[0.05] bg-white/[0.03] p-3"><div className="mb-3 h-2 w-10 rounded-full bg-white/15" /><div className="h-3 w-14 rounded-full bg-white/25" /></div>)}</div>
                  <div className="space-y-3 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">{Array.from({ length: 4 }, (_, index) => <div key={index} className="flex items-center gap-3"><div className="h-7 w-7 rounded-md border border-white/10 bg-white/[0.04]" /><div className="h-2 flex-1 rounded-full bg-white/[0.08]" /><div className="h-5 w-12 rounded-full bg-[#789DFF]/15" /></div>)}</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5">
            <span className="section-label">Producto destacado</span>
            <h2 className="text-display mb-6 text-white">{product.name}</h2>
            <p className="text-title mb-6 text-white/70">Una plataforma para convertir perfumerías en negocios digitales.</p>
            <p className="text-body-large mb-8 max-w-md text-white/45">{product.summary}</p>
            {product.role ? <p className="mb-7 flex items-center gap-2 text-sm text-white/45"><Layers className="h-3.5 w-3.5 text-[#789DFF]/70" />{product.role}</p> : null}
            <div className="mb-8 flex flex-wrap gap-2">{product.technologies?.map((technology) => <span key={technology} className="tag-tech tag-tech-blue">{technology}</span>)}</div>
            <span className="text-label text-white/35">Case study en preparación</span>
          </div>
        </div>
      </div>
    </section>
  );
}
