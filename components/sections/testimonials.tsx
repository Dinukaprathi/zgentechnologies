'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Testimonial } from '@/data/testimonials';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Readonly<TestimonialsProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoplayMs = 6000;
  const totalTestimonials = testimonials.length;

  useEffect(() => {
    if (totalTestimonials < 2) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    }, autoplayMs);

    return () => clearInterval(timer);
  }, [totalTestimonials]);

  const handlePrev = () => {
    if (!totalTestimonials) return;

    setCurrentIndex((prev) =>
      prev === 0 ? totalTestimonials - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!totalTestimonials) return;

    setCurrentIndex((prev) =>
      prev === totalTestimonials - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const safeCurrentIndex = totalTestimonials
    ? currentIndex % totalTestimonials
    : 0;
  const current = testimonials[safeCurrentIndex];
  const nextIndex = totalTestimonials
    ? (safeCurrentIndex + 1) % totalTestimonials
    : 0;
  const prevIndex = totalTestimonials
    ? (safeCurrentIndex - 1 + totalTestimonials) % totalTestimonials
    : 0;

  const railItems = useMemo(() => {
    return testimonials.map((item, idx) => ({
      item,
      idx,
      isActive: idx === safeCurrentIndex,
    }));
  }, [safeCurrentIndex, testimonials]);

  if (!current) {
    return null;
  }

  const getTrackFillClass = (idx: number) => {
    if (idx === safeCurrentIndex) return 'w-full bg-red-500';
    if (idx === prevIndex || idx === nextIndex) return 'w-1/2 bg-red-500/40';
    return 'w-0 bg-transparent';
  };

  return (
    <section id="testimonials" className="relative mx-auto max-w-7xl overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-red-700/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative mb-14 text-center">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-red-500">Client Stories</p>
        <h2 className="font-display text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
          <span className="block">Voices From The</span>
          <span className="block text-zinc-500">Frontier</span>
        </h2>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(18,18,18,0.98),rgba(8,8,8,0.98))] p-5 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            {String(safeCurrentIndex + 1).padStart(2, '0')} / {String(totalTestimonials).padStart(2, '0')}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-zinc-200 transition hover:border-red-500 hover:text-red-400"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-zinc-200 transition hover:border-red-500 hover:text-red-400"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          <article
            key={current.id}
            className="relative overflow-hidden rounded-xl border border-red-500/40 bg-zinc-950/90 p-6 transition-all duration-500 md:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-800" />
            <p className="mb-8 text-lg italic leading-relaxed text-zinc-100 md:text-2xl md:leading-relaxed">
              &quot;{current.quote}&quot;
            </p>

            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 bg-zinc-800">
                {current.image ? (
                  <Image src={current.image} alt={current.author} fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-bold text-red-400">{current.initials}</div>
                )}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{current.author}</h4>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400">{current.position}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{current.company}</p>
              </div>
            </div>
          </article>

          <div className="space-y-3">
            {railItems.map(({ item, idx, isActive }) => (
              <button
                key={item.id}
                onClick={() => goToSlide(idx)}
                className={`group flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                  isActive
                    ? 'border-red-500/60 bg-red-500/10'
                    : 'border-white/10 bg-zinc-900/60 hover:border-white/25 hover:bg-zinc-900'
                }`}
                aria-label={`Go to testimonial from ${item.author}`}
              >
                <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-white/15 bg-zinc-800">
                  {item.image ? (
                    <Image src={item.image} alt={item.author} fill sizes="44px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-red-400">{item.initials}</div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{item.author}</p>
                  <p className="truncate text-[10px] uppercase tracking-[0.2em] text-zinc-500">{item.position}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => goToSlide(idx)}
              className="group h-2 overflow-hidden rounded-full bg-zinc-800"
              aria-label={`Jump to slide ${idx + 1}`}
            >
              <span
                className={`block h-full rounded-full transition-all duration-500 ${getTrackFillClass(idx)}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
