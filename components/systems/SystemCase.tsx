import type { SystemCaseData } from '@/data/systems';

export default function SystemCase({ system, index }: { system: SystemCaseData; index: number }) {
  return (
    <article className="relative border-t border-white/[0.08] py-8 first:border-t-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-10">
      <div className="mb-5 lg:col-span-3 lg:mb-0"><span className="font-mono text-[11px] tracking-[0.16em] text-[#789DFF]/70">0{index + 1} / {system.category}</span></div>
      <div className="lg:col-span-5"><h3 className="mb-3 text-2xl font-semibold text-white/90">{system.title}</h3><p className="text-sm leading-relaxed text-white/48">{system.description}</p></div>
      <div className="mt-6 flex flex-wrap content-start gap-2 lg:col-span-4 lg:mt-0">{system.technologies.map((technology) => <span key={technology} className="tag-tech">{technology}</span>)}</div>
    </article>
  );
}
