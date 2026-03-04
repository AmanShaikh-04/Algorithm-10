"use client";
import DomeGallery from "./Domegallery";
import React from "react";

const Gallery = () => {
  return (
    <section className="relative bg-transparent pt-4 pb-20">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 transform text-center transition-all duration-1000 hover:scale-105 md:mb-12">
          {/* Decorative Line Above */}
          <div className="mb-4 flex items-center justify-center md:mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-orange-500 to-transparent md:w-12" />
            <div className="mx-3 h-2 w-2 animate-pulse rounded-full bg-orange-500 md:mx-4" />
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-500 to-transparent md:w-12" />
          </div>

          {/* Main Heading with Gradient and Glow */}
          <h2 className="animate-gradient relative mb-3 inline-block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:mb-4 md:text-5xl lg:text-6xl">
            Gallery
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-30 blur-2xl" />
          </h2>

          {/* Subtitle with Enhanced Styling */}
          <p className="mx-auto max-w-2xl px-4 text-sm leading-relaxed text-gray-400 md:text-lg">
            Explore our immersive visual journey through innovation and
            creativity
          </p>

          {/* Decorative Line Below */}
          <div className="mt-4 flex items-center justify-center md:mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-orange-500/50 to-transparent md:w-24" />
            <div className="mx-2 h-1 w-1 rounded-full bg-amber-500 md:mx-3" />
            <div className="h-px w-16 bg-gradient-to-l from-amber-500/50 to-transparent md:w-24" />
          </div>
        </div>

        {/* Gallery Dome Container */}
        <div className="group relative">
          {/* Outer Glow Effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-25 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

          {/* Main Gallery Box */}
          <div className="relative h-[50vh] max-h-[800px] w-full overflow-hidden rounded-2xl border border-orange-500/20 bg-[#0a0a0a] shadow-2xl md:h-[80vh]">
            {/* Inner Glow Border */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 z-10 h-12 w-12 rounded-tl-2xl border-t-2 border-l-2 border-orange-500/50 md:h-20 md:w-20" />
            <div className="absolute top-0 right-0 z-10 h-12 w-12 rounded-tr-2xl border-t-2 border-r-2 border-amber-500/50 md:h-20 md:w-20" />
            <div className="absolute bottom-0 left-0 z-10 h-12 w-12 rounded-bl-2xl border-b-2 border-l-2 border-orange-500/50 md:h-20 md:w-20" />
            <div className="absolute right-0 bottom-0 z-10 h-12 w-12 rounded-br-2xl border-r-2 border-b-2 border-amber-500/50 md:h-20 md:w-20" />

            {/* Animated Corner Dots */}
            <div className="absolute top-2 left-2 z-10 h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 md:h-2 md:w-2" />
            <div className="absolute top-2 right-2 z-10 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500 delay-200 md:h-2 md:w-2" />
            <div className="absolute bottom-2 left-2 z-10 h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 delay-400 md:h-2 md:w-2" />
            <div className="absolute right-2 bottom-2 z-10 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500 delay-600 md:h-2 md:w-2" />

            {/* Gallery Component */}
            <DomeGallery autoRotateSpeed={0.2} overlayBlurColor="#0a0a0a" />
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute -bottom-4 left-1/2 h-1 w-3/4 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent blur-sm" />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
