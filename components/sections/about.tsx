"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const revealClass = hasAnimated
    ? "translate-y-0 opacity-100 blur-0"
    : "translate-y-6 opacity-0 blur-[2px]";

  return (
    <section id="about" ref={sectionRef} className="bg-[#050507] py-14 xs:py-16 sm:py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 xs:gap-10 sm:gap-12 px-4 md:grid-cols-2 md:items-center md:gap-10 md:px-8">
        <div
          className={`transform-gpu transition-all duration-700 ease-out ${revealClass}`}
        >
          <p className="mb-4 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#ff1111] sm:text-[9px]">
            <span className="h-px w-6 sm:w-8 bg-[#ff1111]" />
            {" "}
            About the lab
          </p>

          <h2 className="font-display text-3xl font-black uppercase leading-[0.9] text-zinc-100 xs:text-4xl sm:text-5xl md:text-6xl lg:text-[76px]">
            <span className="block">Transforming</span>
            <span className="block">Ideas Into</span>
            <span className="block text-zinc-700">Digital</span>
            <span className="block text-zinc-700">Reality.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wide text-zinc-500 sm:mt-8 sm:text-base sm:leading-8 md:text-base md:leading-8">
            Founded in 2025, ZGenLabs operates at the intersection of design,
            engineering, and artificial intelligence. We believe that the future
            belongs to those who dare to experiment and break conventional
            boundaries.
          </p>
        </div>

        <div
          className={`space-y-4 sm:space-y-5 md:pt-24 md:ml-auto transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "120ms" }}
        >
          <article
            className={`relative overflow-hidden border border-white/10 bg-[#090b0f] p-5 sm:p-7 md:p-8 transform-gpu transition-all duration-700 ease-out ${
              hasAnimated ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            <div className="absolute -right-4 -top-4 h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-[#280b10] opacity-80" />
            <h3 className="relative flex items-center gap-2.5 sm:gap-3 font-display text-lg font-black uppercase tracking-wide text-zinc-100 sm:text-xl md:text-[28px]">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#ff1111]" />
              {" "}
              Our Mission
            </h3>
            <p className="relative mt-3 max-w-md text-sm leading-7 text-zinc-500 sm:mt-4 sm:text-[15px] md:mt-5 md:text-[15px]">
              To accelerate the transition to a decentralized, AI-driven future
              through high-impact technical solutions and ethical engineering.
            </p>
          </article>

          <article
            className={`relative overflow-hidden border border-white/10 bg-[#090b0f] p-5 sm:p-7 md:p-8 transform-gpu transition-all duration-700 ease-out ${
              hasAnimated ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            <div className="absolute -right-4 -top-4 h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-zinc-700/25" />
            <h3 className="relative flex items-center gap-2.5 sm:gap-3 font-display text-lg font-black uppercase tracking-wide text-zinc-100 sm:text-xl md:text-[28px]">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-zinc-500" />
              {" "}
              Our Vision
            </h3>
            <p className="relative mt-3 max-w-md text-sm leading-7 text-zinc-500 sm:mt-4 sm:text-[15px] md:mt-5 md:text-[15px]">
              Building the global standard for human-centric technology that
              empowers communities and solves complex industrial challenges.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
