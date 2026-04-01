"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

// --- Inline SVG Icon Components ---
const SparklesIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const CubeIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const ShieldIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CloudIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
  </svg>
);

const LightbulbIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
);
// -----------------------------------

const cards = [
  {
    domain: "Next-Gen Generative AI",
    description: "Build transformative tools using LLMs or multimodal AI to democratize education, automate workflows, or bridge language barriers.",
    matches: "SDG 4 (Quality Education), SDG 8 (Decent Work), SDG 10 (Reduced Inequalities)",
    icon: SparklesIcon,
  },
  {
    domain: "Web3 for Decentralized Trust",
    description: "Create tamper-proof blockchain applications for carbon tracking, ethical supply chains, or green energy distribution.",
    matches: "SDG 12 (Responsible Consumption), SDG 13 (Climate Action)",
    icon: CubeIcon,
  },
  {
    domain: "Cybersecurity for Public Infra",
    description: "Design robust security systems to detect threats and protect critical civic networks like smart water grids or traffic systems.",
    matches: "SDG 6 (Clean Water & Sanitation), SDG 9 (Industry, Innovation & Infrastructure)",
    icon: ShieldIcon,
  },
  {
    domain: "Cloud Architecture for Crisis",
    description: "Architect highly scalable, serverless platforms to manage resource allocation and volunteer coordination during sudden emergencies.",
    matches: "SDG 9 (Industry & Infrastructure), SDG 11 (Sustainable Cities), SDG 13 (Climate Action)",
    icon: CloudIcon,
  },
  {
    domain: "Open Innovation",
    description: "Identify a specific community friction point and build a creative, tech-driven solution using any technology stack.",
    matches: "Any of the 17 SDGs",
    icon: LightbulbIcon,
  },
];

function Modal({ card, onClose }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[650px] overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] shadow-[0_0_40px_rgba(245,158,11,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Orange Accent Line */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-orange-500/50 text-sm font-bold text-orange-500 transition-all hover:bg-orange-500 hover:text-[#0d0d0d]"
        >
          ✕
        </button>

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-6">
            {/* Modal Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <card.icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-mono text-sm font-semibold tracking-widest text-orange-500">
                PS {String(card.index + 1).padStart(2, "0")}
              </div>
              <h2 className="font-syne mt-1 text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
                {card.domain}
              </h2>
            </div>
          </div>

          {/* Body / Problem Statements */}
          <div className="max-h-[50vh] overflow-y-auto pr-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-orange-500/30 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
                Problem Statement
              </h3>
              <p className="font-sans text-[16px] leading-relaxed text-gray-300">
                {card.description}
              </p>
            </motion.div>

            {/* SDGs Match Section */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5"
            >
              <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-500">
                SDG Matches
              </h3>
              <p className="font-sans text-[15px] font-medium leading-relaxed text-amber-100/90">
                {card.matches}
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Tracks() {
  const [activeCard, setActiveCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [currentIndex]); 

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  // Calculates the relative position of each card for the looping effect
  const getCardStyles = (index) => {
    const total = cards.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > Math.floor(total / 2)) {
      diff -= total; 
    }

    let x = "0%";
    let scale = 1;
    let opacity = 1;
    let zIndex = 30;

    if (diff === 0) {
      x = "0%"; scale = 1; opacity = 1; zIndex = 30;
    } else if (diff === 1) {
      x = "115%"; scale = 0.85; opacity = 0.7; zIndex = 20;
    } else if (diff === -1) {
      x = "-115%"; scale = 0.85; opacity = 0.7; zIndex = 20;
    } else if (diff === 2) {
      x = "180%"; scale = 0.6; opacity = 0; zIndex = 10;
    } else if (diff === -2) {
      x = "-180%"; scale = 0.6; opacity = 0; zIndex = 10;
    }

    return { 
      x, 
      scale, 
      opacity, 
      zIndex, 
      isCenter: diff === 0, 
      isVisible: Math.abs(diff) <= 1 
    };
  };

  return (
    <>
      <section
        id="tracks"
        className="relative flex min-h-[75vh] scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-transparent py-10 pb-0 sm:min-h-0 lg:px-10 lg:py-16"
      >
        {/* Section Header */}
        <div className="relative z-10 mb-8 transform text-center transition-all duration-1000 hover:scale-105 md:mb-12">
          <div className="mb-4 flex items-center justify-center md:mb-5">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-orange-500 to-transparent md:w-12" />
            <div className="mx-3 h-2 w-2 animate-pulse rounded-full bg-orange-500 md:mx-4" />
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-500 to-transparent md:w-12" />
          </div>

          <h2 className="font-orbitron animate-gradient relative mb-3 inline-block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-3xl font-bold tracking-widest uppercase text-transparent md:text-4xl lg:text-4xl">
            Domains
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-30 blur-2xl" />
          </h2>

          <p className="mx-auto max-w-2xl px-4 text-xs font-light leading-relaxed text-gray-400 md:text-sm lg:text-sm">
            Choose your domain and build solutions for humanity.
          </p>

          <div className="mt-4 flex items-center justify-center md:mt-5">
            <div className="h-px w-16 bg-gradient-to-r from-orange-500/50 to-transparent md:w-24" />
            <div className="mx-2 h-1 w-1 rounded-full bg-amber-500 md:mx-3" />
            <div className="h-px w-16 bg-gradient-to-l from-amber-500/50 to-transparent md:w-24" />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="group relative z-10 flex w-full max-w-[100vw] items-center justify-center">
          
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-[#111110]/80 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-sm transition-all hover:scale-110 hover:bg-amber-500/10 active:scale-95 sm:left-10 lg:left-24"
            aria-label="Previous track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          {/* Cards Track */}
          <div className="relative flex h-[260px] w-full items-center justify-center sm:h-[300px] lg:h-[360px]">
            {cards.map((card, i) => {
              const { x, scale, opacity, zIndex, isCenter, isVisible } = getCardStyles(i);
              const Icon = card.icon;

              return (
                <motion.div
                  key={i}
                  animate={{ x, scale, opacity, zIndex }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className={`absolute flex w-auto origin-center justify-center ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                  {/* Restored Mobile Size / Increased Desktop Size (360x260) */}
                  <div className="group relative h-[260px] w-[200px] sm:h-[300px] sm:w-[240px] lg:h-[360px] lg:w-[260px]">
                    <div className={`absolute -inset-[2px] z-0 overflow-hidden rounded-2xl transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_270deg,#f59e0b_360deg)] opacity-60" />
                      <div className="absolute inset-[2px] rounded-[14px] bg-[#111110]" />
                    </div>
                    {/* Static fallback border for non-center cards */}
                    <div className={`absolute -inset-[1px] z-0 rounded-2xl bg-amber-500/20 transition-opacity duration-500 ${isCenter ? 'opacity-0' : 'opacity-100'}`} />

                    <SpotlightCard
                      spotlightColor="rgba(251,191,36,0.15)"
                      className="!h-[260px] !w-[200px] cursor-pointer !border-transparent !bg-[#111110] !p-0 sm:!h-[300px] sm:!w-[240px] lg:!h-[360px] lg:!w-[260px]"
                    >
                      <div
                        onClick={() => {
                          if (!isVisible) return; 
                          if (isCenter) {
                            setActiveCard({ ...card, index: i });
                          } else {
                            setCurrentIndex(i); 
                          }
                        }}
                        className="absolute inset-0 flex select-none flex-col items-center justify-center p-4 sm:p-6"
                      >
                        {/* Glow Background */}
                        <motion.div
                          animate={{ opacity: isCenter ? [0.4, 0.7, 0.4] : 0.2, scale: isCenter ? [1, 1.08, 1] : 1 }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          className="pointer-events-none absolute h-24 w-24 rounded-full lg:h-[120px] lg:w-[120px]"
                          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.2) 0%, rgba(245,158,11,0.05) 50%, transparent 70%)" }}
                        />
                        
                        {/* Track Icon */}
                        <div className={`mb-3 mt-2 transition-all duration-300 lg:mb-5 ${
                          isCenter 
                            ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] scale-110' 
                            : 'text-amber-500/40 scale-100'
                        }`}>
                          <Icon className="h-[42px] w-[42px] lg:h-[48px] lg:w-[48px]" strokeWidth={1.2} />
                        </div>

                        {/* Track Title */}
                        <h3 
                          className={`font-orbitron z-10 w-full break-words text-center text-[13px] font-bold uppercase leading-snug tracking-wider transition-all duration-300 sm:text-[15px] lg:px-2 lg:text-[18px] lg:leading-normal ${
                            isCenter 
                              ? 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] group-hover:-translate-y-1 group-hover:scale-[1.03]' 
                              : 'text-amber-500/40'
                          }`}
                        >
                          {card.domain}
                        </h3>

                        {/* Labels */}
                        <div className="absolute bottom-6 flex flex-col items-center gap-1 sm:bottom-8 sm:gap-2">
                          <span className={`font-inter text-[10px] uppercase tracking-[0.28em] transition-colors lg:text-[11px] ${isCenter ? 'text-amber-500 opacity-80' : 'text-amber-500/40'}`}>
                            PS {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={`font-inter translate-y-2 text-[10px] uppercase tracking-[0.24em] text-amber-400 transition-all duration-300 delay-100 lg:text-[11px] ${isCenter ? 'opacity-0 group-hover:translate-y-0 group-hover:opacity-70' : 'opacity-0'}`}>
                            Click to reveal
                          </span>
                        </div>

                        {/* Bottom accent line */}
                        <div
                          className={`absolute right-[15%] bottom-0 left-[15%] h-[1px] transition-opacity ${isCenter ? 'opacity-100' : 'opacity-30'}`}
                          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), rgba(234,88,12,0.5), transparent)" }}
                        />

                        {/* Watermark Number */}
                        <span className="font-syne absolute right-4 bottom-2.5 pointer-events-none select-none text-[50px] font-extrabold leading-none text-amber-400 opacity-[0.04] lg:text-[70px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </SpotlightCard>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-[#111110]/80 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-sm transition-all hover:scale-110 hover:bg-amber-500/10 active:scale-95 sm:right-10 lg:right-24"
            aria-label="Next track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </section>
      <AnimatePresence>
        {activeCard && (
          <Modal card={activeCard} onClose={() => setActiveCard(null)} />
        )}
      </AnimatePresence>
    </>
  );
}