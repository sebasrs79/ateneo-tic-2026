'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  Navigation,
  Copy,
  Check,
  Compass,
} from 'lucide-react';
import datos from '@/public/data/datos.json';

export default function LocationSection() {
  const { event } = datos;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const text = `${event.institution}, ${event.locationCity} (Coordenadas: ${event.coordinates.lat}, ${event.coordinates.lng})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="ubicacion" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red/15 text-red border border-red/30 mb-3 shadow-neon-red">
          <MapPin className="w-3.5 h-3.5 text-red" />
          <span>SEDE CENTRAL DEL EVENTO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          ¿Cómo <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue">Llegar?</span>
        </h2>
        <p className="text-sm sm:text-base text-muted mt-2">
          {event.locationVenue} · San Pedro de Jujuy, Jujuy, Argentina
        </p>
      </div>

      {/* 3 Quick Information Glassmorphism Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-deep/90 to-night/95 border border-sky/25 shadow-glass-card backdrop-blur-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky/10 border border-sky/30 flex items-center justify-center text-sky shrink-0 shadow-sm">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">FECHA</span>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{event.dateDisplay}</div>
            <div className="text-xs text-sky font-mono">Día del evento</div>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-deep/90 to-night/95 border border-sky/25 shadow-glass-card backdrop-blur-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky/10 border border-sky/30 flex items-center justify-center text-sky shrink-0 shadow-sm">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">HORARIO</span>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{event.timeDisplay}</div>
            <div className="text-xs text-red font-mono">Puntualidad solicitada</div>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-deep/90 to-night/95 border border-sky/25 shadow-glass-card backdrop-blur-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0 shadow-sm">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">CIUDAD</span>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{event.locationCity}</div>
            <div className="text-xs text-muted font-mono">Coordenadas GPS</div>
          </div>
        </div>
      </div>

      {/* Main Map Viewer with Strict Rule: Solid #000000 pure black container + Neon Sky Glow */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-sky bg-[#000000] p-3 sm:p-6 shadow-[0_0_50px_rgba(54,217,255,0.35),0_20px_50px_rgba(0,0,0,0.9)]">
        {/* Top Cyber HUD Bar */}
        <div className="flex items-center justify-between px-3 py-2 mb-3 bg-[#000000] border-b border-sky/30 rounded-xl text-[11px] font-mono">
          <div className="flex items-center gap-2 text-sky">
            <Compass className="w-3.5 h-3.5 text-sky animate-spin" style={{ animationDuration: '10s' }} />
            <span className="font-bold tracking-wider">MAPA VECTORIAL INSTITUCIONAL</span>
          </div>
          <div className="text-muted text-[10px] hidden sm:block">
            GPS: {event.coordinates.lat}, {event.coordinates.lng}
          </div>
        </div>

        {/* mapa-escuela.jpg container */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-2xl overflow-hidden bg-[#000000] border border-sky/20">
          <Image
            src="/assets/mapa-escuela.jpg"
            alt="Plano Ilustrado Oficial de la Escuela e IES N.º 9 Juana Azurduy"
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-contain bg-[#000000]"
            priority
          />

          {/* Interactive Pulsing Radar Pin over School Center */}
          <div className="absolute top-[48%] left-[51%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto group cursor-pointer">
            <span className="absolute w-12 h-12 rounded-full bg-sky/30 animate-ping" />
            <span className="absolute w-7 h-7 rounded-full bg-red/40 animate-pulse" />
            <div className="relative z-10 p-2 rounded-full bg-red text-white shadow-neon-red group-hover:scale-125 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>

            {/* Radar Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-xl bg-night/95 border border-sky/50 text-[10px] font-mono text-sky whitespace-nowrap shadow-neon-sky opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Sede IES N.º 9 «Juana Azurduy»
            </div>
          </div>
        </div>

        {/* Action Controls underneath Map */}
        <div className="p-4 bg-[#000000] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sky/20 mt-3 text-xs">
          <div className="text-center sm:text-left">
            <span className="text-white font-bold block">{event.institution}</span>
            <span className="text-muted">{event.locationCity}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-deep hover:bg-[#0c2448] text-cream border border-white/20 hover:border-sky/50 font-semibold transition min-h-[44px] active:scale-95"
              aria-label="Copiar dirección y coordenadas del IES N.º 9"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-sky" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Ubicación'}</span>
            </button>

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky to-blue text-night font-bold shadow-neon-sky hover:opacity-95 transition min-h-[44px] active:scale-95"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
