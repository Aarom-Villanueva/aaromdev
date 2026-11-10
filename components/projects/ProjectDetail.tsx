import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import AmbientVideo from '@/components/projects/AmbientVideo';
import { WhatsAppIcon } from '@/components/social/SocialLinks';
import { BrowserFrame, KindTag, projectHref } from '@/components/projects/ProjectCard';
import { buildWhatsAppUrl } from '@/data/contact';
import { categoryLabels, nextProject } from '@/data/projects';
import type { Project } from '@/data/projects';
import { services } from '@/data/services';

function ambientImage(project: Project) {
  return project.media.type === 'video' ? project.media.poster : project.media.src;
}

function Hero({ project, whatsappUrl }: { project: Project; whatsappUrl: string }) {
  return (
    <section className="relative overflow-hidden bg-[#030303] pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Ambient background from the project's own visual: the blurred poster everywhere,
          and on large screens a low-res copy of the video playing behind it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={ambientImage(project)}
          alt=""
          className="absolute left-1/2 top-[38%] h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 scale-125 object-cover opacity-30 blur-[110px]"
        />
        {project.media.type === 'video' && project.media.ambient ? (
          <AmbientVideo
            src={project.media.ambient}
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.22] blur-[36px] saturate-150"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/30 via-[#030303]/65 to-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(3,3,3,0.85),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <Link
            href="/proyectos"
            className="group mb-10 inline-flex items-center gap-2 text-[13px] font-medium text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Todos los proyectos
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-6 flex flex-wrap gap-2">
            <KindTag project={project} />
            <span className="tag-tech">{categoryLabels[project.category]}</span>
          </div>
        </Reveal>
        {/* Name on its own row so long names never run into the summary column. */}
        <Reveal delay={0.1}>
          <h1 className="text-display mb-8 break-words text-white lg:mb-10">{project.name}</h1>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <p className="text-body-large max-w-xl text-white/70">{project.tagline}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-white/55">{project.summary}</p>
            </Reveal>
            {project.statusNote ? (
              <Reveal delay={0.22}>
                <p className="mb-8 max-w-xl rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-relaxed text-white/60">
                  <span className="font-semibold text-white/80">Estado actual: </span>
                  {project.statusNote}
                </p>
              </Reveal>
            ) : null}
            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary group">
                    Ver en vivo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : null}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={project.url ? 'btn-secondary' : 'btn-primary'}
                >
                  <WhatsAppIcon />
                  Quiero algo así
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3}>
          <BrowserFrame
            project={project}
            ratio={project.media.type === 'video' ? project.media.aspectRatio : undefined}
            fade={false}
            className="mt-14 rounded-2xl border border-white/10 shadow-[0_30px_120px_-30px_rgba(120,157,255,0.25)] lg:mt-20"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Features({ project }: { project: Project }) {
  if (!project.features?.length) return null;
  const hasPlanned = project.features.some((feature) => feature.planned);

  return (
    <section className="relative bg-[#08090B] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="section-label">Qué hace</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-headline mb-14 max-w-3xl text-white">
            Funciones principales.{' '}
            <span className="text-white/50">
              {hasPlanned ? 'Lo que ya funciona y lo que viene.' : 'Lo que ya está implementado.'}
            </span>
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {project.features.map((feature, index) => (
            <Reveal key={feature.title} delay={0.05 * index}>
              <div className="h-full rounded-2xl border border-white/[0.07] bg-[#0A0C0F] p-7 transition-colors duration-300 hover:border-white/15 lg:p-8">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-[#789DFF]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {feature.planned ? (
                    <span className="rounded-full border border-amber-300/25 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-200/80">
                      Previsto
                    </span>
                  ) : null}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white/90">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnicalDetails({ project }: { project: Project }) {
  const hasStack = Boolean(project.stack?.length);
  if (!hasStack && !project.technologies?.length) return null;

  return (
    <section className="relative bg-[#030303] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="section-label">Detalles técnicos</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-title mb-5 text-white">Cómo está construido</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm leading-relaxed text-white/45">
              Las tecnologías del proyecto y para qué se usa cada una.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          {hasStack ? (
            <dl className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {project.stack!.map((item, index) => (
                <Reveal key={item.name} delay={0.04 * index}>
                  <div className="grid gap-1 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                    <dt className="font-mono text-[13px] tracking-[0.02em] text-[#A9C5FF]">{item.name}</dt>
                    <dd className="text-sm leading-relaxed text-white/55">{item.purpose}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          ) : (
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {project.technologies!.map((technology) => (
                  <span key={technology} className="tag-tech tag-tech-blue">
                    {technology}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function ClosingCta({ project, whatsappUrl }: { project: Project; whatsappUrl: string }) {
  const service = services.find((item) => item.examples === project.category);
  const next = nextProject(project.slug);

  return (
    <section className="relative bg-[#08090B] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-7">
          <div className="flex h-full flex-col justify-between gap-10 rounded-2xl border border-[#789DFF]/25 bg-[#789DFF]/[0.04] p-8 lg:p-10">
            <div>
              <h2 className="text-title mb-4 text-white">¿Quieres algo así para tu negocio?</h2>
              <p className="max-w-lg text-sm leading-relaxed text-white/55">
                Cuéntame qué vendes y cómo trabajas hoy. Te digo qué te conviene y cuánto costaría, sin compromiso.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon />
                Escríbeme por WhatsApp
              </a>
              {service ? (
                <Link
                  href="/#servicios"
                  className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white"
                >
                  Ver precio de {service.name.toLowerCase()}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : null}
            </div>
          </div>
        </Reveal>

        {next && next.slug !== project.slug ? (
          <Reveal className="lg:col-span-5" delay={0.1}>
            <Link
              href={projectHref(next)}
              className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-white/[0.07] bg-[#0A0C0F] p-8 transition-colors duration-300 hover:border-white/20 lg:p-10"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] text-white/35">SIGUIENTE PROYECTO</span>
              <div>
                <span className="mb-2 block text-title text-white">{next.name}</span>
                <span className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors group-hover:text-white">
                  {next.tagline}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const whatsappUrl = buildWhatsAppUrl(
    `Hola Aarom, vi el proyecto ${project.name} en tu web y quiero algo así para mi negocio.`
  );

  return (
    <>
      <Hero project={project} whatsappUrl={whatsappUrl} />
      <Features project={project} />
      <TechnicalDetails project={project} />
      <ClosingCta project={project} whatsappUrl={whatsappUrl} />
    </>
  );
}
