import DomeGallery from './Domegallery'

import React from 'react'

const Gallery = () => {
  return (
    <>
      {/* Ambient Background Effects */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
  </div>

  <div className="container mx-auto px-4 relative z-10">
    {/* Section Header */}
    <div className="mb-12 text-center transform transition-all duration-1000 hover:scale-105">
      {/* Decorative Line Above */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <div className="mx-4 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>

      {/* Main Heading with Gradient and Glow */}
      <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient relative inline-block">
        Gallery
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 blur-2xl opacity-30 -z-10" />
      </h2>
      
      {/* Subtitle with Enhanced Styling */}
      <p className="mx-auto max-w-2xl text-lg text-gray-400 leading-relaxed">
        Explore our immersive visual journey through innovation and creativity
      </p>

      {/* Decorative Line Below */}
      <div className="flex items-center justify-center mt-6">
        <div className="h-px w-24 bg-gradient-to-r from-orange-500/50 to-transparent" />
        <div className="mx-3 h-1 w-1 rounded-full bg-amber-500" />
        <div className="h-px w-24 bg-gradient-to-l from-amber-500/50 to-transparent" />
      </div>
    </div>

    {/* Gallery Dome Container with Enhanced Box */}
    <div className="relative group">
      {/* Outer Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
      
      {/* Main Gallery Box */}
      <div className="relative h-[60vh] max-h-[800px] w-full overflow-hidden rounded-2xl md:h-[80vh] bg-neutral-900/50 backdrop-blur-sm border border-orange-500/20 shadow-2xl">
        {/* Inner Glow Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 pointer-events-none" />
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-orange-500/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-amber-500/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-orange-500/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-500/50 rounded-br-2xl" />
        
        {/* Animated Corner Dots */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-200" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-orange-500 animate-pulse delay-400" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-600" />
        
        {/* Gallery Component */}
        <DomeGallery
          autoRotateSpeed={0.2}
          overlayBlurColor="neutral-950"
        />
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent rounded-full blur-sm" />
    </div>
  </div>

  <style jsx>{`
    @keyframes gradient {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }
    .delay-200 { animation-delay: 200ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-600 { animation-delay: 600ms; }
    .delay-1000 { animation-delay: 1000ms; }
  `}</style>
  </>
  )
}

export default Gallery