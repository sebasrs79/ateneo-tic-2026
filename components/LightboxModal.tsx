'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Share2, Tag, Calendar } from 'lucide-react';
import { CarouselItem } from '@/types/event';
import { asset } from '@/lib/asset';

interface LightboxModalProps {
  selectedItem: CarouselItem | null;
  onClose: () => void;
}

export default function LightboxModal({ selectedItem, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, onClose]);

  if (!selectedItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-night/90 backdrop-blur-xl -z-10"
        />

        {/* Modal Window */}
        <motion.div
          layoutId={`carousel-card-${selectedItem.id}`}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-gradient-to-br from-deep via-night to-deep border-2 border-sky/50 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(54,217,255,0.3)] p-4 sm:p-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-night/80 text-cream hover:text-red hover:bg-white/10 border border-white/20 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky"
            aria-label="Cerrar vista detallada"
          >
            <X className="w-5 h-5" />
          </button>

          {/* High-res Image Preview */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black mb-5 border border-sky/30">
            <Image
              src={asset(selectedItem.image)}
              alt={selectedItem.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-night/90 border border-sky/40 text-xs font-mono font-bold text-sky flex items-center gap-1.5 shadow-sm">
              <Tag className="w-3.5 h-3.5 text-sky" />
              <span>{selectedItem.tag}</span>
            </div>
          </div>

          {/* Description & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ESTUDIANTES DE 4.° AÑO TIC · IES N.º 9</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {selectedItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-sky font-semibold mt-0.5">
              {selectedItem.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-cream/90 mt-3 leading-relaxed font-light">
              {selectedItem.description}
            </p>

            <div className="mt-6 pt-4 border-t border-sky/15 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-sky" />
                Viernes 4 de Diciembre de 2026
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-sky/20 hover:bg-sky/30 text-sky border border-sky/40 font-semibold transition min-h-[44px]"
              >
                Volver a la galería
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
