const CLOUDINARY_HOST = 'https://res.cloudinary.com';

type CloudinaryParts = {
  cloud: string;
  /** Everything after the transformations: `v123/carpeta/archivo` (sin extensión). */
  asset: string;
};

/** Accepts any Cloudinary video URL (with or without transformations, any extension)
 * and returns the cloud name plus the versioned public id, so every video on the site
 * gets the same optimized delivery no matter how the link was copied. */
function parseCloudinaryVideoUrl(url: string): CloudinaryParts {
  const match = url.match(/res\.cloudinary\.com\/([^/]+)\/video\/upload\/(.+)$/);
  if (!match) {
    throw new Error(`[cloudinary] URL de video no válida: ${url}`);
  }

  const [, cloud, rest] = match;
  const segments = rest.split('/');
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  // Without a version segment, drop leading transformation segments (they contain commas
  // or an underscore-prefixed key like `q_auto`).
  const assetSegments =
    versionIndex >= 0
      ? segments.slice(versionIndex)
      : segments.filter((segment, index) => index === segments.length - 1 || !/^[a-z]{1,3}_/.test(segment));

  const asset = assetSegments.join('/').replace(/\.[a-z0-9]+$/i, '');
  return { cloud, asset };
}

export type CloudinaryVideo = { src: string; poster: string };

type VideoOptions = {
  /** Max delivered width; never upscales. */
  width?: number;
  /** Second used for the poster. Use it when the video opens on a fade from black. */
  posterAt?: number;
};

/** Optimized MP4 (f_auto picks AV1/VP9/H.265/H.264 per browser) plus a poster taken
 * from the first frame. `width` caps the delivered size without ever upscaling. */
export function cloudinaryVideo(url: string, { width = 1280, posterAt = 0 }: VideoOptions = {}): CloudinaryVideo {
  const { cloud, asset } = parseCloudinaryVideoUrl(url);
  const base = `${CLOUDINARY_HOST}/${cloud}/video/upload`;

  return {
    src: `${base}/f_auto,q_auto,w_${width},c_limit/${asset}.mp4`,
    poster: `${base}/so_${posterAt},f_auto,q_auto,w_${Math.min(width, 960)},c_limit/${asset}.jpg`,
  };
}

/** Optimized still image (format and quality chosen per browser), capped at `width`. */
export function cloudinaryImage(url: string, { width = 1200 }: { width?: number } = {}): string {
  const match = url.match(/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(?:.*?\/)?(v\d+\/.+)$/);
  if (!match) {
    throw new Error(`[cloudinary] URL de imagen no válida: ${url}`);
  }
  const [, cloud, asset] = match;
  return `${CLOUDINARY_HOST}/${cloud}/image/upload/f_auto,q_auto,w_${width},c_limit/${asset}`;
}
