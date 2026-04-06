'use client';

import { flagLabels } from "@/data/labelsUtil";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Loader from "@/components/ui/Loader";

const NAVIGATION_LOADER_MS = 3000;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimerRef = useRef<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = flagLabels.map((item) => ({
    href: item.href ?? `#${item.key}`,
    label: item.text,
  }));

  const getNavHref = (href: string) =>
    href.startsWith("#") ? `/${href}` : href;

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    };
  }, []);

  const startNavLoading = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    const isSamePageHashJump = href.startsWith("/#") && pathname === "/";
    const isSameRoute = href === pathname;

    if (isSamePageHashJump || isSameRoute || isNavigating) {
      setIsOpen(false);
      return;
    }

    event.preventDefault();
    setIsOpen(false);
    setIsNavigating(true);

    navigationTimerRef.current = window.setTimeout(() => {
      router.push(href);
    }, NAVIGATION_LOADER_MS);
  };

  return (
    <>
      {isNavigating && <Loader />}
      <nav className="fixed top-0 w-full z-[100] bg-[#080808]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" onClick={(event) => startNavLoading(event, "/")} className="flex items-center gap-0 group">
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
                onClick={(event) => startNavLoading(event, getNavHref(link.href))}
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
        className={`fixed inset-0 top-16 md:top-20 bg-black/70 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-start pt-12 xs:pt-16 sm:pt-20 space-y-4 xs:space-y-5 sm:space-y-6 px-6 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getNavHref(link.href)}
              onClick={(event) => startNavLoading(event, getNavHref(link.href))}
              className="w-full max-w-sm text-center py-4 px-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-base xs:text-lg sm:text-xl font-black uppercase tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] text-white hover:border-red-500/40 hover:bg-red-500/10 hover:text-[#ff1010] active:bg-red-500/15 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      </nav>
    </>
  );
}
