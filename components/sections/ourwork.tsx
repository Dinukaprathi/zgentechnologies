'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCommonTechIcon, getFeaturedWorks } from '@/data/ourworkUtil';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
                      href={work.link || '#'}
                      className="group relative overflow-hidden border border-white/10 bg-[#090b0f] transition-all hover:border-white/20"
                    >
                      <div className="relative aspect-[11/10] overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
                        {work.imageUrl && (
                          <Image
                            src={work.imageUrl}
                            alt={work.imageAlt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
                      </div>

                      <div className="relative p-6 md:p-8">
                        {categoryLabels[work.category] && (
                          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#ff1111]">
                            {categoryLabels[work.category]}
                          </p>
                        )}
                        <h3 className="font-display text-xl font-black uppercase text-zinc-100 md:text-2xl">
                          {work.title}
                        </h3>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {work.technologies.slice(0, 3).map((tech) => {
                              const Icon = getCommonTechIcon(tech);

                              return (
                                <span
                                  key={tech}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-300"
                                >
                                  {Icon && <Icon className="h-3 w-3 text-[#ff1111]" />}
                                  <span className="leading-none">{tech}</span>
                                </span>
                              );
                            })}
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-white/20 group-hover:bg-white/10">
                            <ArrowRight className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-100" />
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