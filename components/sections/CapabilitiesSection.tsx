'use client';

import { Reveal, StaggerReveal, fadeUp } from '@/components/motion/Reveal';
import { motion } from 'framer-motion';
import { Server, Monitor, Database } from 'lucide-react';
import { capabilities } from '@/data/capabilities';

const icons = [Server, Monitor, Database];

export default function CapabilitiesSection() {
  return (
    <section id="capacidades" className="relative py-32 lg:py-40 bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-[radial-gradient(ellipse_at_top,rgba(120,157,255,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="section-label">Capacidades aplicadas</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-headline text-white mb-20 max-w-3xl">
            Especialidad Técnica
            <br />
            <span className="text-white/50">& Stack</span>
          </h2>
        </Reveal>

        <StaggerReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
              {capabilities.map((cap, i) => {
                const Icon = icons[i];
                return (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                className="bg-[#08090B] p-8 lg:p-10 hover:bg-[#111318] transition-colors duration-500 group relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-[#789DFF] transition-colors group-hover:border-[#789DFF]/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono text-white/20">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white/90 mb-3">{cap.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed mb-6">{cap.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.technologies.map((t) => (
                    <span key={t} className="text-[11px] text-white/50 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
                );
              })}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
