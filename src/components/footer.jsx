"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-orange-600/8 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10">
        {/* Top — brand + nav */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-xs"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="Algorithm X Logo" className="w-10 h-10 object-contain" />
              <span
                className="text-2xl font-black tracking-tight text-white"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Algorithm{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  X
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/40">
              A 32-hour national-level hackathon. Where{" "}
              <span className="text-orange-400/80">Innovation</span> meets{" "}
              <span className="text-orange-400/80">Excellence</span>.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/40 transition-colors duration-200 hover:text-orange-400"
                style={{ fontFamily: "inter, sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-white/40 transition-all duration-200 hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/5"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p
            className="text-xs text-white/25"
            style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}
          >
            © {new Date().getFullYear()} Algorithm X · All rights reserved
          </p>
          <a
            href="https://unstop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full border border-orange-500/30 px-5 py-2 text-xs font-bold text-white transition-all duration-300 hover:border-orange-500/60 hover:shadow-[0_0_16px_rgba(249,115,22,0.25)]"
            style={{ fontFamily: "inter, sans-serif", letterSpacing: "0.1em" }}
          >
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">REGISTER NOW →</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
