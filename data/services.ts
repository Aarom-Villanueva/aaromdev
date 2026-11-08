import type { ProjectCategory } from '@/data/projects';

export type Service = {
  slug: 'landing' | 'ecommerce' | 'sistemas';
  name: string;
  description: string;
  /** Precio regular "desde", en soles. */
  price: number;
  priceSupport: string;
  /** Para quién es, en una línea. */
  idealFor: string;
  /** Plazo de entrega, si es fijo. */
  delivery?: string;
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
    priceSupport: 'Tu negocio y tus productos en una sola página',
    idealFor: 'Restaurantes, cafeterías y tiendas que venden por WhatsApp.',
    delivery: 'Entrega en 5 a 8 días hábiles',
    ctaLabel: 'Quiero mi página web',
    whatsappSubject: 'mi página web',
    includes: [
      'Hasta 30 productos o platos con foto y precio',
      'Hasta 5 secciones',
      'Diseño adaptado a tu marca',
      'Adaptada a celulares',
      'Pedidos y consultas directo a tu WhatsApp',
    ],
    examples: 'web',
  },
  {
    slug: 'ecommerce',
    name: 'Catálogo o tienda online',
    description: 'Vende tus productos con una tienda online propia.',
    price: 1800,
    priceSupport: 'Tienda básica con alcance definido',
    idealFor: 'Negocios con muchos productos que quieren recibir pedidos en línea.',
    ctaLabel: 'Cotizar mi tienda',
    whatsappSubject: 'cotizar mi tienda online',
    includes: [
      'Catálogo de productos por categorías',
      'Carrito de compras',
      'Gestión de pedidos',
      'Panel para administrar tu tienda',
      'Adaptada a celulares',
    ],
    examples: 'tienda',
    featured: true,
  },
  {
    slug: 'sistemas',
    name: 'Sistema para tu negocio',
    description: 'Organiza los procesos de tu negocio en una herramienta propia.',
    price: 2500,
    priceSupport: 'Versión inicial para un proceso concreto',
    idealFor: 'Negocios que hoy llevan pedidos, citas o inventario en cuadernos o Excel.',
    ctaLabel: 'Hablemos de mi sistema',
    whatsappSubject: 'hablar sobre un sistema para mi negocio',
    includes: ['Análisis de tus necesidades', 'Alcance y funciones definidos en la propuesta', 'Panel pensado para tu equipo'],
    examples: 'sistema',
  },
];
