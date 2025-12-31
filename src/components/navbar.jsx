"use client";

import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["Home", "About", "Tracks", "Timeline", "Sponsors", "FAQ"];

export default function NavbarBanner() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const collapseTimer = useRef(null);

  /* ---------------------------------------
     Detect mobile (NO hover on touch)
  --------------------------------------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ---------------------------------------
     Desktop hover handlers
  --------------------------------------- */
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

  /* ---------------------------------------
     Mobile tap toggle
  --------------------------------------- */
  const handleTap = () => {
    if (!isMobile) return;
    setExpanded((prev) => !prev);
  };

  /* ---------------------------------------
     Cleanup timer
  --------------------------------------- */
  useEffect(() => {
    return () => collapseTimer.current && clearTimeout(collapseTimer.current);
  }, []);

  return (
    <header className="w-full flex justify-center mt-4 px-3">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
        className={`
          relative overflow-hidden
          transition-all duration-700 ease-in-out
          ${expanded
            ? "w-full max-w-7xl h-auto"
  : "w-full max-w-md h-14 md:h-16"}
          rounded-3xl
          bg-gradient-to-l from-black/20 to-yellow-950/10
          border border-white/30 backdrop-blur-xl
          shadow-[0_8px_24px_rgba(0,0,0,0.25)]
        `}
      >
        {/* ================= NAVBAR ================= */}
        <div
          className={`
            relative z-10
            transition-all duration-500
            ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-12 md:w-14"
            />

            {/* Desktop links */}
            <nav className="hidden md:flex gap-8 text-white">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative group"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-400 transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <button className="hidden md:block px-6 py-2 rounded-full text-white bg-gradient-to-l from-orange-400 to-red-500 hover:scale-105 transition">
              Register
            </button>

            {/* Mobile icon */}
            <span className="md:hidden text-white text-xl">
              ☰
            </span>
          </div>

          {/* Mobile menu */}
          {isMobile && (
            <div className="md:hidden px-6 pb-4 space-y-4 text-white">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block border-b border-white/20 pb-2"
                >
                  {item}
                </a>
              ))}

              <button className="w-full py-2 rounded-full bg-gradient-to-l from-orange-400 to-red-500">
                Register
              </button>
            </div>
          )}
        </div>

        {/* ================= BANNER ================= */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-500
            ${expanded
              ? "opacity-0 scale-105 pointer-events-none"
              : "opacity-100 scale-100"}
          `}
        >
          <img
            src="/images/banner.png"
            alt="Banner"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
}
