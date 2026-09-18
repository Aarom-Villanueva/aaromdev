'use client';

import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowUpRight, Instagram, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/social/SocialLinks';

const email = 'aaromvillanueva18@gmail.com';
const whatsappUrl =
  'https://wa.me/51987164141?text=Hola%20Aarom,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar';
const instagramUrl = 'https://www.instagram.com/aaromcim_/';

export default function ContactSection() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-[#030303] py-32 lg:py-48">
      <div className="absolute inset-0 pointer-events-none opacity-[0.1]">
        <Image
          src="/images/aarom-coding.jpeg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading="lazy"
          className="select-none object-contain object-right"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)' }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_25%_50%,rgba(120,157,255,0.05)_0%,transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal><span className="section-label">Contacto</span></Reveal>
          <Reveal delay={0.05}><h2 className="text-display mb-8 leading-[1.05] text-white">¿Tienes un proyecto o una <span className="text-white/55">propuesta? Conversemos.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="text-body-large mb-12 max-w-xl text-white/50">Disponible para oportunidades como Software Developer, desarrollo SaaS y proyectos a medida.</p></Reveal>
          <Reveal delay={0.15}><a href={`mailto:${email}`} className="btn-primary group"><Mail className="h-4 w-4" />{email}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></Reveal>
          <Reveal delay={0.2}><div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group"
            >
              <WhatsAppIcon />+51 987 164 141
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />@aaromcim_
            </a>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}
