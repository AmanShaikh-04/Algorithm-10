"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const sdgGoals = [
  "1. No Poverty", "2. Zero Hunger", "3. Good Health", "4. Quality Education",
  "5. Gender Equality", "6. Clean Water", "7. Clean Energy", "8. Economic Growth",
  "9. Industry & Innovation", "10. Reduced Inequalities", "11. Sustainable Cities",
  "12. Responsible Consumption", "13. Climate Action", "14. Life Below Water",
  "15. Life on Land", "16. Peace & Justice", "17. Partnerships"
];

export default function About() {
  const [currentSdg, setCurrentSdg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSdg((prev) => (prev + 1) % sdgGoals.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const imageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section id="about" className="relative w-full overflow-hidden bg-transparent min-h-[100dvh] flex flex-col justify-center lg:min-h-0 lg:block pt-20 pb-8 max-[380px]:pt-12 max-[380px]:pb-4 max-h-[740px]:pt-10 max-h-[740px]:pb-2 md:py-16 lg:pt-20 lg:pb-16">
      
      {/* Background gradient glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="bg-gradient-radial absolute top-1/2 left-1/2 h-[600px] w-[600px] lg:h-[800px] lg:w-[800px] -translate-x-1/2 -translate-y-1/2 from-orange-600/20 via-orange-900/10 to-transparent blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] rounded-full bg-orange-500/15 blur-[120px]"></div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] xl:grid-cols-[40%_60%] items-center gap-4 max-[380px]:gap-2 max-h-[740px]:gap-2 md:gap-10 lg:gap-8 w-full">
          
          {/* Left Section - Text Content */}
          <div className="z-10 flex w-full flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <div className="relative w-full">
              {/* Sleek left border glow (Desktop only) */}
              <div className="absolute -left-6 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-orange-500 via-amber-500 to-transparent opacity-80 lg:block blur-[1px]"></div>

              {/* Status Badge */}
              <div 
                className="mb-3 max-[380px]:mb-2 max-h-[740px]:mb-1 md:mb-5 lg:mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 opacity-0 backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                style={{ animation: "fadeIn 0.8s ease-out 0.1s forwards" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                <span className="font-cyber text-[10px] sm:text-xs font-bold tracking-widest text-orange-400 uppercase">
                  Algorithm X Edition
                </span>
              </div>

              {/* Main Heading*/}
              <h2 className="mb-3 max-[380px]:mb-2 max-h-[740px]:mb-1 md:mb-5 lg:mb-3 text-3xl max-[380px]:text-[26px] max-h-[740px]:text-[24px] sm:text-4xl lg:text-5xl leading-[1.2] lg:leading-[1.15] font-bold tracking-tight text-white drop-shadow-sm w-full">
                Innovating for a
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Sustainable Future
                </span>
              </h2>

              {/* Description*/}
              <div className="font-inter flex flex-col w-full gap-3 max-[380px]:gap-2 max-h-[740px]:gap-1.5 md:gap-4 lg:gap-2 text-[13px] max-[380px]:text-[12px] max-h-[740px]:text-[11px] sm:text-base leading-relaxed text-gray-300/90 max-w-md sm:max-w-xl mx-auto lg:mx-0">
                <p className="opacity-0 break-words w-full" style={{ animation: "fadeIn 0.8s ease-out 0.3s forwards" }}>
                  <strong className="font-semibold text-white">Algorithm X</strong> is our signature 32-hour hackathon designed to push the boundaries of technology. 
                  This edition, we are directly targeting the UN's 17 Sustainable Development Goals, 
                  challenging participants to code for humanity.
                </p>

                <p className="opacity-0 break-words w-full" style={{ animation: "fadeIn 0.8s ease-out 0.5s forwards" }}>
                  Build impactful solutions—from climate action to clean energy—and join a collaborative 
                  environment where your code drives measurable, global change.
                </p>
              </div>

              <div 
  className="mt-6 max-h-[740px]:mt-2 md:mt-6 lg:mt-6 flex flex-col items-center lg:items-start gap-4 lg:gap-3 w-full opacity-0"
  style={{ animation: "fadeIn 0.8s ease-out 0.7s forwards" }}
>
  {/* SDG Goal Tracker */}
<div className="group relative w-[95%] max-w-[340px] lg:max-w-none lg:w-[380px] h-[48px] sm:h-[44px] lg:h-[48px] flex items-center overflow-hidden rounded-lg border border-orange-500/40 bg-neutral-900/90 shadow-[0_0_15px_rgba(249,115,22,0.15)] backdrop-blur-md">
  <div className="absolute inset-0 w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
  
  {/* Shrunk mobile */}
  <div className="relative flex h-full shrink-0 items-center justify-center border-r border-orange-500/40 bg-orange-500/20 px-2 lg:px-4">
    <span className="font-cyber font-black text-[10px] lg:text-[11px] tracking-wider text-orange-300 uppercase">
      SDG GOAL'S
    </span>
  </div>

  {/* Text Container */}
<div className="relative flex h-full flex-1 items-center justify-center px-1 sm:px-4 overflow-hidden">
  <AnimatePresence mode="popLayout">
    <motion.div
      key={currentSdg}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`font-inter w-full text-center leading-tight bg-gradient-to-r from-orange-200 to-amber-400 bg-clip-text font-bold text-transparent uppercase whitespace-nowrap ${
        sdgGoals[currentSdg].length > 21
          ? "text-[10px] min-[400px]:text-[11px] sm:text-[12px] lg:text-[13px] tracking-tighter sm:tracking-normal" 
          : "text-[12px] min-[400px]:text-[13px] sm:text-[14px] lg:text-[15px] tracking-tight sm:tracking-wide"
      }`}
    >
      {sdgGoals[currentSdg]}
    </motion.div>
  </AnimatePresence>
</div>
</div>

  {/* Action Button */}
  <button
    className="font-cyber group relative w-[95%] max-w-[340px] sm:max-w-none sm:w-auto lg:w-[380px] lg:min-w-0 h-[48px] sm:h-[46px] lg:h-[48px] overflow-hidden rounded-lg border border-orange-500 bg-gradient-to-r from-orange-600 to-orange-700 px-8 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,140,66,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center whitespace-nowrap"
    onClick={() => (window.location.href = "https://unstop.com")}
  >
    <div className="absolute inset-0 w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
    <span className="relative z-10 tracking-widest">LEARN MORE & REGISTER</span>
  </button>
</div>
            </div>
          </div>

          {/* Right Section - Prize Images */}
          <div className="relative flex w-full items-center justify-center mt-8 max-[380px]:mt-4 max-h-[740px]:mt-2 md:mt-12 lg:mt-0">
            <div className="relative flex w-full max-w-[400px] max-[380px]:max-w-[320px] max-h-[740px]:max-w-[280px] sm:max-w-[450px] md:max-w-[650px] lg:max-w-full items-center lg:items-end justify-center px-4 lg:scale-[1.0] xl:scale-[1.05] lg:translate-x-4 xl:translate-x-8">
              
              {/* 2nd Prize */}
              <motion.div 
                className="relative z-10 w-[60%] md:w-[45%] lg:w-[35%] -mr-[22%] md:-mr-[18%] lg:-mr-[12%] mt-[12%] md:mt-[6%] lg:mt-0 mb-[4%] cursor-pointer origin-bottom-right lg:origin-center -rotate-[3deg] md:-rotate-[2deg] lg:rotate-0"
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -10, scale: 0.95, transition: { duration: 0.2 } }}
                viewport={{ once: false, amount: 0.2 }}
                variants={imageVariants}
              >
                <Image 
                  src="/images/2nd.png" 
                  alt="2nd Prize" 
                  width={400} 
                  height={500} 
                  className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                />
              </motion.div>

              {/* 1st Prize */}
              <motion.div 
                className="relative z-30 w-[65%] md:w-[50%] lg:w-[45%] cursor-pointer"
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -15, scale: 1.05, transition: { duration: 0.2 } }}
                viewport={{ once: false, amount: 0.2 }}
                variants={imageVariants}
              >
                <Image 
                  src="/images/1st.png" 
                  alt="1st Prize" 
                  width={500} 
                  height={600} 
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(255,140,66,0.4)]"
                />
              </motion.div>

              {/* 3rd Prize */}
              <motion.div 
                className="relative z-10 w-[50%] md:w-[38%] lg:w-[32%] -ml-[22%] md:-ml-[18%] lg:-ml-[12%] mt-[12%] md:mt-[6%] lg:mt-0 mb-[5%] cursor-pointer origin-bottom-left lg:origin-bottom-left rotate-[8deg] md:rotate-[6deg] lg:rotate-[7deg]"
                custom={0.6}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -10, scale: 0.95, transition: { duration: 0.2 } }}
                viewport={{ once: false, amount: 0.2 }}
                variants={imageVariants}
              >
                <Image 
                  src="/images/3rd.png" 
                  alt="3rd Prize" 
                  width={380} 
                  height={480} 
                  className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                />
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}