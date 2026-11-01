import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectsExplorer from '@/components/projects/ProjectsExplorer';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Proyectos — Aarom Villanueva',
  description:
    'Páginas web, catálogos, tiendas online y sistemas hechos por Aarom Villanueva: trabajo para clientes, productos propios y demos.',
  alternates: { canonical: '/proyectos' },
  openGraph: {
    title: 'Proyectos — Aarom Villanueva',
    description: 'Páginas web, catálogos, tiendas online y sistemas para negocios.',
    url: '/proyectos',
  },
};

/** Static fallback (and no-JS view): every project, unfiltered. */
function AllProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="relative bg-[#030303]">
      <Navbar />
      <main>
        <section className="relative bg-[#08090B] pt-32 pb-24 lg:pt-40 lg:pb-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <span className="section-label">Proyectos</span>
            <h1 className="text-headline mb-6 max-w-3xl text-white">
              Todo lo que he construido. <span className="text-white/50">Filtra por lo que necesitas.</span>
            </h1>
            <p className="text-body-large mb-12 max-w-2xl text-white/45">
              Cada proyecto indica si es trabajo para un cliente, un producto propio, una demo o un proyecto académico.
            </p>

            <Suspense fallback={<AllProjectsGrid />}>
              <ProjectsExplorer />
            </Suspense>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
