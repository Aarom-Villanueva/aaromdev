import type { ProjectCategory } from '@/data/projects';

export type Service = {
  slug: 'landing' | 'ecommerce' | 'sistemas';
  name: string;
  description: string;
  /** Precio regular "desde", en soles. */
  price: number;
  priceSupport: string;
  ctaLabel: string;
  /** Qué está pidiendo el cliente; se usa para armar el mensaje de WhatsApp. */
  whatsappSubject: string;
  includes: string[];
  /** Categoría de /proyectos que se abre con "Ver ejemplos". */
  examples: ProjectCategory;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: 'landing',
    name: 'Página web para tu negocio',
    description: 'Presenta tu negocio y facilita que tus clientes te contacten.',
    price: 600,
    priceSupport: 'Una página para presentar tu negocio',
    ctaLabel: 'Quiero mi página web',
    whatsappSubject: 'mi página web',
    includes: ['Hasta 5 secciones', 'Diseño adaptado a tu marca', 'Adaptada a celulares', 'Contacto directo por WhatsApp'],
    examples: 'web',
  },
  {
    slug: 'ecommerce',
    name: 'Catálogo o tienda online',
    description: 'Vende tus productos con una tienda online propia.',
    price: 1800,
    priceSupport: 'Tienda básica con alcance definido',
    ctaLabel: 'Cotizar mi tienda',
    whatsappSubject: 'cotizar mi tienda online',
    includes: ['Catálogo de productos', 'Carrito de compras', 'Gestión de pedidos', 'Panel para administrar tu tienda'],
    examples: 'tienda',
    featured: true,
  },
  {
    slug: 'sistemas',
    name: 'Sistema para tu negocio',
    description: 'Organiza los procesos de tu negocio en una herramienta propia.',
    price: 2500,
    priceSupport: 'Versión inicial para un proceso concreto',
    ctaLabel: 'Hablemos de mi sistema',
    whatsappSubject: 'hablar sobre un sistema para mi negocio',
    includes: ['Análisis de tus necesidades', 'Alcance y funciones definidos en la propuesta', 'Panel pensado para tu equipo'],
    examples: 'sistema',
  },
];
