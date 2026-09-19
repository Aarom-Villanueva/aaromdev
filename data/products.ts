export type MediaItem = {
  type: 'video' | 'image';
  src: string;
  label: string;
  scroll?: boolean;
  poster?: string;
  width?: number;
  height?: number;
};

export type Product = {
  slug: 'aromacloud' | 'nara' | 'vanta-01' | 'ferramenta' | 'kawsay';
  name: string;
  tagline: string;
  summary: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
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
  image: '/screenshots/aromacloud.webp',
  imageWidth: 1200,
  imageHeight: 4619,
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
    imageWidth: 1920,
    imageHeight: 2866,
    mediaItems: [
      {
        type: 'video',
        src: 'https://res.cloudinary.com/epea8suu/video/upload/f_auto,q_auto/v1789140873/ferramenta-home.mp4',
        label: 'Inicio',
        poster: 'https://res.cloudinary.com/epea8suu/video/upload/so_0,w_960,q_auto,f_auto/v1789140873/ferramenta-home.jpg',
      },
      {
        type: 'video',
        src: 'https://res.cloudinary.com/epea8suu/video/upload/f_auto,q_auto/v1789140852/ferramenta-generadores.mp4',
        label: 'Generadores',
        poster: 'https://res.cloudinary.com/epea8suu/video/upload/so_0,w_960,q_auto,f_auto/v1789140852/ferramenta-generadores.jpg',
      },
      {
        type: 'video',
        src: 'https://res.cloudinary.com/epea8suu/video/upload/f_auto,q_auto/v1789140904/ferramenta-ventiladores.mp4',
        label: 'Ventiladores',
        poster: 'https://res.cloudinary.com/epea8suu/video/upload/so_0,w_960,q_auto,f_auto/v1789140904/ferramenta-ventiladores.jpg',
      },
      { type: 'image', src: '/screenshots/ferramenta-producto.png', label: 'Producto', scroll: true, width: 1920, height: 2866 },
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
      { type: 'image', src: '/screenshots/kawsay-dashboard.png', label: 'Dashboard', width: 1920, height: 1012 },
      {
        type: 'video',
        src: 'https://res.cloudinary.com/epea8suu/video/upload/f_auto,q_auto/v1789140926/kawsay-clientes.mp4',
        label: 'Historial Clientes',
        poster: 'https://res.cloudinary.com/epea8suu/video/upload/so_0,w_960,q_auto,f_auto/v1789140926/kawsay-clientes.jpg',
      },
      {
        type: 'video',
        src: 'https://res.cloudinary.com/epea8suu/video/upload/f_auto,q_auto/v1789140942/kawsay-tecnicos.mp4',
        label: 'Historial Técnicos',
        poster: 'https://res.cloudinary.com/epea8suu/video/upload/so_0,w_960,q_auto,f_auto/v1789140942/kawsay-tecnicos.jpg',
      },
    ],
    image: '/screenshots/kawsay-dashboard.png',
    imageWidth: 1920,
    imageHeight: 1012,
  },
  {
    slug: 'vanta-01',
    name: 'VANTA-01',
    tagline: 'Sistema técnico en desarrollo.',
    summary: 'Producto en preparación. Su problema, propuesta y evidencia visual se incorporarán cuando el caso de estudio esté listo.',
    image: '/screenshots/vanta-placeholder.png',
    imageWidth: 1280,
    imageHeight: 720,
    status: 'in-preparation',
  },
  {
    slug: 'nara',
    name: 'NARA',
    tagline: 'Identidad digital con estructura.',
    summary: 'Producto en preparación. Su problema, propuesta y evidencia visual se incorporarán cuando el caso de estudio esté listo.',
    image: '/screenshots/nara.webp',
    imageWidth: 1200,
    imageHeight: 7144,
    status: 'in-preparation',
  },
];
