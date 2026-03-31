"use client";

import { useEffect, useRef, useState } from "react";
import { servicesData } from "@/data/servicesData";

export default function Services() {
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
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const revealClass = hasAnimated
    ? "translate-y-0 opacity-100 blur-0"
    : "translate-y-6 opacity-0 blur-[2px]";

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[#060606] py-14 xs:py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div
          className={`flex flex-col justify-between gap-5 sm:gap-8 md:flex-row md:items-start transform-gpu transition-all duration-700 ease-out ${revealClass}`}
        >
          <div
            className="transform-gpu transition-all duration-700 ease-out"
            style={{ transitionDelay: "70ms" }}
          >
            <p className="mb-3 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#ff1212] sm:text-[9px]">
              <span className="h-px w-6 sm:w-7 bg-[#ff1212]" />
              {" "}
              Capabilities
            </p>
            <h2 className="font-display text-3xl font-black uppercase leading-[0.9] text-zinc-100 xs:text-4xl sm:text-5xl md:text-6xl lg:text-[76px]">
              <span className="block">Future-Proof</span>
              <span className="block text-zinc-700">Systems.</span>
            </h2>
          </div>

          <p
            className="max-w-[320px] pt-0 sm:pt-2 text-sm leading-7 text-zinc-500 md:text-[15px] transform-gpu transition-all duration-700 ease-out"
            style={{ transitionDelay: "140ms" }}
          >
            We provide high-intensity technical expertise for global brands
            aiming for the digital frontier through code and creativity.
          </p>
        </div>

        <div className="mt-8 xs:mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 gap-4 xs:gap-5 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.title}
                className={`border border-white/[0.05] bg-[#090a0c] px-5 xs:px-6 sm:px-7 py-6 xs:py-7 sm:py-8 md:py-9 transform-gpu transition-all duration-700 ease-out ${
                  hasAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${180 + index * 70}ms` }}
              >
                <div className="mb-4 sm:mb-6 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-white/[0.08] text-base sm:text-lg font-bold text-[#ff1212]">
                  <IconComponent size={20} className="sm:!h-6 sm:!w-6" />
                </div>
                <h3 className="font-display text-2xl xs:text-3xl font-black uppercase tracking-wide text-zinc-100 md:text-[35px]">
                  {service.title}
                </h3>
                <p className="mt-1 text-[10px] xs:text-xs font-semibold uppercase tracking-widest text-[#ff1212]">
                  {service.subtitle}
                </p>
                <p className="mt-3 xs:mt-4 text-sm leading-7 text-zinc-500 md:text-[15px]">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}