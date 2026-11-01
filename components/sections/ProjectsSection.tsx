'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard, { HighlightProjectCard } from '@/components/projects/ProjectCard';
import { highlightProject, homeProjects, projects } from '@/data/projects';

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05, margin: '0px 0px -50px 0px' },
};

export default function ProjectsSection() {
  const hiddenCount = projects.length - homeProjects.length - (highlightProject ? 1 : 0);

  return (
    <section id="proyectos" className="relative bg-[#08090B] pt-16 pb-24 lg:pt-24 lg:pb-36">
      <motion.div {...sectionFade} className="mx-auto max-w-7xl px-6 lg:px-10">
        <span className="section-label">Proyectos</span>
        <h2 className="text-headline mb-6 max-w-3xl text-white">
          Lo que construyo. <span className="text-white/50">Webs, tiendas y sistemas.</span>
        </h2>
        <p className="text-body-large mb-14 max-w-2xl text-white/45">
          Trabajo para clientes, productos propios y demos que muestran lo que puedo hacer por tu negocio.
        </p>

        {highlightProject ? <HighlightProjectCard project={highlightProject} /> : null}

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {homeProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/proyectos" className="btn-secondary group">
            Ver todos los proyectos
            {hiddenCount > 0 ? <span className="text-white/40">(+{hiddenCount})</span> : null}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
