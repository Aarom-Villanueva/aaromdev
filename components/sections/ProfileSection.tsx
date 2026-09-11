'use client';

import { Reveal } from '@/components/motion/Reveal';
import { MapPin } from 'lucide-react';

const interests = ['Producto', 'Backend', 'Arquitectura', 'Cloud', 'Interfaces', 'Sistemas'];

export default function ProfileSection() {
  return (
    <section id="perfil" className="relative overflow-hidden bg-[#111318] py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <Reveal className="lg:col-span-5"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#08090B]"><img src="/images/aarom.png" alt="Aarom Villanueva trabajando" className="h-full w-full object-cover object-center opacity-75" /><div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent" /><p className="absolute bottom-6 left-6 text-label text-white/55">Aarom Villanueva</p></div></Reveal>
        <div className="lg:col-span-7">
          <Reveal><span className="section-label">Perfil</span></Reveal>
          <Reveal delay={0.05}><h2 className="text-headline mb-7 text-white">Sobre mí</h2></Reveal>
          <Reveal delay={0.1}><p className="text-body-large max-w-xl text-white/58">Soy desarrollador de software enfocado en construir herramientas robustas, mantenibles y con interfaces pulidas. Me apasiona traducir lógica de negocio compleja en código limpio y eficiente.</p></Reveal>
          <Reveal delay={0.15}><p className="mt-5 max-w-xl text-body-large text-white/42">Mi recorrido combina proyectos personales, formación en Desarrollo de Software y trabajo práctico sobre backend, cloud, interfaces y arquitectura.</p></Reveal>
          <Reveal delay={0.2}><div className="mt-9 flex items-center gap-2 text-sm text-white/50"><MapPin className="h-4 w-4 text-[#789DFF]" />Lima, Perú</div></Reveal>
          <Reveal delay={0.25}><div className="mt-9 flex flex-wrap gap-2">{interests.map((interest) => <span key={interest} className="tag-tech">{interest}</span>)}</div></Reveal>
        </div>
      </div>
    </section>
  );
}
