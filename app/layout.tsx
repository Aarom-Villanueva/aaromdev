import type { Metadata } from 'next';
import { Inter, Antonio, Space_Grotesk } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import { HeroReadyProvider } from '@/components/HeroReadyProvider';
import Preloader from '@/components/Preloader';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://aaromvillanueva.dev'),
  title: 'Aarom Villanueva — Software Developer',
  description: 'Portfolio de Aarom Villanueva, desarrollador de software especializado en backend, cloud y full stack. Lima, Perú.',
  keywords: ['software developer', 'backend', 'cloud', 'full stack', 'Lima', 'Peru', 'Java', 'Spring Boot', 'Next.js'],
  authors: [{ name: 'Aarom Villanueva' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Aarom Villanueva — Software Developer',
    description: 'Construyo productos. No solo proyectos.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${antonio.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <MotionConfig reducedMotion="user">
          <HeroReadyProvider>
            <Preloader />
            {children}
          </HeroReadyProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
