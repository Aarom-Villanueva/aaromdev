export type Service = {
  slug: 'landing' | 'ecommerce' | 'sistemas';
  name: string;
  description: string;
  priceEyebrow?: string;
  priceMain: string;
  priceSupport?: string;
  ctaLabel: string;
  whatsappMessage: string;
  includes: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: 'landing',
    name: 'Landing page',
    description: 'Presenta tu negocio y facilita que tus clientes te contacten.',
    priceEyebrow: 'Desde',
    priceMain: 'S/600',
    priceSupport: 'Una página para presentar tu negocio',
    ctaLabel: 'Quiero mi página web',
    whatsappMessage: 'Hola Aarom, quiero mi página web (landing desde S/600).',
    includes: ['Hasta 5 secciones', 'Diseño adaptado a tu marca', 'Adaptada a celulares', 'Contacto directo por WhatsApp'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    description: 'Vende tus productos con una tienda online propia.',
    priceEyebrow: 'Desde',
    priceMain: 'S/1,800',
    priceSupport: 'Tienda básica con alcance definido',
    ctaLabel: 'Cotizar mi tienda',
    whatsappMessage: 'Hola Aarom, quiero cotizar mi tienda online (e-commerce).',
    includes: ['Catálogo de productos', 'Carrito de compras', 'Gestión de pedidos', 'Panel para administrar tu tienda'],
    featured: true,
  },
  {
    slug: 'sistemas',
    name: 'Sistemas a medida',
    description: 'Organiza los procesos de tu negocio en una herramienta propia.',
    priceEyebrow: 'Desde',
    priceMain: 'S/2,500',
    priceSupport: 'Versión inicial para un proceso concreto',
    ctaLabel: 'Hablemos de mi sistema',
    whatsappMessage: 'Hola Aarom, quiero hablar sobre un sistema a medida para mi negocio.',
    includes: ['Análisis de tus necesidades', 'Alcance y funciones definidos en la propuesta', 'Panel pensado para tu equipo'],
  },
];
