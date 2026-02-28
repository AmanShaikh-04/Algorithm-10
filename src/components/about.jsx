"use client";

import React, { useState, useEffect, useRef } from "react";

function PrizeCard({ rank, amount, subtitle, delay, size = "md" }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    setTilt({ x, y });
  };

  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const rankLabels = { 1: "FIRST", 2: "SECOND", 3: "THIRD" };

  const accentColors = {
    1: {
      glow: "rgba(255, 200, 60, 0.5)",
      border: "rgba(255, 200, 60, 0.4)",
      text: "#FFD700",
      shine: "rgba(255, 215, 0, 0.15)",
    },
    2: {
      glow: "rgba(200, 210, 230, 0.45)",
      border: "rgba(200, 210, 230, 0.35)",
      text: "#C8D2E6",
      shine: "rgba(200, 210, 230, 0.1)",
    },
    3: {
      glow: "rgba(205, 130, 70, 0.45)",
      border: "rgba(205, 130, 70, 0.35)",
      text: "#CD8246",
      shine: "rgba(205, 130, 70, 0.1)",
    },
  };

  const c = accentColors[rank];
  const isLarge = size === "lg";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      className={`prize-card-wrap prize-card-${size}`}
      style={{
        animation: `riseUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
          transition: "transform 0.2s ease-out",
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "20px",
          padding: isLarge ? "36px 28px 32px" : "28px 22px 24px",
          background: "linear-gradient(145deg, rgba(18,18,22,0.95) 0%, rgba(10,10,14,0.98) 100%)",
          border: `1px solid ${c.border}`,
          boxShadow: hovered
            ? `0 30px 60px -10px ${c.glow}, 0 0 0 1px ${c.border}, inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 10px 30px -10px ${c.glow}, 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        {/* Inner glow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "20px",
          background: `radial-gradient(ellipse at 50% 0%, ${c.shine} 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />

        {/* Rank label */}
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.25em",
          color: c.text,
          marginBottom: isLarge ? "20px" : "16px",
          opacity: 0.85,
        }}>
          {rankLabels[rank]} PLACE
        </div>

        {/* Trophy emoji */}
        <div style={{
          fontSize: isLarge ? "56px" : "44px",
          lineHeight: 1,
          marginBottom: isLarge ? "20px" : "16px",
          transform: `translateZ(${hovered ? "40px" : "0px"})`,
          transition: "transform 0.3s ease-out",
          filter: hovered ? "drop-shadow(0 4px 12px rgba(255,255,255,0.2))" : "none",
        }}>
          {medals[rank]}
        </div>

        {/* Amount */}
        <div style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: isLarge ? "2.4rem" : "1.85rem",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginBottom: "8px",
          transform: `translateZ(${hovered ? "25px" : "0px"})`,
          transition: "transform 0.3s ease-out",
          textShadow: `0 0 30px ${c.glow}`,
        }}>
          {amount}
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: "11px",
          color: "rgba(180,180,190,0.6)",
          letterSpacing: "0.05em",
          fontFamily: "'Courier New', monospace",
          lineHeight: 1.5,
        }}>
          {subtitle}
        </div>

        {/* Bottom line */}
        <div style={{
          position: "absolute",
          bottom: 0, left: "20%", right: "20%",
          height: "2px",
          borderRadius: "2px",
          background: `linear-gradient(90deg, transparent, ${c.text}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease, left 0.3s ease, right 0.3s ease",
          ...(hovered ? { left: "10%", right: "10%" } : {}),
        }} />
      </div>
    </div>
  );
}

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      background: "#080808",
      overflow: "hidden",
      fontFamily: "system-ui, sans-serif",
    }}>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Main radial */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px", height: "900px",
          background: "radial-gradient(circle, rgba(255,120,50,0.07) 0%, rgba(255,90,30,0.03) 40%, transparent 70%)",
        }} />
        {/* Side glows */}
        <div style={{
          position: "absolute", top: "20%", right: "-5%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,140,60,0.06) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-5%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,100,30,0.05) 0%, transparent 70%)",
        }} />
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Floating particles */}
      {mounted && [...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? "3px" : "1.5px",
            height: i % 3 === 0 ? "3px" : "1.5px",
            borderRadius: "50%",
            background: `rgba(255, ${120 + (i * 7) % 80}, 40, ${0.2 + (i % 5) * 0.08})`,
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            animation: `drift ${5 + (i % 5) * 2}s ease-in-out infinite alternate`,
            animationDelay: `${(i * 0.4) % 4}s`,
          }}
        />
      ))}

      <div className="about-grid" style={{
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 32px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "center",
        minHeight: "100vh",
      }}>

        {/* LEFT: Text */}
        <div style={{ position: "relative" }}>

          {/* Event badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "100px",
            border: "1px solid rgba(255,140,60,0.3)",
            background: "rgba(255,140,60,0.06)",
            marginBottom: "32px",
            animation: "fadeSlideUp 0.7s ease-out 0.1s both",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF8C3C", boxShadow: "0 0 8px #FF8C3C" }} />
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,140,60,0.9)", fontWeight: 700 }}>
              ALGORITHM X · HACKATHON
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Orbitron', 'Times New Roman', serif",
            fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            marginBottom: "8px",
            animation: "fadeSlideUp 0.8s ease-out 0.2s both",
          }}>
            Innovation
          </h2>
          <h2 style={{
            fontFamily: "'Orbitron', 'Times New Roman', serif",
            fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            background: "linear-gradient(90deg, #FF8C3C, #FFB347, #FF6B35)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "40px",
            animation: "fadeSlideUp 0.8s ease-out 0.3s both",
          }}>
            & Teamwork
          </h2>

          {/* Divider */}
          <div style={{
            width: "48px", height: "2px",
            background: "linear-gradient(90deg, #FF8C3C, transparent)",
            marginBottom: "32px",
            animation: "fadeSlideUp 0.8s ease-out 0.35s both",
          }} />

          {/* Body copy */}
          <p style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(200,200,210,0.7)",
            marginBottom: "20px",
            maxWidth: "480px",
            animation: "fadeSlideUp 0.8s ease-out 0.4s both",
          }}>
            Algorithm X is designed to push the boundaries of what's possible.
            We bring together brilliant minds to tackle complex challenges,
            fostering a collaborative environment where creativity and technical
            expertise converge.
          </p>

          <p style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(200,200,210,0.7)",
            marginBottom: "44px",
            maxWidth: "480px",
            animation: "fadeSlideUp 0.8s ease-out 0.5s both",
          }}>
            Join us to innovate, build, and define the future of technology.
            This is more than a hackathon — it's a crucible for groundbreaking ideas.
          </p>

          {/* CTA */}
          <div style={{ animation: "fadeSlideUp 0.8s ease-out 0.6s both" }}>
            <button
              onClick={() => (window.location.href = "https://unstop.com")}
              style={{
                position: "relative",
                padding: "14px 32px",
                borderRadius: "8px",
                border: "1px solid rgba(255,140,60,0.6)",
                background: "linear-gradient(135deg, rgba(255,100,30,0.15) 0%, rgba(255,140,60,0.08) 100%)",
                color: "#FFFFFF",
                fontSize: "12px",
                fontFamily: "'inter', monospace",
                fontWeight: 700,
                letterSpacing: "0.2em",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: "0 4px 20px rgba(255,120,40,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,100,30,0.3) 0%, rgba(255,140,60,0.2) 100%)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,120,40,0.35), inset 0 1px 0 rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.borderColor = "rgba(255,140,60,0.9)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,100,30,0.15) 0%, rgba(255,140,60,0.08) 100%)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,120,40,0.15), inset 0 1px 0 rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,140,60,0.6)";
              }}
            >
              LEARN MORE & REGISTER →
            </button>
          </div>

          {/* Stats row */}
          <div className="stats-row" style={{
            display: "flex",
            gap: "32px",
            marginTop: "56px",
            animation: "fadeSlideUp 0.8s ease-out 0.7s both",
            flexWrap: "wrap",
          }}>
            {[["₹50K+", "Total Prize Pool"], ["48H", "Hack Duration"], ["∞", "Ideas Welcome"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: "1.5rem", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{val}</div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Prize Cards */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>

          {/* Section label */}
          <div style={{
            fontFamily: "'inter', monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "32px",
            animation: "fadeSlideUp 0.7s ease-out 0.2s both",
          }}>
            PRIZE DISTRIBUTION
          </div>

          {/* 1st Place - centered, larger */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <PrizeCard rank={1} amount="₹25,000" subtitle="+ mentorship & premium tech gear" delay={0.3} size="lg" />
          </div>

          {/* 2nd & 3rd - side by side */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <PrizeCard rank={2} amount="₹15,000" subtitle="+ exclusive tech swag" delay={0.5} size="md" />
            <PrizeCard rank={3} amount="₹10,000" subtitle="+ recognition & perks" delay={0.65} size="md" />
          </div>

          {/* Total pool callout */}
          <div style={{
            marginTop: "28px",
            padding: "12px 28px",
            borderRadius: "100px",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.025)",
            animation: "fadeSlideUp 0.8s ease-out 0.8s both",
          }}>
            <span style={{ fontFamily: "'inter', monospace", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>
              TOTAL POOL:{" "}
            </span>
            <span style={{ fontFamily: "'Georgia', serif", fontSize: "13px", color: "rgba(255,200,80,0.85)", fontWeight: 700 }}>
              ₹50,000
            </span>
          </div>
        </div>
      </div>

      {/* Responsive styles + keyframes */}
      <style>{`
        @keyframes riseUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(8px, -14px); }
        }

        /* Prize card sizing */
        .prize-card-lg > div { width: 260px; }
        .prize-card-md > div { width: 200px; }

        /* Tablet */
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            padding: 60px 28px !important;
            gap: 40px !important;
            min-height: unset !important;
          }
          .prize-card-lg > div { width: 240px; }
          .prize-card-md > div { width: 180px; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .about-grid {
            padding: 48px 20px 60px !important;
            gap: 36px !important;
          }

          /* Prize card sizes shrink on mobile */
          .prize-card-lg > div {
            width: 100% !important;
            max-width: 300px;
            padding: 28px 24px 24px !important;
          }
          .prize-card-md > div {
            width: 100% !important;
            padding: 22px 18px 20px !important;
          }

          /* Wrap the two smaller cards differently */
          .prize-cards-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 14px !important;
          }
          .prize-card-md {
            width: 100% !important;
            max-width: 300px !important;
          }
          .prize-card-md > div {
            width: 100% !important;
          }

          .stats-row {
            gap: 24px !important;
            margin-top: 40px !important;
          }
        }

        /* Very small phones */
        @media (max-width: 380px) {
          .prize-card-lg > div { padding: 22px 18px 20px !important; }
        }
      `}</style>
    </section>
  );
}