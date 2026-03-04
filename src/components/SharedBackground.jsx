"use client";

import React, { useEffect, useState } from "react";

export default function SharedBackground() {
  const [particles, setParticles] = useState([]);

  // Generating particles inside useEffect prevents Next.js hydration errors
  // and ensures our random values apply perfectly on the client screen.
  useEffect(() => {
    const generatedParticles = [...Array(40)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      // Randomize sizes between 2px and 6px so they are easily visible
      size: Math.random() * 4 + 2,
      // Randomize speeds between 6s and 12s
      animationDuration: `${Math.random() * 6 + 6}s`,
      // Randomize start delay so they don't all move at once
      animationDelay: `${Math.random() * 5}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-orange-400/60"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `floatUp ${p.animationDuration} ease-in-out infinite`,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes floatUp {
          0% { 
            transform: translateY(10vh) translateX(0px); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
          }
          50% { 
            /* Noticeable sweeping motion to the right */
            transform: translateY(-50vh) translateX(60px); 
            opacity: 1; 
          }
          80% { 
            opacity: 1; 
          }
          100% { 
            /* Sweeps back to the left as it exits the top of the screen */
            transform: translateY(-120vh) translateX(-40px); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
}