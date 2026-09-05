'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 60;
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, index) => `/hero-frames/frame-${String(index + 1).padStart(4, '0')}.webp`);
const HERO_SEQUENCE_END = 0.72;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const frameCacheRef = useRef<(HTMLImageElement | null)[]>(Array.from({ length: TOTAL_FRAMES }, () => null));
  const frameLoadedRef = useRef<boolean[]>(Array.from({ length: TOTAL_FRAMES }, () => false));
  const framePromisesRef = useRef<(Promise<HTMLImageElement> | null)[]>(Array.from({ length: TOTAL_FRAMES }, () => null));
  const latestProgressRef = useRef(0);
  const desiredFrameRef = useRef(0);
  const visibleFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [framesReady, setFramesReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });

  const commitFrame = (index: number) => {
    const image = imageRef.current;
    if (!image || visibleFrameRef.current === index) return;

    image.src = FRAME_PATHS[index];
    visibleFrameRef.current = index;
  };

  const findNearestLoadedFrame = (index: number) => {
    if (frameLoadedRef.current[index]) return index;

    for (let distance = 1; distance < TOTAL_FRAMES; distance += 1) {
      const lower = index - distance;
      if (lower >= 0 && frameLoadedRef.current[lower]) return lower;

      const higher = index + distance;
      if (higher < TOTAL_FRAMES && frameLoadedRef.current[higher]) return higher;
    }

    return visibleFrameRef.current;
  };

  const syncFrameToScroll = () => {
    const clampedProgress = Math.min(Math.max(latestProgressRef.current, 0), 1);
    const sequenceProgress = Math.min(clampedProgress / HERO_SEQUENCE_END, 1);
    const requestedIndex = Math.max(0, Math.min(Math.round(sequenceProgress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1));
    desiredFrameRef.current = requestedIndex;

    if (!framesReady && !reduceMotion) return;

    const resolvedIndex = frameLoadedRef.current[requestedIndex] ? requestedIndex : findNearestLoadedFrame(requestedIndex);
    commitFrame(resolvedIndex);
  };

  const scheduleSyncFrame = () => {
    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      syncFrameToScroll();
    });
  };

  const preloadFrame = (index: number) => {
    const cached = frameCacheRef.current[index];
    if (cached) return Promise.resolve(cached);

    const existing = framePromisesRef.current[index];
    if (existing) return existing;

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = async () => {
        frameCacheRef.current[index] = image;
        frameLoadedRef.current[index] = true;

        try {
          if ('decode' in image) {
            await image.decode();
          }
        } catch {
          // Ignore decode hiccups; onload already confirmed the asset.
        }

        resolve(image);
      };
      image.onerror = () => {
        framePromisesRef.current[index] = null;
        reject(new Error(`Failed to load frame ${index + 1}`));
      };
      image.src = FRAME_PATHS[index];
    });

    framePromisesRef.current[index] = promise;
    return promise;
  };

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      await Promise.allSettled(FRAME_PATHS.map((_, index) => preloadFrame(index)));
      if (cancelled) return;

      setFramesReady(true);
    };

    start();

    return () => {
      cancelled = true;
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      visibleFrameRef.current = TOTAL_FRAMES - 1;
      commitFrame(TOTAL_FRAMES - 1);
      return;
    }

    if (framesReady) {
      latestProgressRef.current = scrollYProgress.get();
      scheduleSyncFrame();
    }
  }, [framesReady, reduceMotion, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    latestProgressRef.current = latest;

    if (!reduceMotion && framesReady) {
      scheduleSyncFrame();
    }
  });

  const editorialFade = useTransform(scrollYProgress, [0.62, 0.72], [0, 1], { clamp: true });

  const titleOneOpacity = useTransform(scrollYProgress, [0.66, 0.72], [0, 1], { clamp: true });
  const titleOneY = useTransform(scrollYProgress, [0.66, 0.72], [18, 0], { clamp: true });
  const titleOneBlur = useTransform(scrollYProgress, [0.66, 0.72], ['blur(6px)', 'blur(0px)'], { clamp: true });

  const titleTwoOpacity = useTransform(scrollYProgress, [0.71, 0.77], [0, 1], { clamp: true });
  const titleTwoY = useTransform(scrollYProgress, [0.71, 0.77], [18, 0], { clamp: true });
  const titleTwoBlur = useTransform(scrollYProgress, [0.71, 0.77], ['blur(6px)', 'blur(0px)'], { clamp: true });

  const bodyOpacity = useTransform(scrollYProgress, [0.76, 0.82], [0, 1], { clamp: true });
  const bodyY = useTransform(scrollYProgress, [0.76, 0.82], [16, 0], { clamp: true });
  const bodyBlur = useTransform(scrollYProgress, [0.76, 0.82], ['blur(4px)', 'blur(0px)'], { clamp: true });

  const portraitScale = useTransform(scrollYProgress, [0.62, 0.82], [1, 1.01]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0], { clamp: true });
  const indicatorY = useTransform(scrollYProgress, [0, 0.18], [0, 10], { clamp: true });

  const showPreparing = !reduceMotion && !framesReady;
  const titleStyle = { opacity: reduceMotion ? 1 : titleOneOpacity, y: reduceMotion ? 0 : titleOneY, filter: reduceMotion ? 'blur(0px)' : titleOneBlur };
  const titleTwoStyle = { opacity: reduceMotion ? 1 : titleTwoOpacity, y: reduceMotion ? 0 : titleTwoY, filter: reduceMotion ? 'blur(0px)' : titleTwoBlur };
  const bodyStyle = { opacity: reduceMotion ? 1 : bodyOpacity, y: reduceMotion ? 0 : bodyY, filter: reduceMotion ? 'blur(0px)' : bodyBlur };

  return (
    <section
      ref={heroRef}
      id="inicio"
      className={reduceMotion ? 'relative min-h-[100dvh] bg-[#030303]' : 'relative h-[250vh] bg-[#030303] lg:h-[270vh]'}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,3,3,0.02)_0%,rgba(3,3,3,0.1)_40%,rgba(3,3,3,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(3,3,3,0.26),transparent)]" />

        <motion.div
          aria-hidden="true"
          style={{ scale: reduceMotion ? 1 : portraitScale }}
          className="absolute inset-0 z-[2] flex items-center justify-center"
        >
          <img
            ref={imageRef}
            src={reduceMotion ? FRAME_PATHS[TOTAL_FRAMES - 1] : FRAME_PATHS[0]}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full select-none object-cover object-center"
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: reduceMotion ? 0 : editorialFade }}
          className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,rgba(3,3,3,0.08)_0%,rgba(3,3,3,0.28)_52%,rgba(3,3,3,0.68)_100%)]"
        />

        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pt-16">
          <div className="w-full max-w-4xl text-center">
              <motion.p initial={false} style={titleStyle} className="text-label mb-6 text-white/65">
                Aarom Villanueva <span className="mx-2 text-white/30">·</span> Software Developer <span className="mx-2 text-white/30">·</span> Lima, Perú
              </motion.p>
              <motion.h1 initial={false} className="text-display max-w-[12ch] text-white">
                <motion.span initial={false} style={titleStyle} className="block">
                  Construyo productos.
                </motion.span>
                <motion.span initial={false} style={titleTwoStyle} className="block text-white/55">
                  No solo proyectos.
                </motion.span>
              </motion.h1>

              <motion.p
                initial={false}
                style={bodyStyle}
                className="mx-auto mt-8 max-w-2xl text-body-large text-white/55"
              >
                Pienso en producto, experiencia y estructura para convertir problemas reales en software funcional.
              </motion.p>

              <motion.div
                initial={false}
                style={bodyStyle}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <a href="#proyectos" className="btn-primary">
                  Explorar productos <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#contacto" className="btn-secondary">
                  Contactarme
                </a>
              </motion.div>
          </div>
        </div>

        {showPreparing ? (
          <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] text-white/30">
            Preparando experiencia
          </div>
        ) : null}

        <motion.div
          initial={false}
          style={{ opacity: reduceMotion ? 0 : indicatorOpacity, y: reduceMotion ? 0 : indicatorY }}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Desliza para descubrir</span>
          <ArrowDown className="scroll-indicator h-4 w-4 text-white/30" />
        </motion.div>
      </div>
    </section>
  );
}
