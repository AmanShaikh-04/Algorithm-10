"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const sdgGoals = [
  "1. No Poverty",
  "2. Zero Hunger",
  "3. Good Health",
  "4. Quality Education",
  "5. Gender Equality",
  "6. Clean Water",
  "7. Clean Energy",
  "8. Economic Growth",
  "9. Industry & Innovation",
  "10. Reduced Inequalities",
  "11. Sustainable Cities",
  "12. Responsible Consumption",
  "13. Climate Action",
  "14. Life Below Water",
  "15. Life on Land",
  "16. Peace & Justice",
  "17. Partnerships",
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
    <section
      id="about"
      className="max-h-[740px]:pt-10 max-h-[740px]:pb-2 relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-transparent pt-20 pb-8 max-[380px]:pt-12 max-[380px]:pb-4 md:py-16 lg:block lg:min-h-0 lg:pt-20 lg:pb-16"
    >
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="bg-gradient-radial absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 from-orange-600/20 via-orange-900/10 to-transparent blur-3xl lg:h-[800px] lg:w-[800px]"></div>
        <div className="absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-orange-500/15 blur-[120px] lg:h-[400px] lg:w-[400px]"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-h-[740px]:gap-2 flex w-full flex-col items-center gap-4 max-[380px]:gap-2 md:gap-10 lg:grid lg:grid-cols-[45%_55%] lg:gap-8 xl:grid-cols-[40%_60%]">
          {/* Left Section - Text Content */}
          <div className="z-10 flex w-full flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <div className="relative w-full">
              {/* Sleek left border glow (Desktop only) */}
              <div className="absolute top-0 -left-6 hidden h-full w-1 rounded-full bg-gradient-to-b from-orange-500 via-amber-500 to-transparent opacity-80 blur-[1px] lg:block"></div>

              {/* Status Badge */}
              <div
                className="max-h-[740px]:mb-1 mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 opacity-0 shadow-[0_0_15px_rgba(249,115,22,0.15)] backdrop-blur-sm max-[380px]:mb-2 md:mb-5 lg:mb-3"
                style={{ animation: "fadeIn 0.8s ease-out 0.1s forwards" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                <span className="font-cyber text-[10px] font-bold tracking-widest text-orange-400 uppercase sm:text-xs">
                  Algorithm X Edition
                </span>
              </div>

              {/* Main Heading*/}
              <h2 className="max-h-[740px]:mb-1 max-h-[740px]:text-[24px] mb-3 w-full text-3xl leading-[1.2] font-bold tracking-tight text-white drop-shadow-sm max-[380px]:mb-2 max-[380px]:text-[26px] sm:text-4xl md:mb-5 lg:mb-3 lg:text-5xl lg:leading-[1.15]">
                Innovating for a
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Sustainable Future
                </span>
              </h2>

              {/* Description*/}
              <div className="font-inter max-h-[740px]:gap-1.5 max-h-[740px]:text-[11px] mx-auto flex w-full max-w-md flex-col gap-3 text-[13px] leading-relaxed text-gray-300/90 max-[380px]:gap-2 max-[380px]:text-[12px] sm:max-w-xl sm:text-base md:gap-4 lg:mx-0 lg:gap-2">
                <p
                  className="w-full break-words opacity-0"
                  style={{ animation: "fadeIn 0.8s ease-out 0.3s forwards" }}
                >
                  <strong className="font-semibold text-white">
                    Algorithm X
                  </strong>{" "}
                  is our signature 32-hour hackathon designed to push the
                  boundaries of technology. This edition, we are directly
                  targeting the UN's 17 Sustainable Development Goals,
                  challenging participants to code for humanity.
                </p>

                <p
                  className="w-full break-words opacity-0"
                  style={{ animation: "fadeIn 0.8s ease-out 0.5s forwards" }}
                >
                  Build impactful solutions—from climate action to clean
                  energy—and join a collaborative environment where your code
                  drives measurable, global change.
                </p>
              </div>

              <div
                className="max-h-[740px]:mt-2 mt-6 flex w-full flex-col items-center gap-4 opacity-0 md:mt-6 lg:mt-6 lg:items-start lg:gap-3"
                style={{ animation: "fadeIn 0.8s ease-out 0.7s forwards" }}
              >
                {/* SDG Goal Tracker */}
                <div className="group relative flex h-[48px] w-[95%] max-w-[340px] items-center overflow-hidden rounded-lg border border-orange-500/40 bg-neutral-900/90 shadow-[0_0_15px_rgba(249,115,22,0.15)] backdrop-blur-md sm:h-[44px] lg:h-[48px] lg:w-[380px] lg:max-w-none">
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

                  {/* Shrunk mobile */}
                  <div className="relative flex h-full shrink-0 items-center justify-center border-r border-orange-500/40 bg-orange-500/20 px-2 lg:px-4">
                    <span className="font-cyber text-[10px] font-black tracking-wider text-orange-300 uppercase lg:text-[11px]">
                      SDG GOAL'S
                    </span>
                  </div>

                  {/* Text Container */}
                  <div className="relative flex h-full flex-1 items-center justify-center overflow-hidden px-1 sm:px-4">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={currentSdg}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={`font-inter w-full bg-gradient-to-r from-orange-200 to-amber-400 bg-clip-text text-center leading-tight font-bold whitespace-nowrap text-transparent uppercase ${
                          sdgGoals[currentSdg].length > 21
                            ? "text-[10px] tracking-tighter min-[400px]:text-[11px] sm:text-[12px] sm:tracking-normal lg:text-[13px]"
                            : "text-[12px] tracking-tight min-[400px]:text-[13px] sm:text-[14px] sm:tracking-wide lg:text-[15px]"
                        }`}
                      >
                        {sdgGoals[currentSdg]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="font-cyber group relative flex h-[48px] w-[95%] max-w-[340px] items-center justify-center overflow-hidden rounded-lg border border-orange-500 bg-gradient-to-r from-orange-600 to-orange-700 px-8 text-sm font-bold whitespace-nowrap text-white shadow-[0_0_20px_rgba(255,140,66,0.3)] transition-all hover:scale-105 active:scale-95 sm:h-[46px] sm:w-auto sm:max-w-none lg:h-[48px] lg:w-[380px] lg:min-w-0"
                  onClick={() => (window.location.href = "https://unstop.com")}
                >
                  <div className="absolute inset-0 w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative z-10 tracking-widest">
                    LEARN MORE & REGISTER
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Prize Images */}
          <div className="max-h-[740px]:mt-2 relative mt-8 flex w-full items-center justify-center max-[380px]:mt-4 md:mt-12 lg:mt-0">
            <div className="max-h-[740px]:max-w-[280px] relative flex w-full max-w-[400px] items-center justify-center px-4 max-[380px]:max-w-[320px] sm:max-w-[450px] md:max-w-[650px] lg:max-w-full lg:translate-x-4 lg:scale-[1.0] lg:items-end xl:translate-x-8 xl:scale-[1.05]">
              {/* 2nd Prize */}
              <motion.div
                className="relative z-10 mt-[12%] -mr-[22%] mb-[4%] w-[60%] origin-bottom-right -rotate-[3deg] cursor-pointer md:mt-[6%] md:-mr-[18%] md:w-[45%] md:-rotate-[2deg] lg:mt-0 lg:-mr-[12%] lg:w-[35%] lg:origin-center lg:rotate-0"
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  y: -10,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: false, amount: 0.2 }}
                variants={imageVariants}
              >
                <Image
                  src="/images/2nd.png"
                  alt="2nd Prize"
                  width={400}
                  height={500}
                  className="h-auto w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                />
              </motion.div>

              {/* 1st Prize */}
              <motion.div
                className="relative z-30 w-[65%] cursor-pointer md:w-[50%] lg:w-[45%]"
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: false, amount: 0.2 }}
                variants={imageVariants}
              >
                <Image
                  src="/images/1st.png"
                  alt="1st Prize"
                  width={500}
                  height={600}
                  className="h-auto w-full drop-shadow-[0_20px_50px_rgba(255,140,66,0.4)]"
                />
              </motion.div>

              {/* 3rd Prize */}
              <motion.div
                className="relative z-10 mt-[12%] mb-[5%] -ml-[22%] w-[50%] origin-bottom-left rotate-[8deg] cursor-pointer md:mt-[6%] md:-ml-[18%] md:w-[38%] md:rotate-[6deg] lg:mt-0 lg:-ml-[12%] lg:w-[32%] lg:origin-bottom-left lg:rotate-[7deg]"
                custom={0.6}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  y: -10,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: false, amount: 0.2 }}
                variants={imageVariants}
              >
                <Image
                  src="/images/3rd.png"
                  alt="3rd Prize"
                  width={380}
                  height={480}
                  className="h-auto w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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
