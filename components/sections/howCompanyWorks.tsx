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

export default function HowCompanyWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0); // 0 to 1 progress between phases
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for mobile on mount
    setIsMobile(window.innerWidth < 768);
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

    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (!isPlaying) {
      setAnimationProgress(0);
      return;
    }

    const phaseDuration = 2500;
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
        // Phase complete - advance to next phase
        setActivePhase((prev) => (prev + 1) % agilePhases.length);
        // Reset for next phase
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

  const revealClass = hasAnimated
    ? "translate-y-0 opacity-100 blur-0"
    : "translate-y-6 opacity-0 blur-[2px]";

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-[#050507] py-14 xs:py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header Section */}
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
              Our Process
            </p>
            <h2 className="font-display text-3xl font-black uppercase leading-[0.9] text-zinc-100 xs:text-4xl sm:text-5xl md:text-6xl lg:text-[76px]">
              <span className="block">Agile</span>
              <span className="block text-zinc-700">Methodology</span>
            </h2>
          </div>

          <p
            className="max-w-[320px] pt-0 sm:pt-2 text-sm leading-7 text-zinc-500 md:text-[15px] transform-gpu transition-all duration-700 ease-out"
            style={{ transitionDelay: "140ms" }}
          >
            We follow an iterative approach that ensures continuous improvement,
            rapid feedback, and adaptive planning throughout the development lifecycle.
          </p>
        </div>

        {/* Interactive Controls */}
        <div
          className={`mt-8 flex justify-end transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "200ms" }}
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#ff1212] border border-[#ff1212]/30 rounded-full hover:bg-[#ff1212]/10 transition-all duration-300"
          >
            {isPlaying ? (
              <>
                <span className="flex h-2 w-2">
                  <span className="animate-pulse h-2 w-2 bg-[#ff1212] rounded-full" />
                </span>
                Animating
              </>
            ) : (
              <>
                <span className="h-2 w-2 bg-[#ff1212] rounded-full" />
                Paused
              </>
            )}
          </button>
        </div>

        {/* Agile Cycle Visualization */}
        <div
          className={`mt-12 xs:mt-14 sm:mt-16 relative transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Central Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Progress ring around center */}
              <svg className="absolute inset-0 h-24 w-24 sm:h-32 sm:w-32 -rotate-90" viewBox="0 0 100 100">
                {/* Background ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#ffffff10"
                  strokeWidth="3"
                />
                {/* Progress ring */}
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
              <div className="absolute inset-0 animate-ping opacity-20">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-2 border-[#ff1111]" />
              </div>

              {/* Center circle */}
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#050507] border-2 border-[#ff1111] flex items-center justify-center relative z-10 overflow-hidden">
                {/* Inner content - show current phase icon */}
                <div className="text-center">
                  <span className="text-[10px] sm:text-xs font-bold text-[#ff1111] block">
                    {agilePhases[activePhase].name.substring(0, 3)}
                  </span>
                  <span className="text-[8px] text-zinc-500">
                    {activePhase + 1}/6
                  </span>
                </div>
              </div>

              {/* Center label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#ff1111] whitespace-nowrap">
                {isPlaying ? 'In Progress' : 'Paused'}
              </div>
            </div>
          </div>

          {/* Orbit Path with Flowing Animation */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {/* Main orbit path */}
            <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] rounded-full border border-white/5 relative">
              {/* Flowing dots animation on orbit path */}
              {isPlaying && Array.from({ length: FLOW_DOT_COUNT }).map((_, i) => {
                const dotAngle = ((i / FLOW_DOT_COUNT) * 360 + (animationProgress * 360)) % 360;
                const dotRad = (dotAngle * Math.PI) / 180;
                const orbitRadius = isMobile ? 148 : isMobile ? 223 : 273;
                const dotX = Math.cos(dotRad) * orbitRadius + orbitRadius;
                const dotY = Math.sin(dotRad) * orbitRadius + orbitRadius;
                const opacity = 1 - (i / FLOW_DOT_COUNT) * 0.7;
                const size = i === 0 ? 6 : i < 3 ? 4 : 3;
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
                      boxShadow: i === 0 ? '0 0 8px #ff1111' : 'none',
                    }}
                  />
                );
              })}

              {/* Directional arrows on the orbit path */}
              {[0, 90, 180, 270].map((arrowAngle, i) => {
                const arrowRad = ((arrowAngle + 45) * Math.PI) / 180;
                const orbitRadius = isMobile ? 148 : 273;
                const arrowX = Math.cos(arrowRad) * orbitRadius + orbitRadius;
                const arrowY = Math.sin(arrowRad) * orbitRadius + orbitRadius;
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
                    <FaChevronRight className="text-xs" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase Nodes positioned in a circle */}
          <div className="relative w-full h-[350px] sm:h-[500px] md:h-[600px]">
            {/* SVG for animated path trail */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff1111" stopOpacity="0" />
                  <stop offset="100%" stopColor="#ff1111" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* Animated trail line from current to next phase */}
              {isPlaying && (() => {
                const currentAngle = (activePhase * 60 - 90) * (Math.PI / 180);
                const nextAngle = ((activePhase + 1) % 6 * 60 - 90) * (Math.PI / 180);
                const r = isMobile ? 140 : 260;
                const cx = isMobile ? 175 : 275; // approximate center X
                const cy = isMobile ? 175 : 275; // approximate center Y
                const x1 = cx + Math.cos(currentAngle) * r;
                const y1 = cy + Math.sin(currentAngle) * r;
                const x2 = cx + Math.cos(nextAngle) * r;
                const y2 = cy + Math.sin(nextAngle) * r;
                return (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#trailGradient)"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    className="animate-pulse"
                    style={{ opacity: animationProgress }}
                  />
                );
              })()}
            </svg>

            {agilePhases.map((phase, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180); // Start from top, 60 degrees apart
              const radiusX = isMobile ? 140 : 260;
              const radiusY = isMobile ? 140 : 260;
              const x = Math.cos(angle) * radiusX;
              const y = Math.sin(angle) * radiusY;
              const isActive = activePhase === index;
              const isNext = (activePhase + 1) % agilePhases.length === index;
              const IconComponent = phase.icon;

              return (
                <div
                  key={phase.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Connection line to center - animated when active */}
                  <div
                    className={`absolute transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-20'
                    }`}
                    style={{
                      width: '130px',
                      height: '2px',
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
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-xl blur-xl opacity-50 animate-pulse"
                        style={{ backgroundColor: phase.color }}
                      />
                    )}

                    {/* Next phase indicator */}
                    {isNext && !isActive && (
                      <div className="absolute -inset-1 rounded-xl border-2 border-dashed border-[#ff1111]/40 animate-pulse" />
                    )}

                    {/* Card */}
                    <div
                      className={`relative p-3 sm:p-4 rounded-xl border transition-all duration-500 ${
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
                        className={`flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg mb-2 transition-all duration-500 ${
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
                          className={`text-lg sm:text-xl transition-all duration-500 ${
                            isActive ? 'text-white' : isNext ? 'text-[#ff1111]' : 'text-zinc-400'
                          }`}
                          style={{ color: isActive ? phase.color : isNext ? '#ff1111' : undefined }}
                        />
                      </div>

                      {/* Phase number */}
                      <div className={`absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#050507] border flex items-center justify-center ${
                        isNext ? 'border-[#ff1111]' : 'border-white/20'
                      }`}>
                        <span className={`text-[8px] font-bold ${isNext ? 'text-[#ff1111]' : 'text-zinc-500'}`}>
                          {phase.id}
                        </span>
                      </div>

                      {/* Phase name */}
                      <h3
                        className={`text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-500 ${
                          isActive ? 'text-white' : isNext ? 'text-[#ff1111]' : 'text-zinc-400'
                        }`}
                      >
                        {phase.name}
                      </h3>

                      {/* Next label for upcoming phase */}
                      {isNext && !isActive && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#ff1111] text-[#050507] text-[8px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                          Next
                        </div>
                      )}

                      {/* Description - only show when active */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isActive
                            ? 'max-h-20 opacity-100 mt-2'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed">
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
          className={`mt-16 xs:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "500ms" }}
        >
          {/* Card 1 */}
          <article className="relative overflow-hidden border border-white/10 bg-[#090b0f] p-5 sm:p-6 rounded-xl">
            <div className="absolute -right-4 -top-4 h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-[#280b10] opacity-80" />
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-[#ff1111]/20 flex items-center justify-center">
                <span className="text-[#ff1111] font-bold text-sm">2</span>
              </div>
              <h3 className="font-display text-lg font-black uppercase text-zinc-100">
                2-Week Sprints
              </h3>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We work in focused two-week iterations, delivering tangible progress
              and gathering feedback at the end of each sprint.
            </p>
          </article>

          {/* Card 2 */}
          <article className="relative overflow-hidden border border-white/10 bg-[#090b0f] p-5 sm:p-6 rounded-xl">
            <div className="absolute -right-4 -top-4 h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-zinc-700/25" />
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-zinc-500/20 flex items-center justify-center">
                <span className="text-zinc-400 font-bold text-sm">D</span>
              </div>
              <h3 className="font-display text-lg font-black uppercase text-zinc-100">
                Daily Standups
              </h3>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Quick 15-minute daily syncs keep the team aligned, identify blockers
              early, and maintain momentum throughout the project.
            </p>
          </article>

          {/* Card 3 */}
          <article className="relative overflow-hidden border border-white/10 bg-[#090b0f] p-5 sm:p-6 rounded-xl">
            <div className="absolute -right-4 -top-4 h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-[#281010] opacity-80" />
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-[#ff4444]/20 flex items-center justify-center">
                <span className="text-[#ff4444] font-bold text-sm">C</span>
              </div>
              <h3 className="font-display text-lg font-black uppercase text-zinc-100">
                Continuous Delivery
              </h3>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Automated pipelines ensure code is always deployable, with frequent
              releases that bring value to users faster.
            </p>
          </article>
        </div>

        {/* Sprint Timeline Visualization */}
        <div
          className={`mt-12 xs:mt-16 transform-gpu transition-all duration-700 ease-out ${revealClass}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#ff1111]/0 via-[#ff1111]/30 to-[#ff1111]/0" />

            {/* Timeline markers */}
            <div className="relative flex justify-between items-center py-4">
              {['Planning', 'Development', 'Review', 'Deploy'].map((item, index) => (
                <div
                  key={item}
                  className="flex flex-col items-center gap-2"
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <div
                    className={`h-3 w-3 rounded-full transition-all duration-500 ${
                      activePhase % 4 === index
                        ? 'bg-[#ff1111] scale-150 shadow-[0_0_10px_#ff1111]'
                        : 'bg-zinc-700'
                    }`}
                  />
                  <span
                    className={`text-[10px] uppercase tracking-widest transition-all duration-500 ${
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

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes orbit-circle {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-260px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-260px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}