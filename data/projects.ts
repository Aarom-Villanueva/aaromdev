import { cloudinaryVideo } from '@/lib/cloudinary';

/** Filter used on /proyectos and by each service's "Ver ejemplos" link. */
export type ProjectCategory = 'web' | 'tienda' | 'sistema';

/** Honest label shown on every card: what kind of work this actually is. */
export type ProjectKind = 'cliente' | 'producto' | 'demo' | 'academico';

export type ProjectMedia =
  /** `framed`: the video already shows its own device/browser mockup, so the card
   * drops its browser bar and shows it edge to edge. */
  | { type: 'video'; src: string; poster: string; framed?: boolean }
  /** Long full-page capture that scrolls by itself inside the frame. */
  | { type: 'scroll-image'; src: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  /** Short pill next to the name. */
  tagline: string;
  summary: string;
  category: ProjectCategory;
  kind: ProjectKind;
  media: ProjectMedia;
  /** Live site. When present the card links to it. */
  url?: string;
  technologies?: string[];
  /** Full-width card at the top of the home section. Only one project should set it. */
  highlight?: boolean;
  /** Candidate for the home section, which shows the first four in array order
   * (all projects are always on /proyectos). */
  showOnHome?: boolean;
  /** Keeps a project out of the site until its media is ready. */
  hidden?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  web: 'Páginas web',
  tienda: 'Catálogos y tiendas',
  sistema: 'Sistemas',
};

export const kindLabels: Record<ProjectKind, string> = {
  cliente: 'Cliente real',
  producto: 'Producto propio',
  demo: 'Demo',
  academico: 'Proyecto académico',
};

/* ---------------------------------------------------------------------------------
 * Para agregar o cambiar un video: pega el link de Cloudinary tal cual en
 * `cloudinaryVideo('...')`. El tamaño, el formato y la portada se generan solos.
 * --------------------------------------------------------------------------------- */

const allProjects: Project[] = [
  {
    slug: 'aromacloud',
    name: 'AromaCloud',
    tagline: 'SaaS para perfumerías',
    summary:
      'Plataforma multi-tenant para que perfumerías administren productos, stock, clientes, pedidos y suscripciones desde un mismo panel.',
    category: 'sistema',
    kind: 'producto',
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1793557480/aromacloud-video.mp4', {
        posterAt: 2,
      }),
      framed: true,
    },
    url: 'https://aromacloud.app',
    technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    highlight: true,
    showOnHome: true,
  },
  {
    slug: 'ferramenta',
    name: 'Ferramenta.pe',
    tagline: 'Tienda de herramientas y equipos',
    summary:
      'E-commerce de generadores, ventiladores y herramientas industriales, con catálogo, fichas técnicas y contacto integrado.',
    category: 'tienda',
    kind: 'cliente',
    // TODO: reemplazar por el video único del recorrido completo.
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1789140873/ferramenta-home.mp4'),
    },
    showOnHome: true,
  },
  {
    slug: 'trama',
    name: 'TRAMA',
    tagline: 'Catálogo de ropa',
    // TODO: confirmar este texto con lo que TRAMA tiene implementado hoy.
    summary: 'Catálogo online para una marca de ropa, pensado para mostrar la colección y recibir pedidos.',
    category: 'tienda',
    kind: 'demo',
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1793557443/trama-video.mp4'),
      framed: true,
    },
    showOnHome: true,
  },
  {
    slug: 'vanta-01',
    name: 'VANTA-01',
    tagline: 'Landing de producto',
    summary:
      'Landing cinematográfica para el lanzamiento de una zapatilla: video protagonista, animaciones al hacer scroll y el producto siempre al centro.',
    category: 'web',
    kind: 'demo',
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1789140959/vanta.mp4'),
    },
    showOnHome: true,
  },
  {
    slug: 'nara',
    name: 'NARA',
    tagline: 'Landing de hotel boutique',
    summary:
      'Landing editorial para un hotel boutique en el valle: fotografía protagonista, tipografía serif y un recorrido que transmite la experiencia antes de llegar.',
    category: 'web',
    kind: 'demo',
    // TODO: reemplazar por el video de NARA cuando esté listo.
    media: { type: 'scroll-image', src: '/screenshots/nara.webp', width: 1200, height: 7144 },
    showOnHome: true,
  },
  {
    slug: 'kawsay',
    name: 'Kawsay',
    tagline: 'Gestión operativa B2B',
    summary:
      'Sistema en 4 capas para una empresa de purificación de agua: clientes, flota, programación de visitas y mantenimientos.',
    category: 'sistema',
    kind: 'academico',
    // TODO: reemplazar por el video único de Kawsay.
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1789140926/kawsay-clientes.mp4'),
    },
    showOnHome: true,
    technologies: ['C#', 'ASP.NET', 'SQL Server', 'Entity Framework', 'Bootstrap 5'],
  },
];

export const projects = allProjects.filter((project) => !project.hidden);

export const highlightProject = projects.find((project) => project.highlight);
export const HOME_PROJECT_LIMIT = 4;
export const homeProjects = projects
  .filter((project) => project.showOnHome && !project.highlight)
  .slice(0, HOME_PROJECT_LIMIT);

export function projectsByCategory(category: ProjectCategory | null): Project[] {
  return category ? projects.filter((project) => project.category === category) : projects;
}

export function isProjectCategory(value: string | null | undefined): value is ProjectCategory {
  return value === 'web' || value === 'tienda' || value === 'sistema';
}
