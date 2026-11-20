'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Pause,
  Play,
} from 'lucide-react';
import datos from '@/public/data/datos.json';
import { CarouselItem } from '@/types/event';
import LightboxModal from './LightboxModal';

export default function Carousel3D() {
  const items: CarouselItem[] = datos.carousel;
  const count = items.length; // 6 items
  const angleStep = 360 / count; // 60 deg each

  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(280);
  const [cardWidth, setCardWidth] = useState(240);
  const [cardHeight, setCardHeight] = useState(320);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);

  // Responsive radius & card size calculation to strictly prevent overflow on 320px-390px
  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 380) {
      // 320px screens
      setCardWidth(170);
      setCardHeight(240);
      setRadius(160);
    } else if (width < 640) {
      // 390px screens
      setCardWidth(200);
      setCardHeight(270);
      setRadius(195);
    } else if (width < 1024) {
      // Tablet
      setCardWidth(240);
      setCardHeight(320);
      setRadius(260);
    } else {
      // Desktop / 4K
      setCardWidth(270);
      setCardHeight(360);
      setRadius(340);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Keep ref synchronized
  useEffect(() => {
    currentRotation.current = rotation;
  }, [rotation]);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying || selectedItem) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev - angleStep);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedItem, angleStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setRotation((prev) => prev + angleStep);
      } else if (e.key === 'ArrowRight') {
        setRotation((prev) => prev - angleStep);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [angleStep]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    velocity.current = 0;
    setIsAutoPlaying(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    velocity.current = deltaX;
    lastX.current = e.clientX;

    // Scale sensitivity
    const rotationDelta = deltaX * 0.45;
    setRotation((prev) => prev + rotationDelta);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Snap to nearest card with inertia
    const inertia = velocity.current * 0.3;
    const target = Math.round((currentRotation.current + inertia) / angleStep) * angleStep;
    setRotation(target);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setRotation((prev) => prev + angleStep);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setRotation((prev) => prev - angleStep);
  };

  // Calculate normalized active index for display
  const activeIndex = (Math.round(-rotation / angleStep) % count + count) % count;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-clip select-none">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red/15 text-red border border-red/30 mb-3 shadow-neon-red">
          <Sparkles className="w-3.5 h-3.5 text-red" />
          <span>GALERÍA 3D INMERSIVA</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Alumnos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue">4.º Año TIC</span>
        </h2>
        <p className="text-sm sm:text-base text-muted mt-2 max-w-xl mx-auto">
          Arrastrá el carrusel 3D o usá las flechas para explorar las áreas de especialización, laboratorios y proyectos.
        </p>

        {/* Active badge */}
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-xl bg-deep/80 border border-sky/30 text-xs font-mono text-sky shadow-sm">
          <span>PROYECTO {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
          <span className="text-white">·</span>
          <span className="text-white font-bold">{items[activeIndex]?.tag}</span>
        </div>
      </div>

      {/* 3D Carousel Cylinder Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full max-w-5xl mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          height: `${cardHeight + 80}px`,
          perspective: '1200px',
        }}
      >
        {/* Revolving Cylinder */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {items.map((item, index) => {
            const cardAngle = index * angleStep;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:rounded-3xl overflow-hidden bg-deep border-2 border-sky/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:border-sky hover:shadow-neon-sky transition-all duration-300 group cursor-pointer"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 200px, 270px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradients and borders */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />

                  {/* Top Tag */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-night/90 border border-sky/40 text-[9px] sm:text-[10px] font-mono font-bold text-sky">
                    {item.tag}
                  </div>

                  {/* Expand icon */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-night/80 border border-white/20 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-sky" />
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-sky font-semibold line-clamp-1">
                      {item.subtitle}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-cream/70 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-deep/80 hover:bg-deep text-sky border border-sky/30 hover:border-sky shadow-neon-sky transition-all min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-90"
          aria-label="Foto anterior del carrusel"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="px-4 py-2.5 rounded-xl bg-night/80 hover:bg-night text-xs font-mono font-semibold text-cream border border-white/15 transition-all min-h-[48px] flex items-center gap-2"
          aria-label={isAutoPlaying ? 'Pausar rotación automática' : 'Reanudar rotación automática'}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-sky" />
              <span>PAUSAR</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-red" />
              <span>ROTAR</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-deep/80 hover:bg-deep text-sky border border-sky/30 hover:border-sky shadow-neon-sky transition-all min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-90"
          aria-label="Siguiente foto del carrusel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
