import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CountdownSection from '@/components/CountdownSection';
import ScrollProgress from '@/components/ScrollProgress';
import SmoothScroll from '@/components/SmoothScroll';
import MarqueeBanner from '@/components/MarqueeBanner';
import PillarsSection from '@/components/PillarsSection';
import TimelineSection from '@/components/TimelineSection';
import Carousel3D from '@/components/Carousel3D';
import LocationSection from '@/components/LocationSection';
import QrSection from '@/components/QrSection';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';

// Dynamic import for WebGL Three.js background (client-only)
const SceneBackground = dynamic(() => import('@/components/SceneBackground'), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 pointer-events-none -z-20 bg-night"
      aria-hidden="true"
    />
  ),
});

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <SceneBackground />
      <Header />

      <main className="relative z-10 selection:bg-sky selection:text-night overflow-x-clip min-h-screen">
        {/* 1. Hero 3D con Foto Grupal de Alumnos Protagonista + Mascota Robot */}
        <HeroSection />

        {/* 2. Marquee Cinético Inclinado de Alto Impacto */}
        <MarqueeBanner />

        {/* 3. Reloj Holográfico Countdown en Vivo + Acciones (.ics / Google / WhatsApp) */}
        <CountdownSection />

        {/* 4. ¿Qué es el Ateneo? + Tarjetas 3D Tilt con Specular Glare + Stats */}
        <PillarsSection />

        {/* 5. Carrusel Cilíndrico 3D Inmersivo de Estudiantes de 4.º Año */}
        <div id="alumnos-3d">
          <Carousel3D />
        </div>

        {/* 6. Cronograma Interactivo Luminoso (con ID #cronograma separado) */}
        <TimelineSection />

        {/* 7. Ubicación con mapa-escuela.jpg en contenedor negro #000000 y radar neón */}
        <LocationSection />

        {/* 8. Módulo QR Láser con botón 'Ver la carrera TIC ↗' + Compartir WhatsApp */}
        <QrSection />

        {/* 9. Footer Institucional IES N.º 9 y Carrera TIC */}
        <Footer />

        {/* 10. Botón Flotante 'Cómo Llegar' con Área Segura */}
        <FloatingCta />
      </main>
    </SmoothScroll>
  );
}
