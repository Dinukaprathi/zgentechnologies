"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaClipboardList,
  FaCode,
  FaFlask,
  FaRocket,
  FaSync,
} from "react-icons/fa";

// Agile phases with their details
const agilePhases = [
  {
    id: 1,
    name: "Discovery",
    description: "Understanding requirements, user research, and defining project scope",
    icon: FaSearch,
    color: "#ff1111",
    bgColor: "bg-[#280b10]",
  },
  {
    id: 2,
    name: "Planning",
    description: "Sprint planning, backlog grooming, and roadmap definition",
    icon: FaClipboardList,
    color: "#ff4444",
    bgColor: "bg-[#281010]",
  },
  {
    id: 3,
    name: "Development",
    description: "Iterative coding, pair programming, and continuous integration",
    icon: FaCode,
    color: "#ff6666",
    bgColor: "bg-[#281510]",
  },
  {
    id: 4,
    name: "Testing",
    description: "QA automation, unit tests, integration tests, and user acceptance",
    icon: FaFlask,
    color: "#ff8888",
    bgColor: "bg-[#281a10]",
  },
  {
    id: 5,
    name: "Deployment",
    description: "CI/CD pipelines, production releases, and monitoring setup",
    icon: FaRocket,
    color: "#ffaaaa",
    bgColor: "bg-[#282010]",
  },
  {
    id: 6,
    name: "Review",
    description: "Sprint retrospectives, feedback analysis, and iteration planning",
    icon: FaSync,
    color: "#ffcccc",
    bgColor: "bg-[#282510]",
  },
];

// Responsive stagger configurations for the flow layout
const getStaggerConfig = (containerWidth: number) => {
  if (containerWidth < 640) {
    // Mobile (xs) - single column
    return {
      columns: 1,
      cardMinWidth: '100%',
      gap: 12,
      hubSize: 48,
    };
  } else if (containerWidth < 768) {
    // sm - two columns
    return {
      columns: 2,
      cardMinWidth: 'calc(50% - 8px)',
      gap: 16,
      hubSize: 56,
    };
  } else if (containerWidth < 1024) {
    // md - two columns wider
    return {
      columns: 2,
      cardMinWidth: 'calc(50% - 12px)',
      gap: 24,
      hubSize: 64,
    };
  } else {
    // lg+ - three columns
    return {
      columns: 3,
      cardMinWidth: 'calc(33.333% - 16px)',
      gap: 24,
      hubSize: 72,
    };
  }
};

export default function HowCompanyWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Track container width for responsive calculations
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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

  // Animation loop for progress and phase transitions
  useEffect(() => {
    if (!hasAnimated) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (!isPlaying) {
      return;
    }

    const phaseDuration = 5000; // 5 seconds per card
    let frameId: number;
    let lastTimestamp = 0;
    let accumulatedTime = 0;

    const animate = (timestamp: number) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      accumulatedTime += deltaTime;

      const progress = Math.min(accumulatedTime / phaseDuration, 1);
      setAnimationProgress(progress);

      if (progress >= 1) {
        setActivePhase((prev) => (prev + 1) % agilePhases.length);
        accumulatedTime = 0;
        lastTimestamp = 0;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    animationRef.current = frameId;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasAnimated, isPlaying]);

  const config = getStaggerConfig(containerWidth);
  const revealClass = hasAnimated
    ? "translate-y-0 opacity-100 blur-0"
    : "translate-y-6 opacity-0 blur-[2px]";

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-[#050507] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div
          className={`flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start md:justify-between transform-gpu transition-all duration-700 ease-out ${revealClass}`}
        >
          <div
            className="transform-gpu transition-all duration-700 ease-out"
            style={{ transitionDelay: "70ms" }}
          >
            <p className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-[8px] xs:text-[9px] font-semibold uppercase tracking-[0.35em] text-[#ff1212]">
              <span className="h-px w-5 sm:w-7 bg-[#ff1212]" />
              Our Process
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9] text-zinc-100">
              <span className="block">Agile</span>
              <span className="block text-zinc-700">Methodology</span>
            </h2>
          </div>

          <p
            className="max-w-xs sm:max-w-sm text-xs sm:text-sm leading-6 sm:leading-7 text-zinc-500 transform-gpu transition-all duration-700 ease-out"
            style={{ transitionDelay: "140ms" }}
          >
            We follow an iterative approach that ensures continuous improvement,
            rapid feedback, and adaptive planning throughout the development lifecycle.
          </p>
        </div>

        {/* Interactive Controls */}
        <div
          className={`mt-6 sm:mt-8 flex justify-end transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "200ms" }}
        >
          <button
            onClick={() => {
              if (isPlaying) {
                setAnimationProgress(0);
              }
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] xs:text-xs font-semibold uppercase tracking-widest text-[#ff1212] border border-[#ff1212]/30 rounded-full hover:bg-[#ff1212]/10 transition-all duration-300"
          >
            {isPlaying ? (
              <>
                <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-pulse h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#ff1212] rounded-full" />
                </span>
                Animating
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#ff1212] rounded-full" />
                Paused
              </>
            )}
          </button>
        </div>

        {/* Agile Process Flow Visualization */}
        <div
          ref={containerRef}
          className={`mt-8 sm:mt-10 md:mt-12 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Animated Progress Flow Line (replacing orbit) */}
          <div className="relative mb-6 sm:mb-8">
            <div className="flex items-center justify-between relative">
              {/* Background flow line */}
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-[#ff1111]/10 via-[#ff1111]/30 to-[#ff1111]/10 -translate-y-1/2" />
              
              {/* Animated progress fill */}
              <div 
                className="absolute left-0 top-1/2 h-px bg-gradient-to-r from-[#ff1111] to-[#ff4444] -translate-y-1/2 transition-all duration-1000 ease-out"
                style={{ width: `${((activePhase + animationProgress) / agilePhases.length) * 100}%` }}
              />

              {/* Flow dots moving along the line */}
              {isPlaying && Array.from({ length: 8 }).map((_, i) => {
                const progress = ((i / 8) + animationProgress) % 1;
                return (
                  <div
                    key={`flow-${i}`}
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#ff1111]"
                    style={{
                      left: `${progress * 100}%`,
                      opacity: 1 - (i / 8) * 0.8,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: i === 0 ? '0 0 8px #ff1111' : 'none',
                    }}
                  />
                );
              })}

              {/* Phase indicators on the line */}
              {agilePhases.map((phase, index) => {
                const isActive = activePhase === index;
                const isCompleted = activePhase > index;
                const isNext = (activePhase + 1) % agilePhases.length === index;

                return (
                  <button
                    key={phase.id}
                    onClick={() => {
                      setActivePhase(index);
                      setIsPlaying(false);
                    }}
                    className="relative z-10 flex flex-col items-center group"
                  >
                    {/* Indicator dot */}
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 ${
                        isActive 
                          ? 'bg-[#ff1111] scale-150 shadow-[0_0_12px_#ff1111]' 
                          : isCompleted 
                          ? 'bg-[#ff1111]/60 scale-100' 
                          : isNext 
                          ? 'bg-[#ff1111]/40 scale-125 animate-pulse' 
                          : 'bg-zinc-700 scale-100'
                      }`}
                    />
                    
                    {/* Phase number below */}
                    <span className={`mt-2 text-[8px] xs:text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-500 ${
                      isActive ? 'text-[#ff1111]' : isCompleted ? 'text-zinc-500' : 'text-zinc-600'
                    }`}>
                      {String(phase.id).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Status Hub */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              {/* Outer pulsing ring */}
              {isPlaying && (
                <div className="absolute inset-0 -m-4">
                  <div 
                    className="w-full h-full rounded-full border border-[#ff1111]/30 animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                </div>
              )}

              {/* Main hub */}
              <div 
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0a0a0f] border-2 border-[#ff1111]/50 flex items-center justify-center overflow-hidden"
              >
                {/* Progress arc */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="#ffffff08"
                    strokeWidth="3"
                  />
                  <circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="#ff1111"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${animationProgress * 264} 264`}
                    style={{ filter: 'drop-shadow(0 0 4px #ff1111)' }}
                  />
                </svg>

                {/* Hub content */}
                <div className="text-center relative z-10">
                  <div className={`text-xs sm:text-sm font-black text-[#ff1111] transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}>
                    {activePhase + 1}
                  </div>
                  <div className="text-[7px] sm:text-[8px] text-zinc-500 uppercase">
                    of {agilePhases.length}
                  </div>
                </div>
              </div>

              {/* Status label */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-widest text-[#ff1111] whitespace-nowrap">
                {isPlaying ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#ff1111] animate-pulse" />
                    Active
                  </span>
                ) : (
                  <span className="text-zinc-500">Paused</span>
                )}
              </div>
            </div>
          </div>

          {/* Phase Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {agilePhases.map((phase, index) => {
              const isActive = activePhase === index;
              const isNext = (activePhase + 1) % agilePhases.length === index;
              const IconComponent = phase.icon;

              return (
                <div
                  key={phase.id}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-[1.02] z-20' : 'hover:scale-[1.01]'
                  }`}
                  onClick={() => {
                    setActivePhase(index);
                    setIsPlaying(false);
                  }}
                >
                  {/* Active glow effect */}
                  {isActive && isPlaying && (
                    <div 
                      className="absolute -inset-1 rounded-xl blur-xl opacity-30 animate-pulse"
                      style={{ backgroundColor: phase.color }}
                    />
                  )}

                  {/* Connection line between cards (desktop only) */}
                  {index < agilePhases.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-2 w-4 h-px">
                      <div 
                        className={`w-full h-full transition-all duration-500 ${
                          isActive || activePhase > index ? 'bg-[#ff1111]/60' : 'bg-zinc-700/50'
                        }`}
                      />
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className={`relative p-4 rounded-xl border transition-all duration-500 ${
                      isActive
                        ? 'border-[#ff1111]/60 bg-[#1a0a0a]'
                        : isNext
                        ? 'border-[#ff1111]/30 bg-[#0d0d12] border-dashed'
                        : 'border-white/5 bg-[#0a0a0f] hover:border-white/10'
                    }`}
                  >
                    {/* Next badge */}
                    {isNext && !isActive && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#ff1111] text-[#050507] text-[8px] font-bold uppercase tracking-wider rounded-full">
                        Next
                      </div>
                    )}

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                      {/* Icon container */}
                      <div
                        className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all duration-500 ${
                          isActive ? 'scale-110' : ''
                        }`}
                        style={{
                          backgroundColor: isActive ? `${phase.color}25` : isNext ? '#ff111115' : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <IconComponent
                          className={`text-lg sm:text-xl transition-all duration-500 ${
                            isActive ? 'scale-110' : ''
                          }`}
                          style={{ color: isActive ? phase.color : isNext ? '#ff1111' : '#71717a' }}
                        />
                      </div>

                      {/* Phase number badge */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isActive ? 'border-[#ff1111] bg-[#ff1111]/20' : isNext ? 'border-[#ff1111]/50' : 'border-zinc-700'
                      }`}>
                        <span className={`text-[9px] font-bold ${isActive ? 'text-[#ff1111]' : 'text-zinc-500'}`}>
                          {phase.id}
                        </span>
                      </div>
                    </div>

                    {/* Phase name */}
                    <h3 className={`text-sm sm:text-base font-bold uppercase tracking-wide mb-2 transition-all duration-500 ${
                      isActive ? 'text-white' : isNext ? 'text-[#ff1111]' : 'text-zinc-400'
                    }`}>
                      {phase.name}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs text-zinc-400 leading-relaxed transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-60'
                    }`}>
                      {phase.description}
                    </p>

                    {/* Active indicator bar at bottom */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ 
                        background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)` 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div
          className={`mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "500ms" }}
        >
          {/* Card 1 */}
          <article className="relative overflow-hidden border border-white/5 bg-[#090b0f] p-4 sm:p-5 rounded-xl">
            <div className="absolute -right-3 -top-3 h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#280b10] opacity-60" />
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#ff1111]/20 flex items-center justify-center">
                <span className="text-[#ff1111] font-bold text-xs">2</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-black uppercase text-zinc-100">
                2-Week Sprints
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              We work in focused two-week iterations, delivering tangible progress
              and gathering feedback at the end of each sprint.
            </p>
          </article>

          {/* Card 2 */}
          <article className="relative overflow-hidden border border-white/5 bg-[#090b0f] p-4 sm:p-5 rounded-xl">
            <div className="absolute -right-3 -top-3 h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-700/20 opacity-60" />
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="h-7 w-7 rounded-lg bg-zinc-500/20 flex items-center justify-center">
                <span className="text-zinc-400 font-bold text-xs">D</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-black uppercase text-zinc-100">
                Daily Standups
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Quick 15-minute daily syncs keep the team aligned, identify blockers
              early, and maintain momentum throughout the project.
            </p>
          </article>

          {/* Card 3 */}
          <article className="relative overflow-hidden border border-white/5 bg-[#090b0f] p-4 sm:p-5 rounded-xl">
            <div className="absolute -right-3 -top-3 h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#281010] opacity-60" />
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#ff4444]/20 flex items-center justify-center">
                <span className="text-[#ff4444] font-bold text-xs">C</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-black uppercase text-zinc-100">
                Continuous Delivery
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Automated pipelines ensure code is always deployable, with frequent
              releases that bring value to users faster.
            </p>
          </article>
        </div>

        {/* Sprint Timeline Visualization */}
        <div
          className={`mt-8 sm:mt-10 md:mt-12 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#ff1111]/0 via-[#ff1111]/20 to-[#ff1111]/0" />

            {/* Timeline markers */}
            <div className="relative flex justify-between items-center py-3 sm:py-4">
              {['Planning', 'Development', 'Review', 'Deploy'].map((item, index) => (
                <div
                  key={item}
                  className="flex flex-col items-center gap-1.5 sm:gap-2"
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <div
                    className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-500 ${
                      activePhase % 4 === index
                        ? 'bg-[#ff1111] scale-150 shadow-[0_0_8px_#ff1111]'
                        : 'bg-zinc-700'
                    }`}
                  />
                  <span
                    className={`text-[8px] xs:text-[10px] uppercase tracking-wider transition-all duration-500 ${
                      activePhase % 4 === index
                        ? 'text-[#ff1111] font-bold'
                        : 'text-zinc-600'
                    }`}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}