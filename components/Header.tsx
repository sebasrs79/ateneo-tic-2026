'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, CalendarPlus, ExternalLink } from 'lucide-react';
import datos from '@/public/data/datos.json';
import { asset } from '@/lib/asset';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#alumnos', label: 'Alumnos 4.º Año' },
  { href: '#countdown', label: 'Cuenta Regresiva' },
  { href: '#cronograma', label: 'Cronograma' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#carrera', label: 'La Carrera' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-night/85 backdrop-blur-md border-b border-sky/20 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-night/40 backdrop-blur-sm border-b border-white/5 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand logos */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky rounded-lg p-1"
            aria-label="Ir al inicio - Ateneo TIC 2026"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 transition-transform group-hover:scale-105">
              <Image
                src={asset("/assets/logo-ies9.webp")}
                alt="Escudo Oficial IES N.º 9 Juana Azurduy"
                fill
                sizes="(max-width: 640px) 36px, 44px"
                className="object-contain drop-shadow"
                priority
              />
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="relative h-7 sm:h-8 w-24 sm:w-28 transition-transform group-hover:scale-105">
              <Image
                src={asset("/assets/logo-tic.webp")}
                alt="Logo Profesorado en TIC"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain drop-shadow"
                priority
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-xs xl:text-sm font-medium text-cream/80 hover:text-sky transition-colors rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="#countdown"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red/15 hover:bg-red/25 text-red border border-red/40 hover:border-red transition-all shadow-sm min-h-[44px]"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </a>
            <a
              href={datos.event.landingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky/15 hover:bg-sky/25 text-sky border border-sky/40 hover:border-sky transition-all shadow-sm min-h-[44px]"
            >
              <span>Carrera TIC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-cream hover:text-sky hover:bg-white/5 border border-white/10 min-w-[48px] min-h-[48px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-night/95 backdrop-blur-xl border-b border-sky/20 shadow-2xl p-5 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-cream hover:text-sky hover:bg-white/5 active:bg-sky/10 transition-colors min-h-[48px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="#countdown"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-red to-red/80 text-white shadow-neon-red min-h-[48px]"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Agendar en mi Calendario</span>
              </a>
              <a
                href={datos.event.landingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 text-sky border border-sky/30 min-h-[48px]"
              >
                <span>Conocé la carrera TIC ↗</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
