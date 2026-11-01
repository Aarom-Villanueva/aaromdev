import type { Metadata } from 'next';
import { Inter, Antonio, Space_Grotesk } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import { HeroReadyProvider } from '@/components/HeroReadyProvider';
import Preloader from '@/components/Preloader';
import PromoBar from '@/components/PromoBar';
import { CONTACT_EMAIL, INSTAGRAM_URL, WHATSAPP_DISPLAY } from '@/data/contact';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

// Display face for the Hero's right-hand phrase only.
const antonio = Antonio({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-antonio',
});

// Editorial face for the Hero's left-hand identity block only.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const SITE_URL = 'https://aaromvillanueva.dev';
const SITE_TITLE = 'Aarom Villanueva — Desarrollador web y de software';
const SITE_DESCRIPTION =
  'Páginas web, catálogos, tiendas online y sistemas a medida para negocios. Desarrollador de software en Lima, Perú.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ['desarrollador web', 'páginas web', 'tienda online', 'catálogo web', 'sistemas a medida', 'software developer', 'Lima', 'Perú', 'Next.js', 'Spring Boot'],
  authors: [{ name: 'Aarom Villanueva' }],
  alternates: { canonical: '/' },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: 'Construyo productos. No solo proyectos. Páginas web, tiendas online y sistemas para tu negocio.',
    url: SITE_URL,
    siteName: 'Aarom Villanueva',
    locale: 'es_PE',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aarom Villanueva — Construyo productos. No solo proyectos.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

/** Structured data so search engines understand who this is and what is offered. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Aarom Villanueva',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: WHATSAPP_DISPLAY.replace(/\s/g, ''),
  areaServed: 'PE',
  address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
  sameAs: [INSTAGRAM_URL],
  founder: { '@type': 'Person', name: 'Aarom Villanueva', jobTitle: 'Desarrollador de software' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${antonio.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionConfig reducedMotion="user">
          <HeroReadyProvider>
            <Preloader />
            <PromoBar />
            {children}
          </HeroReadyProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
