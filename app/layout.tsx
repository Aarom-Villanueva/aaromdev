import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
