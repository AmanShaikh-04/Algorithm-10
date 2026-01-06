"use client";

import { useState, useEffect, useRef } from "react";

export default function NavbarBanner() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const collapseTimer = useRef(null);

  /* ----------------------------
     Detect mobile screen
  ---------------------------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ----------------------------
     Desktop hover
  ---------------------------- */
  const handleMouseEnter = () => {
    if (isMobile) return;
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    collapseTimer.current = setTimeout(() => {
      setExpanded(false);
    }, 800);
  };

  /* ----------------------------
     Mobile tap
  ---------------------------- */
  const handleTap = () => {
    if (!isMobile) return;
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    return () => collapseTimer.current && clearTimeout(collapseTimer.current);
  }, []);

  return (
    <header className="mt-4 flex w-full justify-center px-3">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
        className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
          expanded ? "h-auto w-full max-w-7xl" : "h-14 w-full max-w-md md:h-16"
        } rounded-3xl border border-white/30 bg-gradient-to-l from-black/20 to-yellow-950/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-xl`}
      >
        {/* ================= NAVBAR ================= */}
        <div
          className={`relative z-10 transition-all duration-500 ${expanded ? "opacity-100" : "pointer-events-none opacity-0"} `}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3">
            <img src="/images/logo.png" alt="Logo" className="w-12 md:w-14" />

            {/* Desktop nav */}
            <nav className="hidden gap-8 text-white md:flex">
              <a href="#home" className="group relative">
                Home
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-orange-400 transition-all group-hover:w-full" />
              </a>
              <a href="#about" className="group relative">
                About
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-orange-400 transition-all group-hover:w-full" />
              </a>
              <a href="#tracks" className="group relative">
                Tracks
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-orange-400 transition-all group-hover:w-full" />
              </a>
              <a href="#timeline" className="group relative">
                Timeline
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-orange-400 transition-all group-hover:w-full" />
              </a>
              <a href="#sponsors" className="group relative">
                Sponsors
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-orange-400 transition-all group-hover:w-full" />
              </a>
              <a href="#faq" className="group relative">
                FAQ
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-orange-400 transition-all group-hover:w-full" />
              </a>
            </nav>

            {/* Desktop CTA */}
            <button className="hidden rounded-full bg-gradient-to-l from-orange-400 to-red-500 px-6 py-2 text-white transition hover:scale-105 md:block">
              Register
            </button>

            {/* Mobile icon */}
            <span className="text-xl text-white md:hidden">☰</span>
          </div>

          {/* Mobile menu */}
          {isMobile && (
            <div className="space-y-4 px-6 pb-4 text-center text-white md:hidden">
              <a href="#home" className="block border-b border-white/20 pb-2">
                Home
              </a>
              <a href="#about" className="block border-b border-white/20 pb-2">
                About
              </a>
              <a href="#tracks" className="block border-b border-white/20 pb-2">
                Tracks
              </a>
              <a
                href="#timeline"
                className="block border-b border-white/20 pb-2"
              >
                Timeline
              </a>
              <a
                href="#sponsors"
                className="block border-b border-white/20 pb-2"
              >
                Sponsors
              </a>
              <a href="#faq" className="block border-b border-white/20 pb-2">
                FAQ
              </a>

              <button className="w-full rounded-full bg-gradient-to-l from-orange-400 to-red-500 py-2">
                Register
              </button>
            </div>
          )}
        </div>

        {/* ================= BANNER ================= */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            expanded
              ? "pointer-events-none scale-105 opacity-0"
              : "scale-100 opacity-100"
          } `}
        >
          <img
            src="/images/banner.png"
            alt="Banner"
            className="h-14 w-auto object-contain md:h-16"
          />
        </div>
      </div>
    </header>
  );
}
