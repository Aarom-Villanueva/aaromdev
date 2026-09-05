'use client';

import { Reveal, StaggerReveal, fadeUp } from '@/components/motion/Reveal';
import FeaturedProduct from '@/components/products/FeaturedProduct';
import ProductCard from '@/components/products/ProductCard';
import { featuredProduct, secondaryProducts } from '@/data/products';
import { motion } from 'framer-motion';

export default function ProductsSection() {
  return (
    <>
      <FeaturedProduct product={featuredProduct} />
      <section className="relative bg-[#08090B] py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <span className="section-label">Más productos</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mb-6 max-w-3xl text-white">
              Productos con espacio para <span className="text-white/50">crecer y contar su propia historia.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-large mb-14 max-w-2xl text-white/45">
              KAWSAY, NARA y VANTA-01 quedan estructurados para incorporar su problema, propuesta, evidencia visual y case study cuando esa información esté lista.
            </p>
          </Reveal>
          <StaggerReveal>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {secondaryProducts.map((product, index) => (
                <motion.div key={product.slug} variants={fadeUp}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
