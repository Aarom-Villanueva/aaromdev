export type Product = {
  slug: 'aromacloud' | 'kawsay' | 'nara' | 'vanta-01';
  name: string;
  summary: string;
  role?: string;
  technologies?: string[];
  status: 'featured' | 'in-preparation';
};

export const featuredProduct: Product = {
  slug: 'aromacloud',
  name: 'AromaCloud',
  summary: 'Una plataforma SaaS multi-tenant pensada para que perfumerías administren productos, stock, clientes, pedidos, configuraciones y suscripciones desde un mismo ecosistema.',
  role: 'Producto personal — concepto, arquitectura y desarrollo.',
  technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  status: 'featured',
};

export const secondaryProducts: Product[] = [
  { slug: 'kawsay', name: 'KAWSAY', summary: 'Producto en preparación. Su caso de estudio se incorporará con contexto, propuesta y evidencia de construcción.', status: 'in-preparation' },
  { slug: 'nara', name: 'NARA', summary: 'Producto en preparación. Su caso de estudio se incorporará con contexto, propuesta y evidencia de construcción.', status: 'in-preparation' },
  { slug: 'vanta-01', name: 'VANTA-01', summary: 'Producto en preparación. Su caso de estudio se incorporará con contexto, propuesta y evidencia de construcción.', status: 'in-preparation' },
];
