import type { Service } from '@/data/services';

export type Promo = {
  /** Texto principal de la tira. */
  message: string;
  /** Fin de la promoción, con la zona horaria de Lima (-05:00). Al pasar esta hora,
   * la tira y los descuentos desaparecen solos, sin volver a publicar la web. */
  endsAt: string;
  /** Cómo se lee la fecha en la web. */
  endsLabel: string;
  /** Precio promocional por servicio. Un servicio que no aparece aquí no tiene descuento. */
  prices: Partial<Record<Service['slug'], number>>;
};

/* ---------------------------------------------------------------------------------
 * Para una promo nueva: cambia el mensaje, la fecha y los precios.
 * Para apagarla antes de tiempo: `export const promo: Promo | null = null;`
 * --------------------------------------------------------------------------------- */
export const promo: Promo | null = {
  message: 'Precios especiales en páginas web, tiendas y sistemas',
  endsAt: '2026-11-05T23:59:59-05:00',
  endsLabel: '5 de noviembre',
  prices: {
    landing: 499,
    ecommerce: 1499,
    sistemas: 2099,
  },
};

export function isPromoActive(current: Promo | null, now: number = Date.now()): current is Promo {
  return Boolean(current) && now < new Date(current!.endsAt).getTime();
}
