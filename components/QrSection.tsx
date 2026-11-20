'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Share2, ExternalLink, Copy, Check, QrCode, Sparkles } from 'lucide-react';
import datos from '@/public/data/datos.json';
import { getWhatsAppShareUrl } from '@/lib/calendar';

export default function QrSection() {
  const { event } = datos;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(event.landingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="carrera" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24">
      <div className="relative rounded-3xl p-6 sm:p-12 bg-gradient-to-br from-deep via-night to-deep border-2 border-sky/35 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(54,217,255,0.2)] text-center backdrop-blur-2xl">
        {/* Glow ambient background circles */}
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-sky/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-red/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky/15 text-sky border border-sky/30 mb-4">
          <QrCode className="w-3.5 h-3.5 text-sky" />
          <span>CANAL DIGITAL OFICIAL</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Conocé la Carrera de <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue">Profesorado en TIC</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-2 max-w-lg mx-auto leading-relaxed">
          Escaneá el código QR interactivo con la cámara de tu smartphone para acceder al plan de estudios, perfil del egresado y contenidos del IES N.º 9.
        </p>

        {/* QR Card with Laser Scanning Line Effect */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto my-8 bg-white p-4 sm:p-5 rounded-3xl shadow-[0_0_40px_rgba(54,217,255,0.4)] border-4 border-sky/40 overflow-hidden group">
          {/* QR Image */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/qr-landing.png"
              alt="Código QR Oficial de la Carrera TIC — IES N.º 9 Juana Azurduy"
              fill
              sizes="(max-width: 640px) 208px, 256px"
              className="object-contain"
              priority
            />
          </div>

          {/* Animated Cyan Laser Scanner Line (Does not obstruct camera read) */}
          <div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#36d9ff] to-transparent shadow-[0_0_12px_#36d9ff] pointer-events-none animate-laser-scan opacity-80"
            aria-hidden="true"
          />

          {/* HUD Corner Tech Markers */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-night pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-night pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-night pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-night pointer-events-none" />
        </div>

        {/* Direct URL Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-night/80 border border-sky/30 text-xs font-mono text-sky/90 mb-8 max-w-full truncate shadow-sm">
          <span className="truncate">{event.landingUrl}</span>
        </div>

        {/* Action Buttons: Mandatory exact text "Ver la carrera TIC ↗" + WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          {/* Button 1: Mandatory Exact Text */}
          <a
            href={event.landingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky via-blue to-sky hover:opacity-90 text-night font-bold text-sm shadow-neon-sky transition-all min-h-[48px] active:scale-95"
          >
            <span>Ver la carrera TIC ↗</span>
          </a>

          {/* Button 2: WhatsApp Share */}
          <a
            href={getWhatsAppShareUrl(event.whatsappShareMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] font-semibold text-sm transition-all min-h-[48px] active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir por WhatsApp</span>
          </a>

          {/* Button 3: Copy Link with Toast */}
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-cream/90 border border-white/15 text-xs font-mono font-medium transition min-h-[48px] active:scale-95"
            aria-label="Copiar link oficial de la carrera al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-bold">¡Enlace copiado con éxito!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-sky" />
                <span>Copiar Enlace Web</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
