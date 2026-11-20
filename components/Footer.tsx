'use client';

import Image from 'next/image';
import { ExternalLink, Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import datos from '@/public/data/datos.json';
import { asset } from '@/lib/asset';

export default function Footer() {
  const { event } = datos;

  return (
    <footer className="relative border-t border-sky/20 bg-gradient-to-b from-deep/90 via-night to-night py-16 px-4 sm:px-6 lg:px-8 text-cream z-10">
      {/* Top ambient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand & Logos */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src={asset("/assets/logo-ies9.webp")}
                  alt="Escudo Oficial IES N.º 9 Juana Azurduy"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="relative h-8 w-28">
                <Image
                  src={asset("/assets/logo-tic.webp")}
                  alt="Logo Profesorado en TIC"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Ateneo TIC 2026
              </h3>
              <p className="text-xs text-sky font-semibold mt-0.5">
                Alumnos de 4.º Año · Profesorado de Educación Secundaria en TIC
              </p>
              <p className="text-xs text-muted mt-2 max-w-sm leading-relaxed">
                Muestra anual de innovación, robótica y desarrollo pedagógico del IES N.º 9 «Juana Azurduy», formando a los docentes que lideran la transformación digital en las aulas de Jujuy.
              </p>
            </div>
          </div>

          {/* Col 2: Institutional Links */}
          <div className="md:col-span-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky">
              ENLACES OFICIALES
            </span>
            <ul className="mt-3 space-y-2 text-xs text-cream/80">
              <li>
                <a
                  href={event.landingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Plataforma Carrera TIC</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
              <li>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Ubicación Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
              <li>
                <a href="#cronograma" className="hover:text-sky transition-colors">
                  Cronograma de Actividades
                </a>
              </li>
              <li>
                <a href="#alumnos-3d" className="hover:text-sky transition-colors">
                  Galería 3D de Estudiantes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Data Box */}
          <div className="md:col-span-4 p-5 rounded-2xl bg-night/80 border border-sky/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              DATOS CLAVE DEL ATENEO
            </span>
            <div className="mt-3 space-y-2 text-xs text-muted">
              <div className="flex items-center gap-2 text-cream">
                <Calendar className="w-4 h-4 text-sky" />
                <span>Viernes 4 de Diciembre de 2026</span>
              </div>
              <div className="flex items-center gap-2 text-cream">
                <MapPin className="w-4 h-4 text-red" />
                <span>San Pedro de Jujuy · Jujuy, Argentina</span>
              </div>
              <p className="text-[11px] text-muted pt-2 border-t border-white/10">
                Organizado colectivamente por la cohorte 2026 de 4.º año del Profesorado de Educación Secundaria en TIC.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-sky/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted text-center sm:text-left">
          <p>
            © 2026 Ateneo TIC · IES N.º 9 «Juana Azurduy». San Pedro de Jujuy.
          </p>
          <p className="font-mono text-[11px] text-sky/80 flex items-center gap-1">
            Diseñado con Next.js 14 · Three.js WebGL · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
