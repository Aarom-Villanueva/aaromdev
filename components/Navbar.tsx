'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { useHeroReady } from '@/components/HeroReadyProvider';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Capacidades', href: '#capacidades' },
  { label: 'Perfil', href: '#perfil' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { brandOwner } = useHeroReady();
  const brandHiddenForPreloader = brandOwner === 'preloader';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/5 bg-black/60 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center px-6 lg:px-10">
          <div className="relative flex w-full items-center">
            <a
              href="#hero"
              id="navbar-brand-target"
              aria-label="Aarom Villanueva — Inicio"
              aria-hidden={brandHiddenForPreloader || undefined}
              tabIndex={brandHiddenForPreloader ? -1 : undefined}
              // Kept in the layout (never display:none) so the Preloader can measure its
              // real DOMRect as the floating logo's travel target. Only becomes visible
              // once brandOwner flips to "navbar" in the same render the floating copy
              // stops rendering — see HeroReadyProvider/Preloader.
              style={brandHiddenForPreloader ? { visibility: 'hidden', opacity: 0, pointerEvents: 'none' } : undefined}
              className="text-white/70 transition-colors hover:text-white"
            >
              <Wordmark className="h-4 w-auto text-current sm:h-5" />
            </a>
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-[13px] font-medium text-white/55 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <a href="#contacto" className="hidden sm:inline-flex btn-primary !py-2 !px-5 !text-[13px]">
                Hablemos
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/80 transition-colors hover:bg-white/5"
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#030303] lg:hidden"
          >
            <div className="flex h-16 items-center justify-end px-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-white/5"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.div
              className="flex flex-col px-6 pt-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="py-5 text-3xl font-semibold text-white/85 border-b border-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="btn-primary mt-10 w-fit"
              >
                Hablemos
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
