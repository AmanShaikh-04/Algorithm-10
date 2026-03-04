"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const totalFrames = 192;
const images = Array.from({ length: totalFrames }, (_, i) => {
  const frameNumber = i.toString().padStart(3, "0");
  return `/herosection/frame_${frameNumber}_delay-0.041s.webp`;
});

export default function HeroBG() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.8, // Smooth crossfade
            ease: "linear" 
          }}
          className="h-full w-full object-cover"
          alt="Background Animation Frame"
        />
      </AnimatePresence>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}