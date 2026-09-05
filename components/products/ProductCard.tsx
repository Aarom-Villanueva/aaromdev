import type { Product } from '@/data/products';

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#08090B] p-7 transition-colors duration-300 hover:bg-[#111318] lg:p-9">
      <div className="mb-16 flex aspect-[16/9] items-end rounded-xl border border-white/[0.06] bg-[linear-gradient(135deg,rgba(120,157,255,0.12),rgba(17,19,24,0.25)_45%,rgba(3,3,3,0.8))] p-4">
        <span className="font-mono text-[11px] tracking-[0.16em] text-white/35">PRODUCTO / {String(index + 2).padStart(2, '0')}</span>
      </div>
      <p className="text-label mb-4 text-[#789DFF]/75">En preparación</p>
      <h3 className="mb-4 text-2xl font-semibold text-white/90">{product.name}</h3>
      <p className="max-w-md text-sm leading-relaxed text-white/45">{product.summary}</p>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">Case study próximamente</p>
    </article>
  );
}
