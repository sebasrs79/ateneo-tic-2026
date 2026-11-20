'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Terminal, Cpu } from 'lucide-react';

export default function VisorAlumnos3D() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-4xl mx-auto perspective-[1200px] select-none"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-sky/30 via-blue/20 to-red/30 rounded-3xl blur-2xl opacity-60 -z-10 animate-pulse-glow pointer-events-none" />

      {/* 3D Tilting Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-br from-[#0c2448]/90 via-[#071325]/95 to-[#0b1930]/90 border-2 border-sky/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(54,217,255,0.25)] backdrop-blur-xl transition-shadow duration-300 hover:border-sky/70 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(54,217,255,0.4)]"
      >
        {/* Cyber HUD Corner Accents */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-sky rounded-tl-lg pointer-events-none z-20" />
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-red rounded-tr-lg pointer-events-none z-20" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-sky rounded-bl-lg pointer-events-none z-20" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-red rounded-br-lg pointer-events-none z-20" />

        {/* Top HUD Status Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 mb-2 border-b border-sky/20 bg-deep/60 rounded-xl text-[11px] font-mono">
          <div className="flex items-center gap-2 text-sky">
            <span className="w-2 h-2 rounded-full bg-sky animate-ping" />
            <span className="font-bold tracking-wider">HOLO-VISOR // 4.° AÑO TIC</span>
          </div>
          <div className="flex items-center gap-2 text-muted text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-red" />
            <span>IES N.º 9 «JUANA AZURDUY»</span>
          </div>
        </div>

        {/* Image Frame with Laser Scanner and Holographic overlay */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/90">
          <Image
            src="/assets/portada-alumnos-tic.webp"
            alt="Alumnos de 4.º año del Profesorado de Educación Secundaria en TIC — IES N.º 9 Juana Azurduy"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
            className="object-cover object-center filter contrast-105"
            priority
          />

          {/* Holographic grid scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(54,217,255,0)_50%,rgba(0,0,0,0.7)_50%)] bg-[length:100%_4px]"
            aria-hidden="true"
          />

          {/* Animated Laser Scan line */}
          <div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sky to-transparent shadow-[0_0_15px_#36d9ff] pointer-events-none animate-laser-scan opacity-75"
            aria-hidden="true"
          />

          {/* Vignette & bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent pointer-events-none" />

          {/* Dynamic Glare Reflection Overlay */}
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(54,217,255,0.25) 0%, rgba(248,53,80,0.1) 40%, transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            aria-hidden="true"
          />

          {/* Protagonist Badge (Mandatory specification) */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red/90 text-white shadow-neon-red backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>INVITAN LOS ALUMNOS DE 4.º AÑO TIC</span>
            </div>
          </div>

          {/* Bottom Card Labels */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-night/80 border border-sky/30 text-[10px] sm:text-xs text-sky font-mono mb-1">
                <Terminal className="w-3 h-3 text-sky" />
                <span>PROYECTOS & ROBÓTICA EDUCATIVA</span>
              </div>
              <h2 className="text-base sm:text-2xl font-extrabold text-white drop-shadow-md">
                Comunidad Educativa en Acción
              </h2>
              <p className="text-xs text-cream/80 max-w-md hidden sm:block">
                Muestra interactiva de futuros profesores de TIC transformando la enseñanza en Jujuy.
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">FECHA OFICIAL</span>
              <span className="text-xs font-bold text-sky font-mono">04 DIC 2026 · 13:15 HS</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Orbital Mascot: robot-portada.webp */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-2, 3, -2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -right-3 -bottom-8 sm:-right-8 sm:-bottom-12 md:-right-12 md:-bottom-10 z-30 flex flex-col items-center pointer-events-auto"
      >
        {/* Interactive speech balloon */}
        <div className="relative mb-1 px-3 py-1 rounded-xl bg-deep/95 border border-sky/50 text-sky text-[10px] sm:text-xs font-bold shadow-neon-sky backdrop-blur-md animate-bounce">
          <span>¡Te esperamos! 🤖</span>
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-deep border-r border-b border-sky/50 rotate-45" />
        </div>

        {/* Robot companion with neon glow */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 group cursor-pointer">
          <div className="absolute inset-0 bg-sky/30 rounded-full blur-xl group-hover:bg-red/40 transition-colors duration-300" />
          <Image
            src="/assets/robot-portada.webp"
            alt="Mascota Robótica 3D del Ateneo TIC 2026"
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
            className="object-contain drop-shadow-[0_10px_20px_rgba(54,217,255,0.4)] group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
