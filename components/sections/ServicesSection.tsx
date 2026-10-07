'use client';

import { Reveal, StaggerReveal, fadeUp } from '@/components/motion/Reveal';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { WhatsAppIcon } from '@/components/social/SocialLinks';
import { buildWhatsAppUrl } from '@/data/contact';
import { services } from '@/data/services';
import type { Service } from '@/data/services';

function PriceBlock({ service }: { service: Service }) {
  const isFixedPrice = Boolean(service.priceEyebrow);

  return (
    <div className="flex flex-col gap-1">
      {service.priceEyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">{service.priceEyebrow}</span>
      ) : null}
      <span
        className={`font-bold leading-none text-white ${
          isFixedPrice ? 'text-[32px] lg:text-[46px]' : 'text-[24px] lg:text-[32px]'
        }`}
      >
        {service.priceMain}
      </span>
      {service.priceSupport ? <span className="text-xs text-white/45">{service.priceSupport}</span> : null}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const whatsappUrl = buildWhatsAppUrl(service.whatsappMessage);

  return (
    <motion.div variants={fadeUp} className={`service-card ${service.featured ? 'service-card--featured' : ''}`}>
      <h3 className="text-lg font-semibold text-white/90">{service.name}</h3>
      <p className="text-sm leading-relaxed text-white/55">{service.description}</p>
      <PriceBlock service={service} />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full min-h-[48px] justify-center ${service.featured ? 'btn-primary' : 'btn-secondary'}`}
      >
        <WhatsAppIcon />
        {service.ctaLabel}
      </a>
      <div className="divider-line" />
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">Qué incluye</span>
      <ul className="flex flex-col gap-2.5">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/60">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#789DFF]" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative bg-[#030303] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="section-label">Servicios</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-headline mb-6 max-w-2xl text-white">Una solución para cada etapa de tu negocio</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-large mb-16 max-w-2xl text-white/45">
            Desde tu primera página web hasta una tienda online o un sistema a medida.
          </p>
        </Reveal>

        <StaggerReveal>
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </StaggerReveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-xs leading-relaxed text-white/35">
            Precios iniciales por proyecto. El presupuesto final depende del alcance y las integraciones. Dominio,
            hosting, licencias y mantenimiento se cotizan por separado.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
