'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  KeyRound,
  Presentation,
  Cpu,
  MessageSquareShare,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import datos from '@/public/data/datos.json';

const ICON_MAP: Record<string, React.ElementType> = {
  KeyRound,
  Presentation,
  Cpu,
  MessageSquareShare,
  Sparkles,
};

export default function TimelineSection() {
  const { schedule, event } = datos;

  return (
    <section id="cronograma" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-24">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky/15 text-sky border border-sky/30 mb-3">
          <Clock className="w-3.5 h-3.5 text-sky" />
          <span>AGENDA MINUTO A MINUTO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Cronograma del <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue">Ateneo</span>
        </h2>
        <p className="text-sm sm:text-base text-muted mt-3">
          Viernes 4 de Diciembre de 2026 · {event.institution} · San Pedro de Jujuy
        </p>
      </div>

      {/* Interactive Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 md:pl-0">
        {/* Central Luminous Track on Desktop / Left Track on Mobile */}
        <div
          className="absolute top-2 bottom-2 left-6 sm:left-10 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-sky via-blue to-red shadow-[0_0_15px_rgba(54,217,255,0.7)]"
          aria-hidden="true"
        />

        <div className="space-y-10 sm:space-y-12">
          {schedule.map((item, index) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-6 sm:left-10 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-night border-2 border-sky shadow-[0_0_20px_rgba(54,217,255,0.8)] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-sky" />
                    <span className="absolute -inset-1 rounded-2xl bg-sky/20 animate-ping -z-10" />
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-2.5rem)] ml-10 sm:ml-14 md:ml-0 ${
                    isEven ? 'md:pl-0 md:pr-4' : 'md:pr-0 md:pl-4'
                  }`}
                >
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-deep/90 via-night/95 to-deep/85 border border-sky/20 hover:border-sky/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-neon-sky backdrop-blur-xl transition-all duration-300 group">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky/15 text-sky font-mono font-bold text-xs sm:text-sm border border-sky/30">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-red/15 text-red border border-red/30">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-cream/80 mt-1.5 leading-relaxed font-light">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-sky/15 flex items-center justify-between text-[11px] text-muted font-mono">
                      <span className="flex items-center gap-1 text-sky">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky" />
                        Hito Oficial
                      </span>
                      <span>Sede IES N.º 9</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
