import type { Metadata, Viewport } from 'next';
import { asset } from '@/lib/asset';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#071325',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sebasrs79.github.io/ateneo-tic-2026'),
  title: 'Ateneo TIC 2026 · Te invitan los alumnos de 4.º año — IES N.º 9 Juana Azurduy',
  description:
    'Viernes 4 de diciembre de 2026 desde las 13:15 hs en San Pedro de Jujuy. Proyectos en vivo, tecnología, educación y muestra de la carrera TIC.',
  applicationName: 'Ateneo TIC 2026',
  authors: [{ name: 'Alumnos de 4.º año del Profesorado en TIC · IES N.º 9 Juana Azurduy' }],
  generator: 'Next.js',
  keywords: [
    'Ateneo TIC 2026',
    'IES 9 Juana Azurduy',
    'Profesorado en TIC',
    'San Pedro de Jujuy',
    'Tecnología Educativa',
    'Robótica',
    'Software Libre',
    'Jujuy Educación',
  ],
  icons: {
    icon: asset('/assets/iconotic.png'),
    shortcut: asset('/assets/iconotic.png'),
    apple: asset('/assets/iconotic.png'),
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://sebasrs79.github.io/ateneo-tic-2026',
    siteName: 'Ateneo TIC 2026 · IES N.º 9 Juana Azurduy',
    title: 'Ateneo TIC 2026 · Te invitan los alumnos de 4.º año — IES N.º 9 Juana Azurduy',
    description:
      'Viernes 4 de diciembre de 2026 desde las 13:15 hs en San Pedro de Jujuy. Proyectos en vivo, tecnología, educación y muestra de la carrera TIC.',
    images: [
      {
        url: '/assets/iconotic.png',
        width: 512,
        height: 512,
        alt: 'Logo Oficial Ateneo TIC 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ateneo TIC 2026 · Te invitan los alumnos de 4.º año — IES N.º 9 Juana Azurduy',
    description:
      'Viernes 4 de diciembre de 2026 desde las 13:15 hs en San Pedro de Jujuy. Proyectos en vivo, tecnología, educación y muestra de la carrera TIC.',
    images: ['/assets/iconotic.png'],
  },
  manifest: asset('/manifest.json'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="bg-night text-cream antialiased selection:bg-sky selection:text-night min-h-screen min-h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
