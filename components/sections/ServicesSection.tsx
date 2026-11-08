'use client';

import { Reveal, StaggerReveal, fadeUp } from '@/components/motion/Reveal';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Clock, LayoutGrid, Monitor, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { WhatsAppIcon } from '@/components/social/SocialLinks';
import { buildWhatsAppUrl } from '@/data/contact';
import { services } from '@/data/services';
import type { Service } from '@/data/services';
import { usePromo } from '@/hooks/usePromo';
import type { ActivePromo } from '@/hooks/usePromo';
import { discountPercent, formatSoles } from '@/lib/format';

const serviceIcons: Record<Service['slug'], LucideIcon> = {
  landing: Monitor,
  ecommerce: Store,
  sistemas: LayoutGrid,
};

function PriceBlock({ service, promoPrice }: { service: Service; promoPrice: number | null }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Desde</span>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <AnimatePresence initial={false} mode="popLayout">
          {promoPrice !== null ? (
            <motion.span
              key="promo"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[32px] font-bold leading-none text-white lg:text-[46px]"
            >
              {formatSoles(promoPrice)}
            </motion.span>
          ) : null}
        </AnimatePresence>
        <span
          className={`font-bold leading-none transition-all duration-500 ${
            promoPrice !== null
              ? 'text-lg text-white/35 line-through decoration-[#789DFF] decoration-2 lg:text-xl'
              : 'text-[32px] text-white lg:text-[46px]'
          }`}
        >
          {promoPrice !== null ? <span className="sr-only">Antes </span> : null}
          {formatSoles(service.price)}
        </span>
      </div>
      <span className="text-xs text-white/45">{service.priceSupport}</span>
      {service.delivery ? (
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55">
          <Clock className="h-3.5 w-3.5 text-[#789DFF]" aria-hidden="true" />
          {service.delivery}
        </span>
      ) : null}
    </div>
  );
}

function ServiceCard({ service, promo }: { service: Service; promo: ActivePromo | null }) {
  const promoPrice = promo?.prices[service.slug] ?? null;
  const whatsappUrl = buildWhatsAppUrl(
    promoPrice !== null && promo
      ? `Hola Aarom, vi la promoción hasta el ${promo.endsLabel} y quiero ${service.whatsappSubject} (desde ${formatSoles(promoPrice)}).`
      : `Hola Aarom, quiero ${service.whatsappSubject} (desde ${formatSoles(service.price)}).`
  );
  const Icon = serviceIcons[service.slug];

  return (
    <motion.div variants={fadeUp} className={`service-card ${service.featured ? 'service-card--featured' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="service-icon">
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <AnimatePresence>
          {promoPrice !== null && promo ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#789DFF]/35 bg-[#789DFF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A9C5FF]"
            >
              -{discountPercent(service.price, promoPrice)}%
              <span className="font-medium normal-case tracking-normal text-[#A9C5FF]/70">hasta el {promo.endsLabel}</span>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
      <h3 className="text-lg font-semibold text-white/90">{service.name}</h3>
      <div className="flex flex-col gap-2">
        <p className="text-sm leading-relaxed text-white/55">{service.description}</p>
        <p className="text-[12px] leading-relaxed text-white/40">
          <span className="font-medium text-white/60">Ideal para: </span>
          {service.idealFor}
        </p>
      </div>
      <PriceBlock service={service} promoPrice={promoPrice} />
      <div className="flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full min-h-[48px] justify-center ${service.featured ? 'btn-primary' : 'btn-secondary'}`}
        >
          <WhatsAppIcon />
          {service.ctaLabel}
        </a>
        <Link
          href={`/proyectos?tipo=${service.examples}`}
          className="group inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-white/50 transition-colors hover:text-white"
        >
          Ver ejemplos
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
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
  const promo = usePromo();

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
              <ServiceCard key={service.slug} service={service} promo={promo} />
            ))}
          </div>
        </StaggerReveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-xs leading-relaxed text-white/35">
            {promo ? `Precios promocionales válidos hasta el ${promo.endsLabel}. ` : null}Precios iniciales por proyecto. El presupuesto final depende del alcance y las integraciones. Dominio,
            hosting, licencias y mantenimiento se cotizan por separado. Pago: 50% para empezar y 50% al aprobar la
            entrega.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
