import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectMedia from '@/components/projects/ProjectMedia';
import { kindLabels } from '@/data/projects';
import type { Project } from '@/data/projects';

/** Technologies always visible on small screens in the highlight card; the rest appear from `sm`. */
const PRIMARY_TECHNOLOGIES = ['Java 21', 'Spring Boot', 'PostgreSQL', 'Next.js'];

/** Real domain when the project is live; otherwise just its name, never an invented URL. */
function hostOf(project: Project) {
  return project.url ? new URL(project.url).host : project.slug;
}

export function projectHref(project: Project) {
  return `/proyectos/${project.slug}`;
}

/** Browser-window frame around a project's video or capture. Used by the cards and the detail page. */
export function BrowserFrame({
  project,
  className = '',
  aspect = 'aspect-video',
  fade = true,
}: {
  project: Project;
  className?: string;
  aspect?: string;
  fade?: boolean;
}) {
  return (
    <div className={`flex flex-col overflow-hidden bg-[#0D0F13] ${className}`}>
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/[0.05] bg-white/[0.02] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate font-mono text-[10px] text-white/30">{hostOf(project)}</span>
      </div>
      {/* overflow-hidden is required: without it an aspect-ratio box grows to fit tall content. */}
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <ProjectMedia media={project.media} alt={`${project.name} — vista del proyecto`} fade={fade} />
      </div>
    </div>
  );
}

export function KindTag({ project }: { project: Project }) {
  return (
    <span className={`tag-tech ${project.kind === 'cliente' ? 'tag-tech-blue' : ''}`}>{kindLabels[project.kind]}</span>
  );
}

/** Project name as a stretched link: the whole card opens the detail page without nesting links. */
function ProjectName({ project, className }: { project: Project; className: string }) {
  return (
    <h3 className={className}>
      <Link
        href={projectHref(project)}
        className="after:absolute after:inset-0 after:z-[1] after:content-[''] focus-visible:outline-none"
      >
        {project.name}
      </Link>
    </h3>
  );
}

export function HighlightProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0C0F] transition-all duration-300 hover:border-white/20">
      <div className="grid items-center gap-4 p-7 lg:grid-cols-12 lg:gap-12 lg:p-10">
        <div className="lg:col-span-5">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="tag-tech tag-tech-blue">Proyecto destacado</span>
            <KindTag project={project} />
          </div>

          <ProjectName project={project} className="text-title mb-4 text-white" />
          <p className="mb-4 text-lg leading-relaxed text-white/70">{project.tagline}</p>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-white/45">{project.summary}</p>

          {project.technologies?.length ? (
            <div className="mb-8 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className={`tag-tech tag-tech-blue text-[11px] ${
                    PRIMARY_TECHNOLOGIES.includes(technology) ? '' : 'hidden sm:inline-flex'
                  }`}
                >
                  {technology}
                </span>
              ))}
            </div>
          ) : null}

          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/50 transition-colors group-hover:text-white">
            Ver proyecto
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        <div className="lg:col-span-7">
          <BrowserFrame
            project={project}
            aspect="aspect-[16/10]"
            className="rounded-xl border border-white/10 shadow-[0_0_50px_-10px_rgba(59,130,246,0.12)]"
          />
        </div>
      </div>
    </article>
  );
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0A0C0F] transition-all duration-300 hover:border-white/20 hover:bg-[#111318]">
      <BrowserFrame project={project} className="border-b border-white/[0.05]" />

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 font-mono text-[11px] tracking-[0.16em] text-white/35">
          PROYECTO / {String(index + 1).padStart(2, '0')}
        </span>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <ProjectName project={project} className="text-xl font-semibold text-white/90" />
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
            {project.tagline}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/45">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <KindTag project={project} />
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/35 transition-colors group-hover:text-white/80">
            Ver proyecto
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#789DFF]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
