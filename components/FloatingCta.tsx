'use client';

import { useState, useEffect } from 'react';
import { MapPin, CalendarPlus, ChevronUp } from 'lucide-react';
import datos from '@/public/data/datos.json';

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down more than 450px
      setVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <a
        href="#ubicacion"
        className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-deep/90 hover:bg-deep text-sky border border-sky/40 hover:border-sky shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(54,217,255,0.3)] backdrop-blur-xl text-xs sm:text-sm font-bold transition-all min-h-[48px] active:scale-95"
        aria-label="Ir a la sección de ubicación y mapa"
      >
        <MapPin className="w-4 h-4 text-red animate-bounce" />
        <span>Cómo llegar</span>
      </a>

      <a
        href="#inicio"
        className="p-3 rounded-full bg-night/85 hover:bg-night text-cream/70 hover:text-sky border border-white/15 hover:border-sky/40 shadow-lg backdrop-blur-xl transition-all min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-90"
        aria-label="Volver arriba de la página"
      >
        <ChevronUp className="w-5 h-5" />
      </a>
    </div>
  );
}
