'use client';

import { Reveal, StaggerReveal, fadeUp } from '@/components/motion/Reveal';
import { motion } from 'framer-motion';
import { processSteps } from '@/data/process';

export default function ProcessSection() {
  return (
    <section className="relative py-32 lg:py-40 bg-[#08090B] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="section-label">Método de trabajo</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-headline text-white mb-6 max-w-2xl">
            Pensar antes de construir. <span className="text-white/50">Mejorar después de probar.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-large text-white/45 mb-20 max-w-xl">
            No es un proceso rígido: es una forma de mantener el problema, la experiencia y la estructura presentes durante la construcción.
          </p>
        </Reveal>

        <StaggerReveal>
          {/* Desktop horizontal */}
          <div className="hidden lg:flex items-start gap-0">
            {processSteps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} className="flex-1 relative">
                {i < processSteps.length - 1 && (
                  <div className="absolute top-5 left-[60%] right-0 h-px bg-gradient-to-r from-white/15 to-transparent" />
                )}
                <div className="relative pr-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-sm font-mono text-[#789DFF]">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed pr-4">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-8">
            {processSteps.map((step, index) => (
              <motion.div key={step.num} variants={fadeUp} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-sm font-mono text-[#789DFF]">
                    {step.num}
                  </div>
                  {index < processSteps.length - 1 ? <div className="w-px flex-1 bg-white/10 mt-3" /> : null}
                </div>
                <div className="pb-4">
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
