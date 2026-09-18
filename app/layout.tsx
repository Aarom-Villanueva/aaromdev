import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
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
    <html lang="es" className={`dark ${inter.variable}`}>
      <body className="antialiased">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
