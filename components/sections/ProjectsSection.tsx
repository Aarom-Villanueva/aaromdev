'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import AutoScrollImage from './AutoScrollImage';
import { featuredProduct, secondaryProducts } from '@/data/products';
import type { MediaItem, Product } from '@/data/products';

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

function ImageWithFallback({ src, fallbackSrc, alt, className }: { src: string; fallbackSrc: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        const target = event.currentTarget;
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
      className={className}
    />
  );
}

function FeaturedProductCard({ product }: { product: Product }) {
  const primaryTechnologies = ['Java 21', 'Spring Boot', 'PostgreSQL', 'Next.js'];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0C0F] transition-all duration-300 hover:border-white/20">
      <div className="grid items-center gap-4 p-7 lg:grid-cols-12 lg:gap-12 lg:p-10">
        <div className="lg:col-span-5">
          <div className="mb-6">
            <span className="tag-tech tag-tech-blue">Producto destacado</span>
          </div>

          <h3 className="text-title mb-4 text-white">{product.name}</h3>
          <p className="mb-4 text-lg leading-relaxed text-white/70">{product.tagline}</p>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-white/45">{product.summary}</p>

          {product.technologies && product.technologies.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {product.technologies.map((technology) => (
                <span
                  key={technology}
                  className={`tag-tech tag-tech-blue text-[11px] ${
                    primaryTechnologies.includes(technology) ? '' : 'hidden sm:inline-flex'
                  }`}
                >
                  {technology}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0D0F13] shadow-[0_0_50px_-10px_rgba(59,130,246,0.12)]">
            <div className="flex items-center gap-2 border-b border-white/[0.05] bg-white/[0.01] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[10px] text-white/30">{product.slug}.app</span>
            </div>
            <div className="relative aspect-[16/10] w-full h-full overflow-hidden bg-[#0D0F13]">
              <AutoScrollImage
                src={product.image}
                alt={`Captura de ${product.name} en escritorio`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractiveShowcase({ name, items }: { name: string; items: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [activeIndex, items.length]);

  return (
    <div className="relative flex aspect-video w-full flex-col overflow-hidden bg-[#0D0F13]">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.05] bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="ml-3 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                index === activeIndex ? 'bg-white/10 text-white/90' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            {activeItem.type === 'video' ? (
              <video src={activeItem.src} autoPlay loop muted playsInline className="h-full w-full object-cover" />
            ) : activeItem.scroll ? (
              <AutoScrollImage src={activeItem.src} alt={`Captura de ${name} — ${activeItem.label}`} />
            ) : (
              <img
                src={activeItem.src}
                alt={`Captura de ${name} — ${activeItem.label}`}
                className="h-full w-full object-cover object-top"
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0F13] to-transparent" />
      </div>
    </div>
  );
}

function SecondaryProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0A0C0F] transition-all duration-300 hover:border-white/20 hover:bg-[#111318]">
      <div className="overflow-hidden border-b border-white/[0.05]">
        {product.mediaItems ? (
          <InteractiveShowcase name={product.name} items={product.mediaItems} />
        ) : product.slug === 'nara' ? (
          <div className="relative aspect-video w-full h-full overflow-hidden bg-[#0D0F13]">
            <AutoScrollImage src={product.image} alt={`Captura de ${product.name}`} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0F13] to-transparent" />
          </div>
        ) : product.slug === 'vanta-01' ? (
          <div className="relative aspect-video overflow-hidden rounded-lg bg-[#08090C] p-3">
            <video
              src="/media/vanta.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-contain object-center scale-95"
            />
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden bg-[#0D0F13]">
            <ImageWithFallback
              src={product.image}
              fallbackSrc={product.image}
              alt={`Captura de ${product.name}`}
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0F13] to-transparent" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 font-mono text-[11px] tracking-[0.16em] text-white/35">
          PRODUCTO / 0{index + 1}
        </span>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h4 className="text-xl font-semibold text-white/90">{product.name}</h4>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
            {product.tagline}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/45">{product.summary}</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="tag-tech">
            {product.status === 'featured'
              ? 'En catálogo'
              : product.status === 'academic'
                ? 'Proyecto académico'
                : 'En preparación'}
          </span>
          <ArrowUpRight className="h-4 w-4 text-white/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#789DFF]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section id="productos" className="relative bg-[#08090B] py-28 lg:py-36">
      <motion.div {...sectionFade} className="mx-auto max-w-7xl px-6 lg:px-10">
        <span className="section-label">03 — Productos</span>
        <h2 className="text-headline mb-6 max-w-3xl text-white">
          Sistemas reales. <span className="text-white/50">Código en producción.</span>
        </h2>
        <p className="text-body-large mb-14 max-w-2xl text-white/45">
          Soluciones backend y aplicaciones web diseñadas para resolver problemas de negocio complejos.
        </p>

        <FeaturedProductCard product={featuredProduct} />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {secondaryProducts.map((product, index) => (
            <SecondaryProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}