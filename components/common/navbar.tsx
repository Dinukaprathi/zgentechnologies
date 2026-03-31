'use client';

import { flagLabels } from "@/data/labelsUtil";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = flagLabels.map((item) => ({
    href: item.href ?? `#${item.key}`,
    label: item.text,
  }));

  const getNavHref = (href: string) =>
    href.startsWith("#") ? `/${href}` : href;

  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#080808]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group">
            <Image
              src="/logo/logo-without-bg.png"
              alt="ZGenLabs Logo"
              width={44}
              height={44}
              className="h-9 w-9 xs:h-10 xs:w-10 sm:h-11 sm:w-11 object-contain"
            />
            <span className="-ml-1.5 xs:-ml-2 text-base xs:text-lg sm:text-xl font-display font-black uppercase text-white">
              GEN<span className="text-[#ff1010]">LABS</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-5 lg:space-x-7 text-[11px] font-bold uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getNavHref(link.href)}
                className="rounded-md px-2.5 lg:px-3 py-1.5 text-zinc-400 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-16 md:top-20 bg-[#080808]/[0.98] backdrop-blur-2xl transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8 pb-32">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getNavHref(link.href)}
              onClick={() => setIsOpen(false)}
              className="text-lg sm:text-xl font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white hover:text-[#ff1010] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
