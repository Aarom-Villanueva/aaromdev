export type MediaItem = {
  type: 'video' | 'image';
  src: string;
  label: string;
  scroll?: boolean;
  poster?: string;
};

export type Product = {
  slug: 'aromacloud' | 'nara' | 'vanta-01' | 'ferramenta' | 'kawsay';
  name: string;
  tagline: string;
  summary: string;
  image: string;
  mediaItems?: MediaItem[];
  role?: string;
  technologies?: string[];
  status: 'featured' | 'in-preparation' | 'academic';
};

export const featuredProduct: Product = {
  slug: 'aromacloud',
  name: 'AromaCloud',
  tagline: 'Una plataforma para convertir perfumerías en negocios digitales.',
  summary: 'Plataforma SaaS multi-tenant pensada para que perfumerías administren productos, stock, clientes, pedidos, configuraciones y suscripciones desde un mismo ecosistema.',
  image: '/screenshots/aromacloud.png',
  role: 'Producto personal — concepto, arquitectura y desarrollo.',
  technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  status: 'featured',
};

export const secondaryProducts: Product[] = [
  {
    slug: 'ferramenta',
    name: 'Ferramenta.pe',
    tagline: 'Tienda especializada en herramientas y equipos.',
    summary: 'E-commerce enfocado en la venta de generadores, ventiladores y herramientas industriales, con catálogo de productos, fichas técnicas y contacto integrado.',
    image: '/screenshots/ferramenta-producto.png',
    mediaItems: [
      { type: 'video', src: 'https://res.cloudinary.com/epea8suu/video/upload/v1789140873/ferramenta-home.mp4', label: 'Inicio', poster: '/screenshots/ferramenta-producto.png' },
      { type: 'video', src: 'https://res.cloudinary.com/epea8suu/video/upload/v1789140852/ferramenta-generadores.mp4', label: 'Generadores', poster: '/screenshots/ferramenta-producto.png' },
      { type: 'video', src: 'https://res.cloudinary.com/epea8suu/video/upload/v1789140904/ferramenta-ventiladores.mp4', label: 'Ventiladores', poster: '/screenshots/ferramenta-producto.png' },
      { type: 'image', src: '/screenshots/ferramenta-producto.png', label: 'Producto', scroll: true },
    ],
    status: 'featured',
  },
  {
    slug: 'kawsay',
    name: 'Kawsay',
    tagline: 'Gestión Operativa B2B',
    summary: 'Sistema empresarial en 4 capas para la administración de purificación de agua: clientes, flota, programación de visitas y mantenimientos.',
    role: 'Arquitectura .NET & Backend',
    status: 'academic',
    technologies: ['C#', 'ASP.NET', 'SQL Server', 'Entity Framework', 'Bootstrap 5'],
    mediaItems: [
      { type: 'image', src: '/screenshots/kawsay-dashboard.png', label: 'Dashboard' },
      { type: 'video', src: 'https://res.cloudinary.com/epea8suu/video/upload/v1789140926/kawsay-clientes.mp4', label: 'Historial Clientes', poster: '/screenshots/kawsay-dashboard.png' },
      { type: 'video', src: 'https://res.cloudinary.com/epea8suu/video/upload/v1789140942/kawsay-tecnicos.mp4', label: 'Historial Técnicos', poster: '/screenshots/kawsay-dashboard.png' },
    ],
    image: '/screenshots/kawsay-dashboard.png',
  },
  {
    slug: 'vanta-01',
    name: 'VANTA-01',
    tagline: 'Sistema técnico en desarrollo.',
    summary: 'Producto en preparación. Su problema, propuesta y evidencia visual se incorporarán cuando el caso de estudio esté listo.',
    image: '/screenshots/vanta-01.png',
    status: 'in-preparation',
  },
  {
    slug: 'nara',
    name: 'NARA',
    tagline: 'Identidad digital con estructura.',
    summary: 'Producto en preparación. Su problema, propuesta y evidencia visual se incorporarán cuando el caso de estudio esté listo.',
    image: '/screenshots/nara.png',
    status: 'in-preparation',
  },
];
