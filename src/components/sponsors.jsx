"use client";

import React, { useState, useRef } from "react";

const SponsorCard = ({ name, logo, delay }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransform({ rotateX, rotateY });
    setPosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      // Height increased to h-[280px]
      className="relative mx-auto h-[280px] w-full max-w-[280px] cursor-pointer"
      style={{
        perspective: "1000px",
        animation: `fadeInUp 0.8s ease-out ${delay}s both`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="relative h-full w-full rounded-2xl bg-[#0a0a0a] transition-all duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(255,140,66,0.2)"
            : "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        {/* --- Moving Border (Always Active Scanner) --- */}
        <div
          className="absolute inset-[-1px] overflow-hidden rounded-2xl"
          style={{ transform: "translateZ(-2px)" }}
        >
          {/* Rotating gradient */}
          <div
            className={`absolute inset-[-50%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(transparent_0deg,rgba(255,140,66,0.4)_60deg,transparent_180deg)] ${isHovered ? "opacity-100" : "opacity-60"}`}
          />
          <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a]" />
        </div>

        {/* --- Card Surface Texture --- */}
        {/* 1. Base Grid (Always visible) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* 2. Breathing Glow (Simulates power/life when idle) */}
        <div
          className={`pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[50px] transition-opacity duration-700 ${isHovered ? "opacity-0" : "animate-pulse"}`}
        />

        {/* 3. Interactive Spotlight (On Hover) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255,140,66,0.1), transparent 50%)`,
          }}
        />

        {/* 4. Active Dots (On Hover) */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage:
              "radial-gradient(#ff8c42 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
            maskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`,
          }}
        />

        {/* --- Content --- */}
        <div
          className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-8 p-6"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Logo Container with Float Animation */}
          <div
            className={`relative flex h-28 w-full items-center justify-center transition-transform duration-300 ${!isHovered ? "animate-float" : ""}`}
          >
            <img
              src={logo}
              alt={`${name} logo`}
              className={`h-auto max-h-full w-auto max-w-[75%] object-contain drop-shadow-lg filter transition-all duration-300 ${
                isHovered
                  ? "scale-110 drop-shadow-[0_0_20px_rgba(255,140,66,0.4)]"
                  : "scale-100"
              } `}
            />
          </div>

          {/* Name Display */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold tracking-wide text-white transition-colors duration-300">
              {name}
            </h3>
            {/* Decorative line */}
            <div
              className={`h-0.5 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-300 ${isHovered ? "w-24 opacity-100" : "w-12 opacity-30"}`}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default function Sponsors() {
  const sponsors = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    },
  ];

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-neutral-950 px-4 py-24">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-orange-600/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Partners
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-600 to-amber-500" />
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Fueling innovation through collaboration.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={index} {...sponsor} delay={0.1 * index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
