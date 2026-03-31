"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaClipboardList,
  FaCode,
  FaFlask,
  FaRocket,
  FaSync,
  FaChevronRight,
} from "react-icons/fa";
import { GiCycle } from "react-icons/gi";

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

// Number of flowing dots on the orbit path
const FLOW_DOT_COUNT = 12;

// Responsive orbit configurations
const getOrbitConfig = (containerWidth: number) => {
  if (containerWidth < 640) {
    // Mobile (xs)
    return {
      orbitRadius: 130,
      containerHeight: 340,
      centerX: 170,
      centerY: 170,
      hubSize: 56,
    };
  } else if (containerWidth < 768) {
    // sm
    return {
      orbitRadius: 180,
      containerHeight: 440,
      centerX: 220,
      centerY: 220,
      hubSize: 64,
    };
  } else if (containerWidth < 1024) {
    // md
    return {
      orbitRadius: 220,
      containerHeight: 520,
      centerX: 270,
      centerY: 270,
      hubSize: 72,
    };
  } else {
    // lg+
    return {
      orbitRadius: 270,
      containerHeight: 620,
      centerX: 330,
      centerY: 330,
      hubSize: 80,
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

  const config = getOrbitConfig(containerWidth);
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

        {/* Agile Cycle Visualization */}
        <div
          ref={containerRef}
          className={`mt-8 sm:mt-10 md:mt-12 relative transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ 
            transitionDelay: "300ms",
            height: `${config.containerHeight}px`,
          }}
        >
          {/* Central Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Progress ring around center */}
              <svg 
                className="absolute inset-0 -rotate-90" 
                viewBox="0 0 100 100"
                style={{ 
                  width: `${config.hubSize}px`, 
                  height: `${config.hubSize}px` 
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#ffffff10"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#ff1111"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${animationProgress * 264} 264`}
                  className="transition-none"
                  style={{ filter: 'drop-shadow(0 0 4px #ff1111)' }}
                />
              </svg>

              {/* Pulsing rings */}
              {isPlaying && (
                <div className="absolute inset-0 animate-ping opacity-20">
                  <div 
                    className="rounded-full border-2 border-[#ff1111]"
                    style={{ width: `${config.hubSize}px`, height: `${config.hubSize}px` }}
                  />
                </div>
              )}

              {/* Center circle */}
              <div 
                className="rounded-full bg-[#050507] border-2 border-[#ff1111] flex items-center justify-center relative z-10 overflow-hidden"
                style={{ width: `${config.hubSize * 0.7}px`, height: `${config.hubSize * 0.7}px` }}
              >
                <div className="text-center">
                  <span className="text-[9px] xs:text-xs font-bold text-[#ff1111] block">
                    {agilePhases[activePhase].name.substring(0, 3)}
                  </span>
                  <span className="text-[7px] xs:text-[8px] text-zinc-500">
                    {activePhase + 1}/6
                  </span>
                </div>
              </div>

              {/* Center label */}
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 text-[9px] xs:text-xs font-bold uppercase tracking-widest text-[#ff1111] whitespace-nowrap">
                {isPlaying ? 'In Progress' : 'Paused'}
              </div>
            </div>
          </div>

          {/* Orbit Path with Flowing Animation */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div 
              className="rounded-full border border-white/5 relative"
              style={{ 
                width: `${config.orbitRadius * 2}px`, 
                height: `${config.orbitRadius * 2}px` 
              }}
            >
              {/* Flowing dots animation on orbit path */}
              {isPlaying && Array.from({ length: FLOW_DOT_COUNT }).map((_, i) => {
                const dotAngle = ((i / FLOW_DOT_COUNT) * 360 + (animationProgress * 360)) % 360;
                const dotRad = (dotAngle * Math.PI) / 180;
                const dotX = Math.cos(dotRad) * config.orbitRadius + config.orbitRadius;
                const dotY = Math.sin(dotRad) * config.orbitRadius + config.orbitRadius;
                const opacity = 1 - (i / FLOW_DOT_COUNT) * 0.7;
                const size = i === 0 ? 5 : i < 3 ? 4 : 3;
                return (
                  <div
                    key={`flow-dot-${i}`}
                    className="absolute rounded-full bg-[#ff1111]"
                    style={{
                      left: `${dotX}px`,
                      top: `${dotY}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity: opacity,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: i === 0 ? '0 0 6px #ff1111' : 'none',
                    }}
                  />
                );
              })}

              {/* Directional arrows on the orbit path */}
              {[0, 90, 180, 270].map((arrowAngle, i) => {
                const arrowRad = ((arrowAngle + 45) * Math.PI) / 180;
                const arrowX = Math.cos(arrowRad) * config.orbitRadius + config.orbitRadius;
                const arrowY = Math.sin(arrowRad) * config.orbitRadius + config.orbitRadius;
                return (
                  <div
                    key={`arrow-${i}`}
                    className="absolute text-[#ff1111]/30"
                    style={{
                      left: `${arrowX}px`,
                      top: `${arrowY}px`,
                      transform: `translate(-50%, -50%) rotate(${arrowAngle + 135}deg)`,
                    }}
                  >
                    <FaChevronRight className="text-[8px] xs:text-xs" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase Nodes positioned in a circle */}
          <div 
            className="absolute inset-0"
            style={{ height: `${config.containerHeight}px` }}
          >
            {/* SVG for animated path trail */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff1111" stopOpacity="0" />
                  <stop offset="100%" stopColor="#ff1111" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {isPlaying && (() => {
                const currentAngle = (activePhase * 60 - 90) * (Math.PI / 180);
                const nextAngle = (((activePhase + 1) % 6) * 60 - 90) * (Math.PI / 180);
                const trailR = config.orbitRadius;
                const cx = config.centerX;
                const cy = config.centerY;
                const x1 = cx + Math.cos(currentAngle) * trailR;
                const y1 = cy + Math.sin(currentAngle) * trailR;
                const x2 = cx + Math.cos(nextAngle) * trailR;
                const y2 = cy + Math.sin(nextAngle) * trailR;
                return (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#trailGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                    style={{ opacity: animationProgress * 0.6 }}
                  />
                );
              })()}
            </svg>

            {agilePhases.map((phase, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const x = Math.cos(angle) * config.orbitRadius;
              const y = Math.sin(angle) * config.orbitRadius;
              const isActive = activePhase === index;
              const isNext = (activePhase + 1) % agilePhases.length === index;
              const IconComponent = phase.icon;

              // Calculate card position - center the card on the orbit point
              const cardOffsetX = x;
              const cardOffsetY = y;

              return (
                <div
                  key={phase.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                  style={{
                    transform: `translate(calc(-50% + ${cardOffsetX}px), calc(-50% + ${cardOffsetY}px))`,
                  }}
                >
                  {/* Connection line to center */}
                  <div
                    className={`absolute transition-all duration-500 ${
                      isActive ? 'opacity-80' : 'opacity-10'
                    }`}
                    style={{
                      width: `${config.orbitRadius - config.hubSize / 2 - 20}px`,
                      height: '1px',
                      background: isActive
                        ? `linear-gradient(90deg, ${phase.color}, transparent)`
                        : phase.color,
                      left: x >= 0 ? '100%' : 'auto',
                      right: x < 0 ? '100%' : 'auto',
                      top: '50%',
                      transform: `rotate(${Math.atan2(y, x) * (180 / Math.PI)}deg)`,
                      transformOrigin: x >= 0 ? '0 50%' : '100% 50%',
                    }}
                  />

                  {/* Phase Card */}
                  <div
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      isActive
                        ? 'scale-110 z-30'
                        : isNext
                        ? 'scale-105 z-20'
                        : 'scale-100 z-10 hover:scale-105'
                    }`}
                    onClick={() => {
                      setActivePhase(index);
                      setIsPlaying(false);
                    }}
                  >
                    {/* Glow effect when active */}
                    {isActive && isPlaying && (
                      <div
                        className="absolute inset-0 rounded-lg blur-lg opacity-40 animate-pulse"
                        style={{ backgroundColor: phase.color }}
                      />
                    )}

                    {/* Next phase indicator */}
                    {isNext && !isActive && isPlaying && (
                      <div className="absolute -inset-0.5 rounded-lg border-2 border-dashed border-[#ff1111]/40 animate-pulse" />
                    )}

                    {/* Card */}
                    <div
                      className={`relative p-2 xs:p-3 rounded-lg border transition-all duration-500 ${
                        isActive
                          ? `border-[${phase.color}] bg-[${phase.bgColor}]`
                          : isNext
                          ? 'border-[#ff1111]/50 bg-[#090b0f]/90'
                          : 'border-white/10 bg-[#090b0f]/80 hover:border-white/20'
                      }`}
                      style={{
                        borderColor: isActive ? phase.color : isNext ? '#ff111180' : undefined,
                        backgroundColor: isActive ? phase.bgColor : undefined,
                      }}
                    >
                      {/* Icon */}
                      <div
                        className={`flex items-center justify-center h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 rounded-md mb-1.5 transition-all duration-500 ${
                          isActive ? 'scale-110' : ''
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? `${phase.color}20`
                            : isNext
                            ? '#ff111115'
                            : 'rgba(255,255,255,0.05)',
                        }}
                      >
                        <IconComponent
                          className={`text-base xs:text-lg transition-all duration-500 ${
                            isActive ? 'text-white' : isNext ? 'text-[#ff1111]' : 'text-zinc-400'
                          }`}
                          style={{ color: isActive ? phase.color : isNext ? '#ff1111' : undefined }}
                        />
                      </div>

                      {/* Phase number */}
                      <div className={`absolute -top-1.5 -right-1.5 h-4 w-4 xs:h-5 xs:w-5 rounded-full bg-[#050507] border flex items-center justify-center ${
                        isNext ? 'border-[#ff1111]' : 'border-white/20'
                      }`}>
                        <span className={`text-[6px] xs:text-[8px] font-bold ${isNext ? 'text-[#ff1111]' : 'text-zinc-500'}`}>
                          {phase.id}
                        </span>
                      </div>

                      {/* Phase name */}
                      <h3
                        className={`text-[10px] xs:text-xs font-bold uppercase tracking-wide transition-all duration-500 ${
                          isActive ? 'text-white' : isNext ? 'text-[#ff1111]' : 'text-zinc-400'
                        }`}
                      >
                        {phase.name}
                      </h3>

                      {/* Next label for upcoming phase */}
                      {isNext && !isActive && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#ff1111] text-[#050507] text-[6px] xs:text-[8px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                          Next
                        </div>
                      )}

                      {/* Description - only show when active */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isActive
                            ? 'max-h-16 opacity-100 mt-1'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-[8px] xs:text-[10px] text-zinc-400 leading-relaxed line-clamp-2">
                          {phase.description}
                        </p>
                      </div>
                    </div>
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