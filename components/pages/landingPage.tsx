export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060606] px-6 text-center">
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center pt-12">
        <div className="mb-8 rounded-full border border-red-600/30 bg-red-900/10 px-5 py-1 text-[9px] font-semibold tracking-[0.45em] text-red-400">
          INNOVATION FOR THE NEXT ERA
        </div>

        <h1 className="font-display text-6xl font-black uppercase leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-[112px]">
          <span className="block">Decoding</span>
          <span className="block">The <span className="text-[#ff1010]">Future</span></span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-[30px] md:leading-6">
          ZGenLabs is a multidisciplinary innovation hub dedicated to building
          the next generation of digital infrastructure and immersive
          experiences.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <a
            href="#work"
            className="inline-flex min-w-[190px] items-center justify-center border border-[#ff1010] bg-[#ff1010] px-9 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
          >
            Explore Our Work
          </a>
          <a
            href="/contact"
            className="inline-flex min-w-[190px] items-center justify-center border border-white/20 bg-transparent px-9 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-100 transition hover:border-white/50"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center text-[9px] font-semibold uppercase tracking-[0.45em] text-zinc-500">
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="mt-3 h-14 w-px bg-gradient-to-b from-zinc-700 to-[#ff1010]" />
        </div>
      </div>
    </section>
  );
}