import { flagLabels } from "@/data/labelsUtil";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const navLinks = flagLabels.map((item) => ({
    href: item.href ?? `#${item.key}`,
    label: item.text,
  }));

  const getNavHref = (href: string) =>
    href.startsWith("#") ? `/${href}` : href;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-dark/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-0 group">
              <Image
                src="/logo/logo-without-bg.png"
                alt="ZGenLabs Logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="-ml-2 text-xl font-display font-black uppercase">
                GEN<span className="text-brand">LABS</span>
              </span>
            </Link>

            {/* Menu */}
            <div className="hidden md:flex space-x-7 text-[11px] font-bold uppercase tracking-[0.2em] [perspective:900px]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getNavHref(link.href)}
                  className="rounded-md px-3 py-1.5 text-zinc-200 transition duration-300 transform-gpu [text-shadow:0_1px_0_rgba(0,0,0,0.65),0_4px_14px_rgba(255,18,18,0.18)] hover:-translate-y-0.5 hover:rotate-x-6 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}