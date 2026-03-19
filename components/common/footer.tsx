import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Latest Blog", href: "#" },
  { label: "Open Source", href: "#" },
  { label: "Privacy Protocol", href: "#" },
];

const socialLinks = [
  { label: "Twitter", href: "#", icon: FaXTwitter },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { label: "GitHub", href: "#", icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050608] text-[#8f95a3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div className="md:border-r md:border-white/10 md:pr-8">
            <div className="flex items-center gap-0">
              <Image
                src="/logo/logo-without-bg.png"
                alt="ZGenLabs Logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="-ml-2 text-lg font-black uppercase tracking-wide text-white">
                GEN<span className="text-[#ff2d2d]">LABS</span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#737b8c]">
              Engineering the foundations of the next web, built on our journey
              to redefine technological excellence through unconventional
              innovation.
            </p>

            <div className="mt-7 flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d93a0]">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:border-r md:border-white/10 md:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c0c5d1]">
              Resource Hub
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#7d8597]">
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
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c0c5d1]">
              HQ Connections
            </p>
            <div className="mt-5 space-y-3 text-sm text-[#7d8597]">
              <p>hello@zgenlabs.tech</p>
              <p>+1 (888) 200-0181</p>
              <p>Innovation Way, Silicon Valley, CA</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.2em] text-[#666d7f] sm:flex sm:items-center sm:justify-between">
          <p>(c) {new Date().getFullYear()} ZGenLabs. Prototype channel.</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
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
