'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layers, Cpu, GraduationCap, Sparkles } from 'lucide-react';
import datos from '@/public/data/datos.json';
import { PillarItem } from '@/types/event';

const ICONS = {
  exposiciones: Layers,
  tecnologia: Cpu,
  carrera: GraduationCap,
};

function PillarCard({ pillar }: { pillar: PillarItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = ICONS[pillar.id as keyof typeof ICONS] || Sparkles;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
      className="perspective-[1000px] h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-deep/90 via-[#071325]/95 to-deep/80 border border-sky/25 hover:border-sky/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(54,217,255,0.25)] group"
      >
        {/* Dynamic Specular Glare Reflection */}
        <motion.div
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(54,217,255,0.2) 0%, transparent 60%)`,
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Top Header of Card */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue">
              {pillar.number}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-sky/10 border border-sky/30 flex items-center justify-center text-sky group-hover:scale-110 group-hover:bg-sky group-hover:text-night transition-all duration-300 shadow-sm">
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-1">
            {pillar.title}
          </h3>
          <p className="text-xs text-sky font-semibold mb-3">
            {pillar.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
            {pillar.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-sky/15">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold bg-night/80 border border-sky/20 text-cream/90 group-hover:border-sky/40 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function PillarsSection() {
  const { pillars, stats } = datos;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky/15 text-sky border border-sky/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sky" />
          <span>EJES DE LA MUESTRA ANUAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          ¿Qué es el <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue">Ateneo TIC?</span>
        </h2>
        <p className="text-sm sm:text-base text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          Un espacio de divulgación, intercambio académico y demostración práctica donde los futuros docentes en Tecnologías de la Información y la Comunicación exponen sus proyectos finales.
        </p>
      </div>

      {/* 3 Holographic Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>

      {/* Animated Stats Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-deep/80 border border-sky/20 hover:border-sky/50 text-center transition-all duration-300 hover:shadow-neon-sky backdrop-blur-md"
          >
            <div className="text-3xl sm:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky via-blue to-red">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1.5">{stat.label}</div>
            <div className="text-[11px] text-muted font-light">{stat.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
