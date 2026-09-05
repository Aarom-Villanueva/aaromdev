'use client';

import { Reveal, StaggerReveal, fadeUp } from '@/components/motion/Reveal';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Server, Layers, Circle } from 'lucide-react';

const indicators = [
  { icon: MapPin, label: 'Lima, Perú' },
  { icon: GraduationCap, label: 'Desarrollo de Software' },
  { icon: Server, label: 'Backend y Cloud' },
  { icon: Layers, label: 'Full Stack' },
  { icon: Circle, label: 'Disponible para proyectos', accent: true },
];

export default function AboutSection() {
  return (
    <section id="perfil" className="relative py-32 lg:py-40 bg-[#111318] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_right,rgba(120,157,255,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: abstract technical visual */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#1A1D23] via-[#111318] to-[#08090B]">
                {/* Abstract architectural diagram */}
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMidYMid slice">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(113,119,132,0.08)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#789DFF" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#789DFF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#grid)" />

                  {/* Architecture nodes */}
                  <g stroke="url(#lineGrad)" strokeWidth="1.5" fill="none">
                    <line x1="80" y1="100" x2="200" y2="180" />
                    <line x1="200" y1="180" x2="320" y2="100" />
                    <line x1="200" y1="180" x2="120" y2="320" />
                    <line x1="200" y1="180" x2="280" y2="320" />
                    <line x1="120" y1="320" x2="200" y2="420" />
                    <line x1="280" y1="320" x2="200" y2="420" />
                  </g>

                  {/* Node circles */}
                  {[
                    [80, 100], [320, 100], [200, 180], [120, 320], [280, 320], [200, 420],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="6" fill="#08090B" stroke="#789DFF" strokeWidth="1.5" />
                  ))}

                  {/* Labels */}
                  <text x="80" y="88" fill="rgba(243,244,246,0.35)" fontSize="9" fontFamily="monospace" textAnchor="middle">API</text>
                  <text x="320" y="88" fill="rgba(243,244,246,0.35)" fontSize="9" fontFamily="monospace" textAnchor="middle">AUTH</text>
                  <text x="200" y="168" fill="rgba(243,244,246,0.35)" fontSize="9" fontFamily="monospace" textAnchor="middle">CORE</text>
                  <text x="120" y="338" fill="rgba(243,244,246,0.35)" fontSize="9" fontFamily="monospace" textAnchor="middle">DB</text>
                  <text x="280" y="338" fill="rgba(243,244,246,0.35)" fontSize="9" fontFamily="monospace" textAnchor="middle">CACHE</text>
                  <text x="200" y="438" fill="rgba(243,244,246,0.35)" fontSize="9" fontFamily="monospace" textAnchor="middle">CLIENT</text>
                </svg>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent">
                  <p className="text-label text-white/40">Arquitectura</p>
                  <p className="text-sm text-white/70 mt-1">Estructura pensada para crecer</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: editorial copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="section-label">Perfil</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline text-white mb-10">
                Aprender. Construir. <span className="text-white/50">Mejorar.</span>
              </h2>
            </Reveal>

            <div className="space-y-6 max-w-xl">
              <Reveal delay={0.1}>
                <p className="text-body-large text-white/60">
                  Soy estudiante de Desarrollo de Software en ISIL y desarrollo proyectos orientados a backend, cloud, aplicaciones web y móviles. Me interesa comprender cómo funciona cada solución por dentro, estructurarla correctamente y convertirla en un producto útil para personas o negocios.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-body-large text-white/45">
                  Mi experiencia combina proyectos personales, trabajos académicos y desarrollos freelance. Cada proyecto representa una oportunidad para fortalecer mi lógica, arquitectura y capacidad para resolver problemas reales.
                </p>
              </Reveal>
            </div>

            <StaggerReveal className="mt-14">
              <div className="flex flex-wrap gap-3">
                {indicators.map((ind) => (
                  <motion.div
                    key={ind.label}
                    variants={fadeUp}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-[13px] font-medium ${
                      ind.accent
                        ? 'border-[#789DFF]/25 bg-[#789DFF]/[0.06] text-[#A9C5FF]'
                        : 'border-white/[0.08] bg-white/[0.02] text-white/65'
                    }`}
                  >
                    <ind.icon className={`h-3.5 w-3.5 ${ind.accent ? 'text-[#789DFF]' : 'text-white/40'}`} />
                    {ind.label}
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
