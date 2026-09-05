'use client';

import { Reveal, StaggerReveal, fadeUp } from '@/components/motion/Reveal';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  'Portafolios modernos',
  'Landing pages',
  'Páginas para pequeños negocios',
  'Interfaces responsive',
  'Integración de APIs',
  'Backend para proyectos',
  'Prototipos de aplicaciones móviles',
  'Configuraciones cloud básicas',
];

export default function ServicesSection() {
  return (
    <section className="relative py-32 lg:py-40 bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,157,255,0.03)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="section-label">Servicios</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline text-white mb-8">
                También puedo <span className="text-white/50">ayudarte a construir.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-large text-white/45 mb-10 max-w-md">
                Si tienes una idea, un negocio o un proyecto en mente, puedo acompañarte desde el concepto hasta una solución funcional.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="#contacto" className="btn-primary group">
                Cuéntame qué quieres desarrollar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <StaggerReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
                {services.map((s, i) => (
                  <motion.div
                    key={s}
                    variants={fadeUp}
                    className="bg-[#08090B] p-6 hover:bg-[#111318] transition-colors duration-300 flex items-center gap-4 group"
                  >
                    <span className="text-[11px] font-mono text-white/20">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-white/65 group-hover:text-white/90 transition-colors">{s}</span>
                  </motion.div>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
