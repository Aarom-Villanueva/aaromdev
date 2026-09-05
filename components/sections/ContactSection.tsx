'use client';

import { Reveal } from '@/components/motion/Reveal';
import { ArrowUpRight, Mail } from 'lucide-react';

const email = 'aaromvillanueva18@gmail.com';

export default function ContactSection() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-[#030303] py-32 lg:py-48">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-end opacity-[0.1]">
        <img src="/images/aarom.png" alt="" aria-hidden="true" className="h-full w-auto select-none object-contain object-right" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_25%_50%,rgba(120,157,255,0.05)_0%,transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal><span className="section-label">Contacto</span></Reveal>
          <Reveal delay={0.05}><h2 className="text-display mb-8 leading-[1.05] text-white">Si hay un problema que merece una mejor <span className="text-white/55">solución, conversemos.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="text-body-large mb-12 max-w-xl text-white/50">Construyo, pienso y resuelvo. Si tienes una idea o un problema interesante, hablemos sobre cómo convertirlo en algo útil.</p></Reveal>
          <Reveal delay={0.15}><a href={`mailto:${email}`} className="btn-primary group"><Mail className="h-4 w-4" />{email}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></Reveal>
        </div>
      </div>
    </section>
  );
}
