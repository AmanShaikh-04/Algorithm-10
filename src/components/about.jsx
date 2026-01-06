"use client";

import React, { useState } from "react";

function Card3D({ position, prize, prizeAmount, subtitle, icon, delay }) {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const scaleMap = {
    center: "lg:scale-100",
    left: "lg:scale-90",
    right: "lg:scale-90",
  };

  const zIndexMap = {
    center: "z-30",
    left: "z-20",
    right: "z-20",
  };

  return (
    <div
      className={`relative ${scaleMap[position]} ${zIndexMap[position]} transition-all duration-300`}
      style={{
        animation: `fadeInUp 0.8s ease-out ${delay}s both`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="relative w-full max-w-[280px] sm:max-w-sm h-80 sm:h-82 cursor-pointer mx-auto"
        style={{
          perspective: "1000px",
          transform: `scale(${isHovered ? 1.05 : 1})`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div
          className="relative w-full h-full rounded-2xl transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          }}
        >
          {/* Card background with glass effect */}
          <div
            className="absolute inset-0 rounded-2xl border border-orange-500/30 overflow-hidden"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(10px)",
              boxShadow: isHovered
                ? "0 25px 50px -12px rgba(255, 140, 66, 0.5), 0 0 40px rgba(255, 140, 66, 0.3)"
                : "0 10px 30px -5px rgba(255, 140, 66, 0.3)",
              transition: "box-shadow 0.3s ease-out",
            }}
          >
            {/* Animated gradient background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, rgba(255, 140, 66, 0.2) 0%, rgba(255, 107, 53, 0.1) 50%, transparent 100%)`,
                animation: "gradientShift 3s ease infinite",
              }}
            />

            {/* Glow effect on hover */}
            {isHovered && (
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 140, 66, 0.2) 0%, transparent 70%)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="relative w-full h-full p-6 sm:p-8 flex flex-col items-center justify-between z-10">
            {/* Icon container */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255, 140, 66, 0.3) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="relative w-full h-full"
                style={{
                  transform: `translateZ(${isHovered ? "50px" : "20px"})`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {icon}
              </div>
            </div>

            {/* Prize text */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div
                className="text-orange-400 font-bold text-xs sm:text-sm tracking-widest"
                style={{
                  transform: `translateZ(${isHovered ? "30px" : "10px"})`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {prize}
              </div>

              <div
                className="text-white font-bold text-3xl sm:text-4xl tracking-tight"
                style={{
                  transform: `translateZ(${isHovered ? "40px" : "20px"})`,
                  transition: "transform 0.3s ease-out",
                  textShadow: "0 0 20px rgba(255, 140, 66, 0.5)",
                }}
              >
                {prizeAmount}
              </div>

              <div
                className="text-gray-400 text-xs sm:text-sm px-2"
                style={{
                  transform: `translateZ(${isHovered ? "20px" : "5px"})`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {subtitle}
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="w-full h-1 rounded-full mt-4"
              style={{
                background: "linear-gradient(90deg, transparent, #FF8C42, transparent)",
                transform: `translateZ(${isHovered ? "25px" : "10px"}) scaleX(${isHovered ? 1 : 0.7})`,
                transition: "all 0.3s ease-out",
              }}
            />
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-orange-500/50 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-orange-500/50 rounded-br-2xl" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

export default function About() {
  return (
    <section className="relative min-h-screen bg-neutral-950 overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-600/30 via-orange-900/10 to-transparent blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[100px]"></div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 3}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Left side decorative icons - REPOSITIONED */}
      <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 space-y-16 z-10">
        {[
          // Trophy Icon 1
          <svg key="1" className="w-14 h-14 text-orange-500/50 hover:text-orange-400/70 transition-all duration-300 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v6m0 0H9m3 0h3M3 9h3m12 0h3M6 9V6.5A2.5 2.5 0 018.5 4h7A2.5 2.5 0 0118 6.5V9M6 9a6 6 0 1012 0"/>
          </svg>,
          // Trophy Icon 2
          <svg key="2" className="w-14 h-14 text-orange-500/50 hover:text-orange-400/70 transition-all duration-300 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v6m0 0H9m3 0h3M3 9h3m12 0h3M6 9V6.5A2.5 2.5 0 018.5 4h7A2.5 2.5 0 0118 6.5V9M6 9a6 6 0 1012 0"/>
          </svg>,
          // Trophy Icon 3
          <svg key="3" className="w-14 h-14 text-orange-500/50 hover:text-orange-400/70 transition-all duration-300 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v6m0 0H9m3 0h3M3 9h3m12 0h3M6 9V6.5A2.5 2.5 0 018.5 4h7A2.5 2.5 0 0118 6.5V9M6 9a6 6 0 1012 0"/>
          </svg>,
        ].map((icon, i) => (
          <div
            key={i}
            className="opacity-0 transition-transform duration-300"
            style={{
              animation: `slideInLeft 0.8s ease-out ${i * 0.2}s forwards`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-6 sm:space-y-8 z-10">
            <div className="lg:pl-8 lg:border-l-4 border-orange-500/50">
              {/* Title with decorative shape */}
              <div className="relative inline-block mb-6">
                {/* Decorative background shape */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-lg blur-xl"></div>
                <div className="absolute -inset-2 border border-orange-500/20 rounded-lg"></div>
                
                <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-wide leading-tight bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  INNOVATION AND<br />TEAMWORK
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p className="opacity-0" style={{ animation: "fadeIn 0.8s ease-out 0.3s forwards" }}>
                  Algorithm X is designed to push the boundaries of what's possible. We bring together brilliant minds to tackle complex challenges, fostering a collaborative environment where creativity and technical expertise converge.
                </p>

                <p className="opacity-0" style={{ animation: "fadeIn 0.8s ease-out 0.5s forwards" }}>
                  Join us to innovate, build, and define the future of technology through intense competition and shared passion. This is more than a hackathon; it's a crucible for groundbreaking ideas.
                </p>

                <button 
                  className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-sm sm:text-base font-semibold rounded-lg border border-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all shadow-[0_0_20px_rgba(255,140,66,0.3)] hover:shadow-[0_0_30px_rgba(255,140,66,0.5)] hover:scale-105 active:scale-95 opacity-0"
                  style={{ animation: "fadeIn 0.8s ease-out 0.7s forwards" }}
                onClick={() => window.location.href= 'https://unstop.com'}>
                  LEARN MORE & REGISTER
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - 3D Prize Cards */}
          <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
            {/* All screens - stacked layout */}
            <div className="flex flex-col items-center gap-6 sm:gap-8 w-full px-4 max-w-md mx-auto">
              {/* 1st Prize - Top */}
              <Card3D
                position="center"
                prize="1ST PRIZE"
                prizeAmount="₹25,000"
                subtitle="plus mentorship and tech gear"
                icon={
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    {/* Trophy base */}
                    <rect x="40" y="75" width="20" height="8" rx="2" fill="url(#gold1)" />
                    <rect x="35" y="70" width="30" height="5" rx="2" fill="url(#gold2)" />
                    {/* Trophy stem */}
                    <rect x="45" y="55" width="10" height="15" fill="url(#gold3)" />
                    {/* Trophy cup */}
                    <path d="M30 25 L30 35 Q30 50 40 52 L40 55 L60 55 L60 52 Q70 50 70 35 L70 25 Z" fill="url(#gold4)" stroke="#FFA500" strokeWidth="1.5"/>
                    {/* Handles */}
                    <path d="M28 30 Q20 30 20 40 Q20 48 28 48" stroke="url(#gold5)" strokeWidth="3" fill="none"/>
                    <path d="M72 30 Q80 30 80 40 Q80 48 72 48" stroke="url(#gold5)" strokeWidth="3" fill="none"/>
                    {/* Star decoration */}
                    <path d="M50 32 L52 38 L58 38 L53 42 L55 48 L50 44 L45 48 L47 42 L42 38 L48 38 Z" fill="#FFF" opacity="0.9"/>
                    {/* Shine effect */}
                    <ellipse cx="45" cy="35" rx="8" ry="12" fill="#FFF" opacity="0.3"/>
                    {/* Glow */}
                    <circle cx="50" cy="45" r="40" fill="url(#glow1)" opacity="0.3" />
                    <defs>
                      <linearGradient id="gold1" x1="50" y1="75" x2="50" y2="83">
                        <stop offset="0%" stopColor="#B8860B" />
                        <stop offset="100%" stopColor="#8B6914" />
                      </linearGradient>
                      <linearGradient id="gold2" x1="50" y1="70" x2="50" y2="75">
                        <stop offset="0%" stopColor="#DAA520" />
                        <stop offset="100%" stopColor="#B8860B" />
                      </linearGradient>
                      <linearGradient id="gold3" x1="50" y1="55" x2="50" y2="70">
                        <stop offset="0%" stopColor="#DAA520" />
                        <stop offset="100%" stopColor="#B8860B" />
                      </linearGradient>
                      <linearGradient id="gold4" x1="50" y1="25" x2="50" y2="55">
                        <stop offset="0%" stopColor="#FFE55C" />
                        <stop offset="30%" stopColor="#FFD700" />
                        <stop offset="70%" stopColor="#DAA520" />
                        <stop offset="100%" stopColor="#B8860B" />
                      </linearGradient>
                      <linearGradient id="gold5" x1="0" y1="40" x2="100" y2="40">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#FFA500" />
                        <stop offset="100%" stopColor="#FFD700" />
                      </linearGradient>
                      <radialGradient id="glow1">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                }
                delay={0.2}
              />

              <div className="flex gap-4 sm:gap-6">
                {/* 2nd Prize */}
                <Card3D
                  position="center"
                  prize="2ND PRIZE"
                  prizeAmount="₹15,000"
                  subtitle="exclusive tech swags"
                  icon={
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                      {/* Trophy base */}
                      <rect x="40" y="75" width="20" height="8" rx="2" fill="url(#silver1)" />
                      <rect x="35" y="70" width="30" height="5" rx="2" fill="url(#silver2)" />
                      {/* Trophy stem */}
                      <rect x="45" y="55" width="10" height="15" fill="url(#silver3)" />
                      {/* Trophy cup */}
                      <path d="M30 25 L30 35 Q30 50 40 52 L40 55 L60 55 L60 52 Q70 50 70 35 L70 25 Z" fill="url(#silver4)" stroke="#A8A8A8" strokeWidth="1.5"/>
                      {/* Handles */}
                      <path d="M28 30 Q20 30 20 40 Q20 48 28 48" stroke="url(#silver5)" strokeWidth="3" fill="none"/>
                      <path d="M72 30 Q80 30 80 40 Q80 48 72 48" stroke="url(#silver5)" strokeWidth="3" fill="none"/>
                      {/* Number 2 */}
                      <text x="50" y="48" textAnchor="middle" fill="#FFF" fontSize="22" fontWeight="bold" fontFamily="Arial">2</text>
                      {/* Shine effect */}
                      <ellipse cx="45" cy="35" rx="8" ry="12" fill="#FFF" opacity="0.4"/>
                      {/* Glow */}
                      <circle cx="50" cy="45" r="40" fill="url(#glowSilver)" opacity="0.2" />
                      <defs>
                        <linearGradient id="silver1" x1="50" y1="75" x2="50" y2="83">
                          <stop offset="0%" stopColor="#A8A8A8" />
                          <stop offset="100%" stopColor="#808080" />
                        </linearGradient>
                        <linearGradient id="silver2" x1="50" y1="70" x2="50" y2="75">
                          <stop offset="0%" stopColor="#C0C0C0" />
                          <stop offset="100%" stopColor="#A8A8A8" />
                        </linearGradient>
                        <linearGradient id="silver3" x1="50" y1="55" x2="50" y2="70">
                          <stop offset="0%" stopColor="#C0C0C0" />
                          <stop offset="100%" stopColor="#A8A8A8" />
                        </linearGradient>
                        <linearGradient id="silver4" x1="50" y1="25" x2="50" y2="55">
                          <stop offset="0%" stopColor="#F0F0F0" />
                          <stop offset="30%" stopColor="#E8E8E8" />
                          <stop offset="70%" stopColor="#C0C0C0" />
                          <stop offset="100%" stopColor="#A8A8A8" />
                        </linearGradient>
                        <linearGradient id="silver5" x1="0" y1="40" x2="100" y2="40">
                          <stop offset="0%" stopColor="#E8E8E8" />
                          <stop offset="50%" stopColor="#C0C0C0" />
                          <stop offset="100%" stopColor="#E8E8E8" />
                        </linearGradient>
                        <radialGradient id="glowSilver">
                          <stop offset="0%" stopColor="#E8E8E8" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#E8E8E8" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  }
                  delay={0.5}
                />

                {/* 3rd Prize */}
                <Card3D
                  position="center"
                  prize="3RD PRIZE"
                  prizeAmount="₹10,000"
                  subtitle="and recognition"
                  icon={
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                      {/* Trophy base */}
                      <rect x="40" y="75" width="20" height="8" rx="2" fill="url(#bronze1)" />
                      <rect x="35" y="70" width="30" height="5" rx="2" fill="url(#bronze2)" />
                      {/* Trophy stem */}
                      <rect x="45" y="55" width="10" height="15" fill="url(#bronze3)" />
                      {/* Trophy cup */}
                      <path d="M30 25 L30 35 Q30 50 40 52 L40 55 L60 55 L60 52 Q70 50 70 35 L70 25 Z" fill="url(#bronze4)" stroke="#8B4513" strokeWidth="1.5"/>
                      {/* Handles */}
                      <path d="M28 30 Q20 30 20 40 Q20 48 28 48" stroke="url(#bronze5)" strokeWidth="3" fill="none"/>
                      <path d="M72 30 Q80 30 80 40 Q80 48 72 48" stroke="url(#bronze5)" strokeWidth="3" fill="none"/>
                      {/* Number 3 */}
                      <text x="50" y="48" textAnchor="middle" fill="#FFF" fontSize="22" fontWeight="bold" fontFamily="Arial">3</text>
                      {/* Shine effect */}
                      <ellipse cx="45" cy="35" rx="8" ry="12" fill="#FFF" opacity="0.3"/>
                      {/* Glow */}
                      <circle cx="50" cy="45" r="40" fill="url(#glowBronze)" opacity="0.2" />
                      <defs>
                        <linearGradient id="bronze1" x1="50" y1="75" x2="50" y2="83">
                          <stop offset="0%" stopColor="#8B4513" />
                          <stop offset="100%" stopColor="#654321" />
                        </linearGradient>
                        <linearGradient id="bronze2" x1="50" y1="70" x2="50" y2="75">
                          <stop offset="0%" stopColor="#CD7F32" />
                          <stop offset="100%" stopColor="#8B4513" />
                        </linearGradient>
                        <linearGradient id="bronze3" x1="50" y1="55" x2="50" y2="70">
                          <stop offset="0%" stopColor="#CD7F32" />
                          <stop offset="100%" stopColor="#8B4513" />
                        </linearGradient>
                        <linearGradient id="bronze4" x1="50" y1="25" x2="50" y2="55">
                          <stop offset="0%" stopColor="#E39B5C" />
                          <stop offset="30%" stopColor="#CD7F32" />
                          <stop offset="70%" stopColor="#B87333" />
                          <stop offset="100%" stopColor="#8B4513" />
                        </linearGradient>
                        <linearGradient id="bronze5" x1="0" y1="40" x2="100" y2="40">
                          <stop offset="0%" stopColor="#CD7F32" />
                          <stop offset="50%" stopColor="#B87333" />
                          <stop offset="100%" stopColor="#CD7F32" />
                        </linearGradient>
                        <radialGradient id="glowBronze">
                          <stop offset="0%" stopColor="#CD7F32" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#CD7F32" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  }
                  delay={0.8}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M200 200L200 100C200 100 150 150 100 200L200 200Z" fill="url(#corner-gradient)" />
          <defs>
            <linearGradient id="corner-gradient" x1="100" y1="100" x2="200" y2="200">
              <stop offset="0%" stopColor="#FF8C42" stopOpacity="0" />
              <stop offset="100%" stopColor="#FF8C42" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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