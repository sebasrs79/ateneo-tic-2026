'use client';

import { motion } from 'framer-motion';
import { Sparkles, Terminal, Code2, Cpu } from 'lucide-react';

const MARQUEE_ITEMS = [
  '4.º AÑO PROFESORADO EN TIC',
  'IES N.º 9 «JUANA AZURDUY»',
  'ATENEO TIC 2026',
  'ROBÓTICA EDUCATIVA',
  'SOFTWARE & WEB',
  'INNOVACIÓN PEDAGÓGICA',
  'SAN PEDRO DE JUJUY',
  'VIERNES 4 DE DICIEMBRE · 13:15 HS',
  'PROYECTOS EN VIVO',
];

export default function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden py-4 my-8 -rotate-1 sm:-rotate-2 bg-gradient-to-r from-sky via-[#42e8ff] to-sky text-night font-mono font-black uppercase text-xs sm:text-sm tracking-widest shadow-[0_0_30px_rgba(54,217,255,0.4)] border-y-2 border-night/20 select-none">
      <div className="flex w-max">
        {/* First track */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-6 whitespace-nowrap pr-6"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="drop-shadow-sm">{item}</span>
              {idx % 4 === 0 ? (
                <Sparkles className="w-4 h-4 text-red fill-red" />
              ) : idx % 4 === 1 ? (
                <Terminal className="w-4 h-4 text-night" />
              ) : idx % 4 === 2 ? (
                <Cpu className="w-4 h-4 text-night" />
              ) : (
                <Code2 className="w-4 h-4 text-red" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Duplicate track for seamless infinite loop */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-6 whitespace-nowrap pr-6"
          aria-hidden="true"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-4">
              <span className="drop-shadow-sm">{item}</span>
              {idx % 4 === 0 ? (
                <Sparkles className="w-4 h-4 text-red fill-red" />
              ) : idx % 4 === 1 ? (
                <Terminal className="w-4 h-4 text-night" />
              ) : idx % 4 === 2 ? (
                <Cpu className="w-4 h-4 text-night" />
              ) : (
                <Code2 className="w-4 h-4 text-red" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
