'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import AutoScrollImage from '@/components/sections/AutoScrollImage';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { ProjectMedia as ProjectMediaData } from '@/data/projects';

export function ShowcaseVideo({
  src,
  poster,
  alt,
  shouldPlay,
  fit,
}: {
  src: string;
  poster: string;
  alt: string;
  shouldPlay: boolean;
  fit: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldPlay || failed) {
      video.pause();
      return;
    }

    let cancelled = false;
    // Safari iOS only honours autoplay when these are set on the element itself.
    video.muted = true;
    video.playsInline = true;

    video
      .play()
      .then(() => {
        if (!cancelled) setNeedsManualPlay(false);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const domError = error as DOMException;
        console.warn(`[ProjectMedia] autoplay rechazado (${domError?.name}): ${domError?.message}`, { src });
        setNeedsManualPlay(true);
      });

    return () => {
      cancelled = true;
    };
  }, [shouldPlay, failed, src]);

  const handleManualPlay = () => {
    videoRef.current
      ?.play()
      .then(() => setNeedsManualPlay(false))
      .catch((error: unknown) => {
        const domError = error as DOMException;
        console.warn(`[ProjectMedia] reproducción manual rechazada (${domError?.name}): ${domError?.message}`, { src });
      });
  };

  if (failed) {
    return <img src={poster} alt={alt} className={`h-full w-full ${fit}`} />;
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="auto"
        loop
        muted
        playsInline
        aria-label={alt}
        onError={() => {
          console.warn('[ProjectMedia] error al cargar el video', { src, code: videoRef.current?.error?.code });
          setFailed(true);
        }}
        className={`h-full w-full ${fit}`}
      />
      {needsManualPlay ? (
        <button
          type="button"
          onClick={handleManualPlay}
          aria-label={`Reproducir video — ${alt}`}
          className="absolute inset-0 z-[2] flex items-center justify-center bg-black/30 transition-colors duration-200 hover:bg-black/40"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
            <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      ) : null}
    </div>
  );
}

/** One component for every project visual: a looping video (mounted only once the card
 * gets close to the viewport, poster until then) or a long capture that scrolls itself. */
export default function ProjectMedia({
  media,
  alt,
  fade = true,
}: {
  media: ProjectMediaData;
  alt: string;
  /** Bottom gradient that blends the media into the card. */
  fade?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Mount early (before the card is fully visible) so fast scrolling never shows an
  // empty frame; play only while a meaningful part of the card is on screen.
  const { ref: nearRef, isInView: isNear } = useIsInViewport<HTMLDivElement>({ once: true, margin: '400px 0px' });
  const { ref: visibleRef, isInView: isVisible } = useIsInViewport<HTMLDivElement>({ amount: 0.25 });
  const fit = 'object-cover object-top';

  return (
    <div ref={nearRef} className="relative h-full w-full">
      <div ref={visibleRef} className="relative h-full w-full overflow-hidden bg-[#0D0F13]">
        {media.type === 'video' ? (
          isNear ? (
            <ShowcaseVideo
              src={media.src}
              poster={media.poster}
              alt={alt}
              shouldPlay={isVisible && !prefersReducedMotion}
              fit={fit}
            />
          ) : (
            <img src={media.poster} alt={alt} loading="lazy" className={`h-full w-full ${fit}`} />
          )
        ) : (
          <AutoScrollImage src={media.src} alt={alt} width={media.width} height={media.height} />
        )}
        {fade ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0F13] to-transparent" />
        ) : null}
      </div>
    </div>
  );
}
