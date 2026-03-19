'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedWorks } from '@/data/ourworkUtil';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

function normalizeExternalUrl(url?: string): string | null {
  if (!url?.trim()) return null;
  const cleaned = url.trim();
  return cleaned.startsWith('http://') || cleaned.startsWith('https://')
    ? cleaned
    : `https://${cleaned}`;
}

export default function Work() {
  const featuredWorks = getFeaturedWorks();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(featuredWorks.length / itemsPerSlide);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const slides = Array.from({ length: totalSlides }, (_, slideIndex) =>
    featuredWorks.slice(
      slideIndex * itemsPerSlide,
      (slideIndex + 1) * itemsPerSlide
    )
  );
  const slideKeys = slides.map((slide) => slide.map((work) => work.id).join('-'));

  const categoryLabels: Record<string, string> = {
    web: '',
    mobile: 'MOBILE',
    design: 'DESIGN',
    consulting: 'CONSULTING',
    ai: 'MACHINE LEARNING',
    other: 'OTHER',
  };

  return (
    <section id="work" className="bg-[#050507] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 md:mb-16">
          <p className="mb-6 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.45em] text-[#ff1111]">
            <span className="h-px w-8 bg-[#ff1111]" />
            {" "}
            Portfolio
          </p>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-4xl font-black uppercase text-zinc-100 sm:text-5xl lg:text-6xl">
              Featured <span className="text-[#ff1111]">Works</span>
            </h2>
            <Link
              href="/archive"
              className="text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-100 md:text-sm"
            >
              Browse Archive <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div key={slideKeys[slideIndex]} className="w-full shrink-0">
                <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
                  {slide.map((work) => (
                    <Link
                      key={work.id}
                      href={normalizeExternalUrl(work.link) || '#'}
                      target={normalizeExternalUrl(work.link) ? '_blank' : undefined}
                      rel={normalizeExternalUrl(work.link) ? 'noreferrer noopener' : undefined}
                      aria-disabled={!normalizeExternalUrl(work.link)}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#10131b] via-[#0d1017] to-[#090b0f] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_60px_-30px_rgba(255,17,17,0.6)]"
                    >
                      <div className="relative aspect-[11/9] overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
                        {work.imageUrl && (
                          <Image
                            src={work.imageUrl}
                            alt={work.imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0c10] to-transparent" />

                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                          {categoryLabels[work.category] && (
                            <span className="inline-flex items-center rounded-full border border-[#ff1111]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff4d4d] backdrop-blur">
                              {categoryLabels[work.category]}
                            </span>
                          )}
                          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-200 backdrop-blur">
                            {work.year}
                          </span>
                        </div>
                      </div>

                      <div className="relative space-y-4 p-5 md:p-6">
                        {work.client && (
                          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
                            Client: <span className="text-zinc-200">{work.client}</span>
                          </p>
                        )}

                        <h3 className="font-display text-xl font-black uppercase text-zinc-100 md:text-2xl">
                          {work.title}
                        </h3>

                        {work.subtitle && (
                          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
                            {work.subtitle}
                          </p>
                        )}

                        <div className="flex items-center justify-end border-t border-white/10 pt-4">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 group-hover:border-[#ff1111]/50 group-hover:bg-[#ff1111]/10">
                            <ArrowRight className="h-4 w-4 text-zinc-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#ff8f8f]" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <button
            onClick={handlePrev}
            className="rounded-full border-2 border-zinc-500 p-3 text-zinc-300 transition-colors hover:border-zinc-200 hover:bg-zinc-200 hover:text-zinc-900"
            aria-label="Previous projects"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Dots */}
          <div className="flex gap-3">
            {slideKeys.map((slideKey, index) => (
              <button
                key={slideKey}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-zinc-200' : 'bg-zinc-600 hover:bg-zinc-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="rounded-full border-2 border-zinc-500 p-3 text-zinc-300 transition-colors hover:border-zinc-200 hover:bg-zinc-200 hover:text-zinc-900"
            aria-label="Next projects"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}