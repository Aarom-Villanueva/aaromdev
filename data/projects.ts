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

export type ProjectFeature = {
  title: string;
  description: string;
  /** Not built yet: the detail page labels it "Previsto". */
  planned?: boolean;
};
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
  /** Still being built: cards and the detail page show an "En desarrollo" tag. */
  inDevelopment?: boolean;
  /** Honest note on what is (and isn't) live yet, shown on the detail page. */
  statusNote?: string;
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
    url: 'https://ferramenta.pe',
    // TODO: agregar `features` y `stack` cuando revise el proyecto.
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
    slug: 'torq',
    name: 'TORQ',
    tagline: 'E-commerce de equipamiento para moto',
    summary:
      'Experiencia de comercio electrónico para una marca conceptual de cultura motociclista: catálogo dinámico, variantes, carrito persistente y contenido multimedia, con una identidad en carbón y verde lima.',
    category: 'tienda',
    kind: 'demo',
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1794270668/torq-card-extendido.mp4'),
    },
    url: 'https://torq-rho.vercel.app',
    statusNote:
      'La versión publicada no tiene pagos reales ni checkout público. El simulador de pago funciona solo en local.',
    features: [
      {
        title: 'Catálogo de equipamiento',
        description: 'Cascos, guantes, chaquetas y repuestos, con fotos, precio en soles, variantes, SKU y stock de muestra.',
      },
      {
        title: 'Búsqueda, filtros y orden',
        description: 'Filtros por categoría y disponibilidad, y orden por precio o nombre.',
      },
      {
        title: 'Carrito persistente',
        description: 'Añadir productos, cambiar cantidades, eliminar y ver totales; el carrito se mantiene entre visitas.',
      },
      {
        title: 'Precios verificados en el servidor',
        description: 'El servidor recalcula precios y comprueba disponibilidad, en lugar de confiar en lo que envía el navegador.',
      },
      {
        title: 'Fotos y videos de marca',
        description: 'Multimedia servida desde Cloudinary, con reproducción manual y una alternativa estática.',
      },
      {
        title: 'Marca, accesibilidad y responsive',
        description:
          'Páginas de Nosotros y Ayuda con misión, visión y valores; adaptada a celular y escritorio, navegable con teclado y con movimiento reducido.',
      },
    ],
    stack: [
      { name: 'Next.js 16 + React 19', purpose: 'Aplicación con App Router; la API vive dentro del mismo proyecto.' },
      { name: 'TypeScript', purpose: 'Tipado de catálogo, carrito y respuestas de la API.' },
      { name: 'Tailwind CSS 4', purpose: 'Estilos junto con CSS propio para la identidad de la marca.' },
      { name: 'Motion for React', purpose: 'Animaciones de la interfaz.' },
      { name: 'PostgreSQL (Neon)', purpose: 'Base de datos de productos, variantes y stock.' },
      { name: 'Drizzle ORM + pg', purpose: 'Acceso a datos con consultas parametrizadas.' },
      { name: 'Zod', purpose: 'Validación de solicitudes, con límites de tamaño.' },
      { name: 'Cloudinary', purpose: 'Imágenes y videos de producto.' },
      { name: 'Vercel', purpose: 'Hosting, con cabeceras de seguridad.' },
      { name: 'ESLint + pruebas automatizadas', purpose: 'Verificación de calidad junto con el chequeo de TypeScript.' },
    ],
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
    slug: 'casa-criolla',
    name: 'Casa Criolla',
    tagline: 'Landing de restaurante',
    summary:
      'Landing para un restaurante de cocina peruana: platos destacados con foto, carta con precios, ubicación con horarios y reservas por WhatsApp.',
    category: 'web',
    kind: 'demo',
    // TODO: reemplazar por un video cuando esté en Cloudinary y agregar `url` (Vercel).
    media: { type: 'scroll-image', src: '/screenshots/casa-criolla.webp', width: 1200, height: 7171 },
    features: [
      {
        title: 'Portada que abre el apetito',
        description: 'Foto del salón a pantalla completa, la propuesta del restaurante en una línea y acceso directo a reservar.',
      },
      {
        title: 'Los favoritos de la casa',
        description: 'Ocho platos destacados con foto y precio en soles, para decidir antes de llegar.',
      },
      {
        title: 'Carta organizada por categorías',
        description: 'Un resumen de la carta con precios, armado desde una sola lista de platos fácil de actualizar.',
      },
      {
        title: 'Reservas y visita',
        description:
          'Dirección, horarios y botones que abren WhatsApp con el mensaje listo para reservar o pedir la carta completa.',
      },
    ],
    stack: [
      { name: 'Next.js 16 + React 19', purpose: 'Página rápida, generada como contenido estático.' },
      { name: 'TypeScript', purpose: 'Datos del restaurante, carta y horarios tipados en un solo lugar.' },
      { name: 'Tailwind CSS 4', purpose: 'Sistema visual con tokens de color, tipografía y espaciado.' },
      { name: 'next/image + next/font', purpose: 'Fotos optimizadas y tipografías Bodoni Moda y Jost servidas desde el propio sitio.' },
    ],
  },
  {
    slug: 'coffee',
    name: 'Coffee',
    tagline: 'Landing de cafetería',
    summary:
      'Landing editorial en inglés para una cafetería de especialidad: portada cinematográfica, cafés de temporada, menú, galería, ubicación y reservas.',
    category: 'web',
    kind: 'demo',
    // TODO: reemplazar por un video cuando esté en Cloudinary y agregar `url` (Vercel).
    media: { type: 'scroll-image', src: '/screenshots/coffee.webp', width: 1200, height: 7618 },
    features: [
      {
        title: 'Portada cinematográfica',
        description: 'El titular aparece por partes y la foto se acomoda con un efecto de profundidad al hacer scroll.',
      },
      {
        title: 'Cafés de temporada',
        description: 'Tres cafés destacados con origen, notas y precio; en escritorio la foto cambia al pasar sobre cada uno.',
      },
      {
        title: 'Menú, galería y ubicación',
        description: 'Carta completa, galería de fotos, dirección y horarios de atención en una sola página.',
      },
      {
        title: 'Hecha para cualquier pantalla',
        description: 'Menú a pantalla completa en celular y animaciones que se desactivan si el visitante prefiere menos movimiento.',
      },
    ],
    stack: [
      { name: 'Next.js 16 + React 19', purpose: 'Componentes de servidor por defecto; solo lo interactivo corre en el navegador.' },
      { name: 'TypeScript (strict)', purpose: 'Contenido del menú, cafés y negocio en archivos de datos tipados.' },
      { name: 'Tailwind CSS 4', purpose: 'Diseño editorial con tokens definidos en CSS.' },
      { name: 'APIs nativas del navegador', purpose: 'Animaciones con un solo listener de scroll e IntersectionObserver, sin librerías extra.' },
    ],
  },
  {
    slug: 'leadflow-ai',
    name: 'LeadFlow AI',
    tagline: 'CRM de prospectos con IA',
    summary:
      'Centraliza prospectos, conversaciones y seguimientos para que cada oportunidad de venta tenga contexto, un responsable y un próximo paso claro.',
    category: 'sistema',
    kind: 'producto',
    inDevelopment: true,
    media: {
      type: 'video',
      ...cloudinaryVideo('https://res.cloudinary.com/epea8suu/video/upload/v1794270638/leadflow-ai-presentacion.mp4', {
        posterAt: 3,
      }),
    },
    statusNote:
      'En desarrollo. Ya funcionan identidad y organizaciones; el listado, la ficha y el pipeline se pueden navegar con datos de ejemplo. El backend de prospectos y la IA están en camino.',
    features: [
      {
        title: 'Listado y búsqueda de prospectos',
        description: 'Búsqueda, filtros por etapa o responsable, orden y paginación. Hoy funciona sobre datos de ejemplo.',
      },
      {
        title: 'Ficha del prospecto',
        description: 'Quién es, de dónde llegó, quién lo atiende, su actividad y sus seguimientos, en una sola vista.',
      },
      {
        title: 'Pipeline de ventas',
        description: 'Oportunidades entre etapas como Nuevo, Calificación, Propuesta, Ganado y Perdido.',
      },
      {
        title: 'Usuarios y organizaciones',
        description: 'Identidad y organizaciones ya implementadas: cada prospecto pertenece a una organización.',
      },
      {
        title: 'Historial y seguimientos',
        description:
          'Notas, llamadas y reuniones, más una próxima acción con responsable y vencimiento. Incluye archivar sin perder el historial.',
        planned: true,
      },
      {
        title: 'Asistencia de IA',
        description: 'Resumir el contexto, recomendar el siguiente paso y redactar borradores que el usuario revisa.',
        planned: true,
      },
    ],
    stack: [
      { name: 'Next.js + React', purpose: 'Interfaz de la aplicación.' },
      { name: 'TypeScript', purpose: 'Tipado de punta a punta.' },
      { name: 'Tailwind CSS', purpose: 'Sistema visual de la interfaz.' },
      { name: 'PostgreSQL + Drizzle', purpose: 'Persistencia prevista; cada prospecto pertenecerá a una organización.' },
      { name: 'Zod', purpose: 'Validación prevista en el servidor, además de la del formulario.' },
      {
        name: 'Control de versiones por registro',
        purpose: 'Detectará ediciones simultáneas y devolverá un conflicto en vez de sobrescribir en silencio.',
      },
    ],
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
