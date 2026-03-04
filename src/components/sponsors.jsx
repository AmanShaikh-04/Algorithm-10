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
      className="group relative mx-auto h-[280px] w-full max-w-[280px] cursor-pointer"
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
            ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(255,140,66,0.3)"
            : "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        {/* --- Moving Trail Border --- */}
        <div className="absolute -inset-[2px] z-0 overflow-hidden rounded-2xl">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_270deg,#ff8c42_360deg)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-[2px] rounded-[14px] bg-[#0a0a0a]" />
        </div>

        {/* --- Card Surface Texture --- */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Breathing Glow (Simulates power/life when idle) */}
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[50px] transition-opacity duration-700 ${isHovered ? "opacity-0" : "animate-pulse"}`}
        />

        {/* Interactive Spotlight (On Hover) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255,140,66,0.15), transparent 50%)`,
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
                  ? "scale-110 drop-shadow-[0_0_20px_rgba(255,140,66,0.6)]"
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
              className={`mt-1 h-0.5 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-300 ${isHovered ? "w-24 opacity-100" : "w-12 opacity-30"}`}
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
    // {
    //   name: "Google",
    //   logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    // },
    {
      name: "Red Bull",
      logo: "/images/redbull.png",
    },
    // {
    //   name: "Spotify",
    //   logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    // },
  ];

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-transparent px-4 py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Gallery-Style Header */}
        <div className="mb-20 transform text-center transition-all duration-1000 hover:scale-105">
          {/* Decorative Line Above */}
          <div className="mb-6 flex items-center justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            <div className="mx-4 h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          {/* Main Heading with Gradient and Glow */}
          <h2 className="relative mb-4 inline-block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Our Partners
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-30 blur-2xl" />
          </h2>
          
          {/* Subtitle */}
          <p className="mx-auto mt-2 max-w-2xl text-lg leading-relaxed text-gray-400">
            Fueling innovation through collaboration and technology.
          </p>

          {/* Decorative Line Below */}
          <div className="mt-6 flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-orange-500/50 to-transparent" />
            <div className="mx-3 h-1 w-1 rounded-full bg-amber-500" />
            <div className="h-px w-24 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={index} {...sponsor} delay={0.1 * index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}