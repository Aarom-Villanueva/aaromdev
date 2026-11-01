import { cloudinaryVideo } from '@/lib/cloudinary';

/** Filter used on /proyectos and by each service's "Ver ejemplos" link. */
export type ProjectCategory = 'web' | 'tienda' | 'sistema';

/** Honest label shown on every card: what kind of work this actually is. */
export type ProjectKind = 'cliente' | 'producto' | 'demo' | 'academico';

export type ProjectMedia =
  | {
      type: 'video';
      src: string;
      poster: string;
      /** Width / height of the recording. The detail page sizes its frame to it so
       * nothing is cut or letterboxed; cards keep a uniform 16:9 and show it whole. */
      aspectRatio?: number;
      /** Zoom out: empty margin around the video, as a fraction of the width (0.05 = 5%). */
      inset?: number;
    }
  /** Long full-page capture that scrolls by itself inside the frame. */
  | { type: 'scroll-image'; src: string; width: number; height: number };

export type ProjectFeature = { title: string; description: string };
export type ProjectStackItem = { name: string; purpose: string };

export type Project = {
  slug: string;
  name: string;
  /** Short pill next to the name. */
  tagline: string;
  summary: string;
  category: ProjectCategory;
  kind: ProjectKind;
  media: ProjectMedia;
  /** Live site. The detail page shows a "Ver en vivo" button when present. */
  url?: string;
  /** Short tags (highlight card and fallback for the detail page when `stack` is empty). */
  technologies?: string[];
  /** Detail page, "Qué hace". Only write what the project really does today. */
  features?: ProjectFeature[];
  /** Detail page, "Detalles técnicos": each technology and what it is used for. */
  stack?: ProjectStackItem[];
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
    },
    url: 'https://aromacloud.app',
    technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    // TODO: revisar con el código de AromaCloud y ampliar (catálogo público, superadmin, etc.).
    features: [
      {
        title: 'Varias tiendas, una plataforma',
        description: 'Cada perfumería trabaja con sus propios datos, separados del resto, sobre la misma aplicación.',
      },
      {
        title: 'Panel de administración',
        description: 'Productos, stock, clientes y pedidos de la tienda gestionados desde un solo lugar.',
      },
      {
        title: 'Configuración y suscripciones',
        description: 'Cada tienda ajusta su configuración y mantiene su plan de suscripción dentro de la plataforma.',
      },
    ],
    stack: [
      { name: 'Java 21 + Spring Boot', purpose: 'API y reglas de negocio de la plataforma.' },
      { name: 'Spring Security + JWT', purpose: 'Inicio de sesión y permisos por rol.' },
      { name: 'PostgreSQL', purpose: 'Base de datos de todas las tiendas, con los datos de cada una aislados.' },
      { name: 'Next.js + TypeScript', purpose: 'Interfaz del panel y del catálogo.' },
      { name: 'Tailwind CSS', purpose: 'Sistema visual de la interfaz.' },
      { name: 'Docker', purpose: 'Empaquetado y despliegue de los servicios.' },
    ],
    highlight: true,
    showOnHome: true,
  },
  {
    slug: 'ferramenta',
    name: 'Ferramenta',
    tagline: 'Tienda de herramientas y equipos',
    summary:
      'E-commerce de generadores, ventiladores y herramientas industriales, con catálogo, fichas técnicas y contacto integrado.',
    category: 'tienda',
    kind: 'cliente',
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1793565635/ferramenta-video.mp4'),
      aspectRatio: 1920 / 904,
    },
    // TODO: agregar `url`, `features` y `stack` cuando revise el proyecto.
    showOnHome: true,
  },
  {
    slug: 'trama',
    name: 'TRAMA',
    tagline: 'Catálogo de ropa',
    summary:
      'Catálogo online para una marca de ropa: colecciones de mujer y hombre, ficha por prenda con tallas y pedido por WhatsApp.',
    category: 'tienda',
    kind: 'demo',
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1793557443/trama-video.mp4'),
      inset: 0.05,
    },
    url: 'https://trama-opal.vercel.app',
    features: [
      {
        title: 'Colecciones de mujer y hombre',
        description: 'La portada lleva directo a cada colección y destaca las prendas esenciales con su precio.',
      },
      {
        title: 'Catálogo con filtros',
        description: 'Las 12 prendas se filtran por colección, categoría, talla y precio, y se pueden ordenar.',
      },
      {
        title: 'Ficha de cada prenda',
        description: 'Fotos, descripción, color, selector de talla de XS a XL, guía de tallas y cantidad.',
      },
      {
        title: 'Bolsa y pedido por WhatsApp',
        description:
          'El cliente arma su selección con subtotal y la envía como consulta por WhatsApp; disponibilidad y envío se confirman en la conversación.',
      },
    ],
    // TODO: completar `stack` con el código de TRAMA.
    technologies: ['Next.js'],
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
    // TODO: agregar `url`, `features` y `stack` cuando revise el proyecto.
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
    // TODO: agregar `url`, `features` y `stack` cuando revise el proyecto.
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
    // TODO: revisar con el código de Kawsay y completar `features` y `stack`.
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

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Next project in list order (wraps around), for the "Siguiente proyecto" link. */
export function nextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
