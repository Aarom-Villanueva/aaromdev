'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';

const techs = [
  'Java 21', 'Spring Boot', 'Spring Security', 'JWT',
  'PostgreSQL', 'Docker', 'Next.js', 'TypeScript', 'Tailwind CSS',
];

const features = [
  { title: 'Tienda pública', desc: 'Catálogo de perfumes con detalle de producto, precios y navegación fluida para el cliente final.' },
  { title: 'Dashboard de administración', desc: 'Gestión centralizada de productos, stock, clientes, pedidos y configuraciones por tenant.' },
  { title: 'Gestión de productos', desc: 'Alta, edición y organización del inventario con validaciones de negocio y persistencia robusta.' },
  { title: 'Personalización por tenant', desc: 'Cada perfumería opera dentro del mismo ecosistema con su propia configuración e identidad.' },
  { title: 'Lógica de suscripciones', desc: 'Planes y suscripciones que controlan el acceso a funcionalidades según el nivel contratado.' },
  { title: 'Arquitectura backend', desc: 'Multi-tenant con Spring Security, JWT, separación de capas y base de datos PostgreSQL.' },
];

export default function AromaCloudSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const mockupScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.08]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 3]);
  const mockupY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -40]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2]);

  return (
    <section id="proyectos" ref={ref} className="relative bg-[#08090B]" style={{ minHeight: '200vh' }}>
      {/* Sticky visual */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,157,255,0.06)_0%,transparent_65%)]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mockup visual */}
          <div className="lg:col-span-7 relative">
            <motion.div
              style={{ scale: mockupScale, rotate: mockupRotate, y: mockupY }}
              className="relative"
            >
              <div className="project-card-frame aspect-[16/10] relative noise-overlay glow-blue">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-white/[0.01]">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-white/[0.03] text-[10px] text-white/30 font-mono">
                      aromacloud.app
                    </div>
                  </div>
                </div>

                {/* Dashboard mockup */}
                <div className="flex h-[calc(100%-44px)]">
                  {/* Sidebar */}
                  <div className="w-[14%] border-r border-white/[0.04] p-3 hidden sm:block">
                    <div className="space-y-2.5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-sm ${i === 0 ? 'bg-[#789DFF]/60' : 'bg-white/10'}`} />
                          <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Main content */}
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="space-y-2">
                        <div className="h-2.5 w-24 rounded-full bg-white/15" />
                        <div className="h-1.5 w-16 rounded-full bg-white/[0.08]" />
                      </div>
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#789DFF]/30 to-transparent border border-white/10" />
                    </div>
                    {/* Stat cards */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                          <div className="h-1.5 w-10 rounded-full bg-white/15 mb-2" />
                          <div className="h-3 w-14 rounded-full bg-white/25" />
                        </div>
                      ))}
                    </div>
                    {/* Product table */}
                    <div className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-3 space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#1A1D23] to-[#08090B] border border-white/10" />
                          <div className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
                          <div className="h-1.5 w-12 rounded-full bg-white/[0.06]" />
                          <div className={`h-4 w-12 rounded-full ${i % 2 === 0 ? 'bg-[#789DFF]/20' : 'bg-white/[0.06]'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating phone mockup */}
              <motion.div
                className="absolute -bottom-6 -right-4 sm:-right-8 w-24 sm:w-32 rounded-[20px] border border-white/10 bg-[#0D0F13] p-2 shadow-2xl hidden sm:block"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="rounded-xl overflow-hidden bg-[#111318] aspect-[9/19]">
                  <div className="p-2.5 space-y-2">
                    <div className="h-1.5 w-12 rounded-full bg-[#789DFF]/40" />
                    <div className="h-16 w-full rounded-lg bg-gradient-to-br from-[#1A1D23] to-[#08090B] border border-white/10" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-white/10" />
                      <div className="h-1.5 w-2/3 rounded-full bg-white/[0.06]" />
                    </div>
                    <div className="h-5 w-full rounded-md bg-[#789DFF]/30" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5">
            <motion.span
              className="section-label"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Proyecto principal
            </motion.span>
            <motion.h2
              className="text-display text-white mb-6"
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              AromaCloud
            </motion.h2>
            <motion.p
              className="text-title text-white/70 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Una plataforma para convertir perfumerías en negocios digitales.
            </motion.p>
            <motion.p
              className="text-body-large text-white/45 mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              AromaCloud es una plataforma SaaS multi-tenant diseñada para que distintas perfumerías administren productos, precios, stock, clientes, pedidos, configuraciones y suscripciones desde un mismo ecosistema.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {techs.map((t) => (
                <span key={t} className="tag-tech tag-tech-blue">{t}</span>
              ))}
            </motion.div>

            <motion.p
              className="text-sm text-white/40 mb-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Layers className="h-3.5 w-3.5 text-[#789DFF]/60" />
              Producto personal — concepto, arquitectura y desarrollo.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="btn-primary opacity-70 cursor-default">
                Case study en preparación <ArrowRight className="h-4 w-4" />
              </span>
              <span className="btn-secondary opacity-70 cursor-default">
                Proceso documentable próximamente
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature list that scrolls over sticky */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-[#08090B]/80 to-[#08090B]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
          <motion.h3
            className="text-title text-white/80 mb-16 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Cada parte de AromaCloud resuelve una necesidad real del negocio.
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-[#08090B] p-8 hover:bg-[#111318] transition-colors duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <span className="text-[11px] font-mono text-[#789DFF]/50 mb-4 block">0{i + 1}</span>
                <h4 className="text-lg font-semibold text-white/90 mb-3 group-hover:text-white transition-colors">{f.title}</h4>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
