'use client';

import Image from 'next/image';
import { Calendar, Clock, MapPin, Sparkles, CalendarPlus, Map, ArrowDown } from 'lucide-react';
import datos from '@/public/data/datos.json';
import VisorAlumnos3D from './VisorAlumnos3D';

export default function HeroSection() {
  const { event } = datos;

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center items-center">
        {/* Top Cohort & Event Badge */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-red/15 border border-red/40 text-red mb-3 sm:mb-4 shadow-neon-red backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-red animate-spin" style={{ animationDuration: '6s' }} />
            <span>ORGANIZAN E INVITAN LOS ALUMNOS DE 4.º AÑO TIC</span>
          </div>

          {/* Main Title with clamp fluid typography */}
          <h1 className="text-[clamp(2.2rem,7vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white mb-3">
            Ateneo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky via-blue to-red">
              TIC 2026
            </span>
          </h1>

          {/* Subtitle & Institution */}
          <p className="text-sm sm:text-lg md:text-xl text-cream/90 font-normal max-w-2xl mx-auto leading-relaxed mb-4">
            Profesorado de Educación Secundaria en TIC
            <br />
            <span className="text-muted text-xs sm:text-sm font-light">
              {event.institution} · {event.locationCity}
            </span>
          </p>

          {/* Key Event Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-deep/90 border border-sky/30 text-sky shadow-sm">
              <Calendar className="w-4 h-4 text-sky" />
              <span className="font-medium">{event.dateDisplay}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-deep/90 border border-sky/30 text-sky shadow-sm">
              <Clock className="w-4 h-4 text-sky" />
              <span className="font-medium">{event.timeDisplay}</span>
            </div>
            <a
              href="#ubicacion"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-deep/90 border border-red/30 text-cream hover:text-red hover:border-red transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4 text-red" />
              <span className="font-medium">San Pedro de Jujuy</span>
            </a>
          </div>
        </div>

        {/* Visual Protagonist: Holographic 3D Visor with Student Group Photo + Robot Mascot */}
        <div id="alumnos" className="w-full max-w-4xl mx-auto my-2 sm:my-4 scroll-mt-24">
          <VisorAlumnos3D />
        </div>

        {/* Hero Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full max-w-md mx-auto">
          <a
            href="#countdown"
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red to-red/90 hover:from-red/90 hover:to-red text-white shadow-neon-red transition-all min-h-[48px] active:scale-95"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Agendar Evento</span>
          </a>
          <a
            href="#ubicacion"
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-deep/80 hover:bg-deep text-sky border border-sky/40 hover:border-sky shadow-neon-sky transition-all min-h-[48px] active:scale-95"
          >
            <Map className="w-4 h-4 text-sky" />
            <span>Cómo Llegar</span>
          </a>
        </div>
      </div>

      {/* Down indicator */}
      <div className="text-center pt-6">
        <a
          href="#countdown"
          className="inline-flex flex-col items-center text-muted hover:text-sky transition-colors text-xs font-mono"
          aria-label="Desplazarse a la cuenta regresiva"
        >
          <span className="mb-1">DESLIZÁ PARA EXPLORAR</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-sky" />
        </a>
      </div>
    </section>
  );
}
