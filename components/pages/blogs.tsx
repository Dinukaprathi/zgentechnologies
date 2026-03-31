"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaBell } from "react-icons/fa";

export default function Blogs() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const revealClass = hasAnimated
    ? "translate-y-0 opacity-100 blur-0"
    : "translate-y-6 opacity-0 blur-[2px]";

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#050507] flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff1111]/30 bg-[#ff1111]/10 mb-6 sm:mb-8 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1111] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff1111]" />
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#ff1111]">
            Coming Soon
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className={`font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] text-white mb-4 sm:mb-6 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="block text-zinc-700">Our</span>
          <span className="block">Blog</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "300ms" }}
        >
          Insights, updates, and stories from our engineering journey.
          We're crafting something exceptional — stay tuned for industry insights,
          technical deep-dives, and the latest from ZGenLabs.
        </p>

        {/* Visual Element */}
        <div
          className={`relative flex justify-center mb-10 sm:mb-16 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Decorative circle */}
          <div className="relative">
            <div className="h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 rounded-full border border-[#ff1111]/20 flex items-center justify-center">
              <div className="h-24 w-24 sm:h-36 sm:w-36 md:h-48 md:w-48 rounded-full border border-[#ff1111]/10 flex items-center justify-center">
                <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-[#ff1111]/5 flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl font-black text-[#ff1111]/30">
                    SOON
                  </span>
                </div>
              </div>
            </div>
            {/* Orbiting dot */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#ff1111] shadow-[0_0_12px_#ff1111]" />
            </div>
          </div>
        </div>

        {/* Notification Signup */}
        <div
          className={`transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="text-sm text-zinc-500 mb-4 uppercase tracking-widest text-[10px] sm:text-xs font-semibold">
            Want to be notified when we launch?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-6 py-3 bg-[#ff1111] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-[0_0_20px_#ff1111]/30"
            >
              <FaBell className="text-sm" />
              Get Notified
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-white/20 text-zinc-400 text-sm font-bold uppercase tracking-wider rounded-lg hover:border-white/40 hover:text-white transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div
          className={`mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="p-4 sm:p-6 border border-white/5 bg-white/[0.02] rounded-xl">
            <div className="text-2xl sm:text-3xl font-black text-[#ff1111]/60 mb-2">01</div>
            <h3 className="text-sm font-bold uppercase text-white mb-1">Tech Insights</h3>
            <p className="text-xs text-zinc-500">Deep dives into modern development</p>
          </div>
          <div className="p-4 sm:p-6 border border-white/5 bg-white/[0.02] rounded-xl">
            <div className="text-2xl sm:text-3xl font-black text-[#ff1111]/60 mb-2">02</div>
            <h3 className="text-sm font-bold uppercase text-white mb-1">Case Studies</h3>
            <p className="text-xs text-zinc-500">Real-world project breakdowns</p>
          </div>
          <div className="p-4 sm:p-6 border border-white/5 bg-white/[0.02] rounded-xl">
            <div className="text-2xl sm:text-3xl font-black text-[#ff1111]/60 mb-2">03</div>
            <h3 className="text-sm font-bold uppercase text-white mb-1">Industry News</h3>
            <p className="text-xs text-zinc-500">Latest tech trends & updates</p>
          </div>
        </div>
      </div>
    </section>
  );
}