'use client';

import { Reveal } from '@/components/motion/Reveal';
import SystemCase from '@/components/systems/SystemCase';
import { systemCases } from '@/data/systems';

export default function SystemsSection() {
  return (
    <section id="sistemas" className="relative bg-[#030303] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal><span className="section-label">Sistemas y soluciones</span></Reveal>
        <Reveal delay={0.05}><h2 className="text-headline mb-6 max-w-3xl text-white">Profundidad técnica para <span className="text-white/50">problemas que necesitan estructura.</span></h2></Reveal>
        <Reveal delay={0.1}><p className="text-body-large mb-16 max-w-2xl text-white/45">El enfoque no es acumular herramientas, sino tomar decisiones de arquitectura, datos y operación que sostengan una solución.</p></Reveal>
        <div>{systemCases.map((system, index) => <SystemCase key={system.title} system={system} index={index} />)}</div>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/35">Cada sistema queda preparado para documentar posteriormente su contexto, responsabilidad, decisión técnica y evidencia visual.</p>
      </div>
    </section>
  );
}
