import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaTiktok } from "react-icons/fa6";

const resourceLinks = [
  { label: "Services", href: "#services" },
  { label: "Latest Blog", href: "/blog" },
];

const socialLinks = [
  { label: "TikTok", href: "https://www.tiktok.com/@zgenlab", icon: FaTiktok },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zgenlabs", icon: FaLinkedinIn },
  { label: "GitHub", href: "#", icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050608] text-[#8f95a3]">
      <div className="mx-auto w-full max-w-7xl px-4 xs:px-6 py-10 xs:py-12 sm:py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-8 xs:gap-10 md:grid-cols-3 md:gap-8">
          <div className="md:border-r md:border-white/10 md:pr-8">
            <div className="flex items-center gap-0">
              <Image
                src="/logo/logo-without-bg.png"
                alt="ZGenLabs Logo"
                width={44}
                height={44}
                className="h-10 w-10 xs:h-11 xs:w-11 object-contain"
              />
              <span className="-ml-1.5 xs:-ml-2 text-base xs:text-lg font-black uppercase tracking-wide text-white">
                GEN<span className="text-[#ff2d2d]">LABS</span>
              </span>
            </div>

            <p className="mt-4 xs:mt-5 max-w-sm text-sm leading-6 text-[#737b8c]">
              Engineering the foundations of the next web, built on our journey
              to redefine technological excellence through unconventional
              innovation.
            </p>

            <div className="mt-5 xs:mt-7 flex flex-wrap items-center gap-3 xs:gap-5 text-[10px] xs:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d93a0]">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Icon className="h-3 w-3 xs:h-3.5 xs:w-3.5" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:border-r md:border-white/10 md:px-8">
            <p className="text-[9px] xs:text-[10px] font-bold uppercase tracking-[0.28em] text-[#c0c5d1]">
              Resource Hub
            </p>
            <ul className="mt-3 xs:mt-5 space-y-2.5 xs:space-y-3 text-sm text-[#7d8597]">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pl-8">
            <p className="text-[9px] xs:text-[10px] font-bold uppercase tracking-[0.28em] text-[#c0c5d1]">
              Contact Us
            </p>
            <div className="mt-3 xs:mt-5 space-y-2 xs:space-y-3 text-sm text-[#7d8597]">
              <p>info@zgenlabs.com</p>
              <p>+94 77 247 1142</p>
              <Link
                href="/contact"
                className="inline-block mt-3 px-4 py-2 bg-[#ff1010] text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-500 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 xs:mt-10 sm:mt-12 border-t border-white/10 pt-4 xs:pt-5 text-[9px] xs:text-[10px] uppercase tracking-[0.2em] text-[#666d7f] sm:flex sm:items-center sm:justify-between">
          <p>(c) {new Date().getFullYear()} ZGenLabs. Prototype channel.</p>
          <div className="mt-3 xs:mt-4 flex flex-wrap gap-4 xs:gap-6 sm:mt-0">
            <Link href="#" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Security
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Governance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
