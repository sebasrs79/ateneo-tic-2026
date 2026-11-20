'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { CalendarCheck2, Download, Share2, Sparkles, ExternalLink } from 'lucide-react';
import datos from '@/public/data/datos.json';
import { downloadIcsFile, getGoogleCalendarUrl, getWhatsAppShareUrl } from '@/lib/calendar';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function CountdownSection() {
  const targetDateIso = datos.event.dateIso; // 2026-12-04T13:15:00-03:00

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  }, [targetDateIso]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#36d9ff', '#f83550', '#147cf5', '#ffffff'],
    });
  };

  const handleDownloadIcs = () => {
    triggerCelebration();
    downloadIcsFile(datos.event);
  };

  const handleGoogleCalendar = () => {
    triggerCelebration();
    window.open(getGoogleCalendarUrl(datos.event), '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppShare = () => {
    triggerCelebration();
    window.open(getWhatsAppShareUrl(datos.event.whatsappShareMessage), '_blank', 'noopener,noreferrer');
  };

  const timeUnits = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-deep/95 via-night/95 to-deep/90 border border-sky/30 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(54,217,255,0.15)] backdrop-blur-2xl">
        {/* Glow ambient background accents */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-red/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky/15 text-sky border border-sky/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky animate-spin" style={{ animationDuration: '4s' }} />
            <span>RELOJ HOLOGRÁFICO EN VIVO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Cuenta Regresiva al <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue">Ateneo</span>
          </h2>
          <p className="text-sm sm:text-base text-muted mt-2">
            Viernes 4 de Diciembre de 2026 · Desde las 13:15 hs · San Pedro de Jujuy
          </p>
        </div>

        {/* Countdown Flip Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto mb-10 sm:mb-12">
          {timeUnits.map((unit, idx) => (
            <div
              key={unit.label}
              className="relative group p-4 sm:p-6 rounded-2xl bg-[#071325]/90 border border-sky/25 hover:border-sky/60 shadow-lg text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(54,217,255,0.3)] hover:-translate-y-1"
            >
              {/* Corner tech indicators */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-sky/50" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-sky/50" />

              {/* Number display */}
              <div className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cream to-sky/90 drop-shadow-[0_0_15px_rgba(54,217,255,0.4)]">
                {mounted ? String(unit.value).padStart(2, '0') : '--'}
              </div>

              {/* Label */}
              <div className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-muted group-hover:text-sky mt-2 sm:mt-3 transition-colors">
                {unit.label}
              </div>

              {/* Seconds active pulse indicator */}
              {idx === 3 && mounted && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red animate-ping" />
                  <span className="text-[9px] font-mono text-red font-semibold">TICK</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons: iCal, Google Calendar, WhatsApp Share */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          <button
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red to-red/90 hover:from-red/95 hover:to-red text-white shadow-neon-red transition-all min-h-[48px] active:scale-95"
            aria-label="Descargar archivo iCalendar .ics para Outlook o Apple Calendar"
          >
            <Download className="w-4 h-4" />
            <span>Descargar .ics (Outlook / Apple)</span>
          </button>

          <button
            onClick={handleGoogleCalendar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-deep hover:bg-[#0e274e] text-sky border border-sky/40 hover:border-sky shadow-neon-sky transition-all min-h-[48px] active:scale-95"
            aria-label="Agregar evento a Google Calendar en nueva pestaña"
          >
            <CalendarCheck2 className="w-4 h-4 text-sky" />
            <span>Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] transition-all min-h-[48px] active:scale-95"
            aria-label="Compartir invitación por WhatsApp"
          >
            <Share2 className="w-4 h-4" />
            <span>Invitar por WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
}
