'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import { categoryLabels, isProjectCategory, projects, projectsByCategory } from '@/data/projects';
import type { ProjectCategory } from '@/data/projects';

const categories = Object.keys(categoryLabels) as ProjectCategory[];

export default function ProjectsExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const param = searchParams.get('tipo');
  const active = isProjectCategory(param) ? param : null;
  const visible = projectsByCategory(active);

  const select = (category: ProjectCategory | null) => {
    router.replace(category ? `${pathname}?tipo=${category}` : pathname, { scroll: false });
  };

  const filters: { value: ProjectCategory | null; label: string; count: number }[] = [
    { value: null, label: 'Todos', count: projects.length },
    ...categories.map((category) => ({
      value: category,
      label: categoryLabels[category],
      count: projectsByCategory(category).length,
    })),
  ];

  return (
    <>
      <div role="group" aria-label="Filtrar proyectos por tipo" className="mb-12 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const selected = filter.value === active;
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={selected}
              onClick={() => select(filter.value)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                selected
                  ? 'border-[#789DFF]/50 bg-[#789DFF]/10 text-[#A9C5FF]'
                  : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
              }`}
            >
              {filter.label}
              <span className={selected ? 'text-[#A9C5FF]/70' : 'text-white/30'}>{filter.count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/45">Pronto habrá proyectos en esta categoría.</p>
      ) : null}
    </>
  );
}
