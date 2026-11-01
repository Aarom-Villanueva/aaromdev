import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProjectDetail from '@/components/projects/ProjectDetail';
import Footer from '@/components/sections/Footer';
import { getProject, projects } from '@/data/projects';
import type { Project } from '@/data/projects';

type Params = { params: { slug: string } };

/** Every project page is generated at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

/** Share image: the video poster cropped to 1200×630, or the site image for captures. */
function shareImage(project: Project): string {
  if (project.media.type !== 'video') return '/og-image.jpg';
  return project.media.poster.replace(/w_\d+,c_limit/, 'w_1200,h_630,c_fill');
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const title = `${project.name} — ${project.tagline} | Aarom Villanueva`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `/proyectos/${project.slug}`,
      images: [{ url: shareImage(project), width: 1200, height: 630, alt: project.name }],
    },
    twitter: { card: 'summary_large_image', title, description: project.summary, images: [shareImage(project)] },
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <div className="relative bg-[#030303]">
      <Navbar />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </div>
  );
}
