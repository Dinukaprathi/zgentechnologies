export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060606] bg-cover bg-center bg-no-repeat px-4 text-center xs:px-6"
      style={{ backgroundImage: "url('/hero/hero1.jpg')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/70" />

      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(255, 20, 20, 0.28), transparent 48%), radial-gradient(circle at 50% 60%, rgba(140, 0, 0, 0.25), transparent 65%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E')",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-2 pt-24 xs:pt-20 sm:pt-16 md:pt-12">
        <div className="mb-4 rounded-full border border-red-600/30 bg-red-900/10 px-3 py-1.5 text-[7px] font-semibold tracking-[0.35em] text-red-400 xs:text-[8px] xs:px-4 xs:py-1 sm:text-[9px] sm:px-5">
          INNOVATION FOR THE NEXT ERA
        </div>

        <h1 className="font-display text-4xl font-black uppercase leading-[0.95] text-white xs:text-5xl sm:text-6xl md:text-7xl lg:text-[100px]">
          <span className="block">Decoding</span>
          <span className="block">The <span className="text-[#ff1010]">Future</span></span>
        </h1>

        <p className="mt-5 mx-auto max-w-2xl text-center text-sm leading-relaxed text-zinc-400 xs:text-base sm:mt-8 sm:max-w-3xl sm:text-lg md:text-xl">
          ZGenLabs is a multidisciplinary innovation hub dedicated to building
          the next generation of digital infrastructure and immersive
          experiences.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 xs:w-auto xs:flex-row xs:gap-4 sm:mt-10 sm:gap-5">
          <a
            href="#work"
            className="inline-flex w-full items-center justify-center xs:w-auto min-w-[170px] border border-[#ff1010] bg-[#ff1010] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-red-500 xs:px-8 xs:py-4 sm:min-w-[190px]"
          >
            Explore Our Work
          </a>
          <a
            href="/contact"
            className="inline-flex w-full items-center justify-center xs:w-auto min-w-[170px] border border-white/20 bg-transparent px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-100 transition hover:border-white/50 xs:px-8 xs:py-4 sm:min-w-[190px]"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center text-[7px] font-semibold uppercase tracking-[0.35em] text-zinc-500 xs:text-[8px] sm:mt-12">
          <span className="rotate-90 xs:hidden">Scroll</span>
          <span className="[writing-mode:vertical-rl] hidden xs:inline">Scroll</span>
          <span className="mt-2 h-10 w-px bg-gradient-to-b from-zinc-700 to-[#ff1010] xs:h-14" />
        </div>
      </div>
    </section>
  );
}
