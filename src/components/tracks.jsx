"use client";

import { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');


  @keyframes lockFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes psIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.7; transform: scale(1.08); }
  }
  @keyframes glitch {
    0%, 88%, 100% { clip-path: none; transform: none; }
    90% { clip-path: polygon(0 18%, 100% 18%, 100% 28%, 0 28%); transform: translate(-3px, 0); }
    92% { clip-path: polygon(0 62%, 100% 62%, 100% 72%, 0 72%); transform: translate(3px, 0); }
    94% { clip-path: none; transform: none; }
  }

  .glitch-text { animation: glitch 6s infinite; position: relative; display: inline-block; }
  .glitch-text::before, .glitch-text::after {
    content: attr(data-text);
    position: absolute; inset: 0; font: inherit;
  }
  .glitch-text::before {
    color: #f59e0b;
    animation: glitch 6s 0.04s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
    opacity: 0;
  }
  .glitch-text::after {
    color: #ea580c;
    animation: glitch 6s 0.08s infinite;
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
    opacity: 0;
  }

  .domain-card-wrapper {
    animation: fadeUp 0.6s ease both;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .domain-card-wrapper:hover { transform: translateY(-10px) scale(1.03); }

  .lock-icon {
    filter: drop-shadow(0 0 10px rgba(251,191,36,0.35));
    animation: lockFloat 3s ease-in-out infinite;
    transition: filter 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  .domain-card-wrapper:hover .lock-icon {
    filter: drop-shadow(0 0 24px rgba(251,191,36,0.9));
    transform: scale(1.18) translateY(-4px);
    animation: none;
  }

  .reveal-text {
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.3s ease 0.1s;
    font-family: 'inter', monospace;
    color: #fbbf24;
  }
  .domain-card-wrapper:hover .reveal-text {
    opacity: 0.7;
    transform: translateY(0);
  }

  .domain-number-bg {
    font-size: 80px;
    font-weight: 800;
    font-family: 'Syne', sans-serif;
    opacity: 0.04;
    position: absolute;
    bottom: 10px; right: 16px;
    line-height: 1;
    pointer-events: none;
    user-select: none;
    color: #fbbf24;
  }

  /* Modal */
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: backdropIn 0.25s ease;
  }
  .modal-box {
    background: #111110;
    border: 1px solid #2a2520;
    border-radius: 22px;
    width: 100%; max-width: 540px;
    overflow: hidden;
    animation: modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
    font-family: 'Syne', sans-serif;
    box-shadow: 0 0 0 1px rgba(251,191,36,0.06), 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(234,88,12,0.08);
  }
  .modal-accent-bar {
    height: 2px; width: 100%;
    background: linear-gradient(90deg, transparent, #f59e0b, #ea580c, transparent);
  }
  .modal-header {
    padding: 26px 32px 20px;
    border-bottom: 1px solid #1e1b16;
    display: flex; align-items: flex-start;
    justify-content: space-between; gap: 16px;
  }
  .modal-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px 10px; border-radius: 99px;
    font-size: 10px; font-family: 'inter', monospace;
    letter-spacing: 0.14em; text-transform: uppercase;
    background: rgba(245,158,11,0.1); color: #fbbf24;
    margin-bottom: 8px;
  }
  .modal-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }
  .modal-title { font-size: 26px; font-weight: 800; color: white; line-height: 1.1; }
  .modal-close {
    background: #1a1814; border: 1px solid #2a2520;
    color: #52525b; width: 36px; height: 36px;
    border-radius: 10px; cursor: pointer; font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.2s ease;
  }
  .modal-close:hover {
    background: #2a2520; color: #fbbf24;
    transform: rotate(90deg); border-color: #3a3020;
  }
  .modal-body {
    padding: 22px 32px 32px;
    max-height: 58vh; overflow-y: auto;
  }
  .modal-body::-webkit-scrollbar { width: 3px; }
  .modal-body::-webkit-scrollbar-track { background: transparent; }
  .modal-body::-webkit-scrollbar-thumb { background: #2a2520; border-radius: 4px; }

  .ps-section-label {
    font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
    font-family: 'inter', monospace; opacity: 0.35; color: #fbbf24; margin-bottom: 16px;
  }
  .ps-item {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 15px 0; border-bottom: 1px solid #1a1714;
    animation: psIn 0.4s ease both;
  }
  .ps-item:last-child { border-bottom: none; }
  .ps-num {
    font-size: 10px; font-family: 'inter', monospace;
    opacity: 0.22; flex-shrink: 0; margin-top: 3px; width: 20px; color: #fbbf24;
  }
  .ps-text {
    font-size: 14px; color: rgba(255,255,255,0.65);
    line-height: 1.7; font-family: 'inter', monospace; font-weight: 300;
  }
`;

function GridBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* Center golden glow blob */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(234,88,12,0.12) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)",
        borderRadius: "50%",
        animation: "pulseGlow 6s ease-in-out infinite",
      }} />



      {/* Corner brackets */}
      {[
        { top: 24, left: 24, borderTop: true, borderLeft: true },
        { top: 24, right: 24, borderTop: true, borderRight: true },
        { bottom: 24, left: 24, borderBottom: true, borderLeft: true },
        { bottom: 24, right: 24, borderBottom: true, borderRight: true },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          top: c.top, bottom: c.bottom, left: c.left, right: c.right,
          width: 28, height: 28,
          borderTop: c.borderTop ? "1px solid rgba(251,191,36,0.2)" : "none",
          borderBottom: c.borderBottom ? "1px solid rgba(251,191,36,0.2)" : "none",
          borderLeft: c.borderLeft ? "1px solid rgba(251,191,36,0.2)" : "none",
          borderRight: c.borderRight ? "1px solid rgba(251,191,36,0.2)" : "none",
        }} />
      ))}
    </div>
  );
}

function TechDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", maxWidth: 560, margin: "0 auto" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4))" }} />
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <div style={{ width: 3, height: 3, background: "#f59e0b", opacity: 0.4, transform: "rotate(45deg)" }} />
        <div style={{ width: 6, height: 6, border: "1px solid #f59e0b", opacity: 0.5, transform: "rotate(45deg)" }} />
        <div style={{ width: 8, height: 8, border: "1px solid #ea580c", opacity: 0.7, transform: "rotate(45deg)" }} />
        <div style={{ width: 6, height: 6, border: "1px solid #f59e0b", opacity: 0.5, transform: "rotate(45deg)" }} />
        <div style={{ width: 3, height: 3, background: "#f59e0b", opacity: 0.4, transform: "rotate(45deg)" }} />
      </div>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(245,158,11,0.4), transparent)" }} />
    </div>
  );
}

function Modal({ card, onClose }) {
  const psList = Array.isArray(card.ps) ? card.ps : [card.ps];

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-accent-bar" />
        <div className="modal-header">
          <div>
            <div className="modal-tag">
              <span className="modal-tag-dot" />
              Domain {String(card.index + 1).padStart(2, "0")}
            </div>
            <div className="modal-title">{card.domain}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="ps-section-label">Problem Statements</div>
          {psList.map((ps, i) => (
            <div className="ps-item" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
              <span className="ps-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ps-text">{ps}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainCard({ domain, ps, variant, index, onClick }) {
  return (
    <div className="domain-card-wrapper" style={{ animationDelay: `${index * 0.13}s` }}>
      <SpotlightCard
        spotlightColor="rgba(251,191,36,0.15)"
        className="cursor-pointer !w-[300px] !h-[400px] !p-0 !bg-[#111110] !border-[#2a2520]"
      >
        <div
          onClick={onClick}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 20, textAlign: "center", userSelect: "none",
          }}
        >
          {/* Glow ring behind lock */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "absolute", width: 110, height: 110,
              background: "radial-gradient(circle, rgba(234,88,12,0.25) 0%, rgba(245,158,11,0.1) 50%, transparent 70%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "pulseGlow 4s ease-in-out infinite",
            }} />
            <svg className="lock-icon" xmlns="http://www.w3.org/2000/svg"
              width="54" height="54" viewBox="0 0 24 24"
              fill="none" stroke="#fbbf24" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <circle cx="12" cy="16" r="1" fill="#fbbf24" stroke="none" />
            </svg>
          </div>

          {/* Labels */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
            <span style={{
              fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
              fontFamily: "inter", color: "#f59e0b", opacity: 0.6,
            }}>
              Domain {String(index + 1).padStart(2, "0")}
            </span>
            <span className="reveal-text">Click to reveal</span>
          </div>

          {/* Bottom accent line */}
          <div style={{
            position: "absolute", bottom: 0, left: "15%", right: "15%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), rgba(234,88,12,0.5), transparent)",
          }} />

          {/* Watermark */}
          <span className="domain-number-bg">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function Tracks() {
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
       {
      domain: "Domain 1",
      ps: [
        "Yet to be revealed!"
      ],
      variant: "gold",
    },
    {
      domain: "Domain 2",
      ps: [
        "Yet to be revealed!"
      ],
      variant: "gold",
    },
    {
      domain: "Domain 3",
      ps: [
        "Yet to be revealed!"
      ],
      variant: "gold",
    },
   
  ];

  return (
    <>
      <style>{styles}</style>

      <section style={{ position: "relative", background: "#080808", padding: "88px 0 100px", overflow: "hidden" }}>
        <GridBackground />

        {/* Heading */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: 52, padding: "0 24px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
            fontFamily: "inter", fontSize: 10,
            letterSpacing: "0.32em", textTransform: "uppercase",
            color: "#f59e0b", opacity: 0.75,
          }}>
            <span style={{ width: 22, height: 1, background: "linear-gradient(90deg, transparent, #f59e0b)" }} />
            Hackathon Tracks
            <span style={{ width: 22, height: 1, background: "linear-gradient(90deg, #f59e0b, transparent)" }} />
          </div>

          <div>
            <span
              className="glitch-text"
              data-text="Domains"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(40px, 6vw, 68px)",
                fontWeight: 800,
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #ea580c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Domains
            </span>
          </div>

          <p style={{
            fontFamily: "'inter'", fontSize: 13, fontWeight: 300,
            color: "rgba(255,255,255,0.35)", maxWidth: 460, margin: "20px auto 0",
            lineHeight: 1.85, letterSpacing: "0.03em",
          }}>
            Each domain is locked until reveal day.
            Click any card to explore the problem statements hidden within.
          </p>
        </div>

        {/* Top divider */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 52 }}>
          <TechDivider />
        </div>

        {/* Cards */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", gap: 28, flexWrap: "wrap",
          justifyContent: "center", padding: "0 40px",
        }}>
          {cards.map((card, i) => (
            <DomainCard
              key={i}
              domain={card.domain}
              ps={card.ps}
              variant={card.variant}
              index={i}
              onClick={() => setActiveCard({ ...card, index: i })}
            />
          ))}
        </div>

        {/* Bottom divider */}
        <div style={{ position: "relative", zIndex: 1, marginTop: 52 }}>
          <TechDivider />
        </div>

        {/* Footer stat */}
        <div style={{
          position: "relative", zIndex: 1, textAlign: "center", marginTop: 28,
          fontFamily: "inter", fontSize: 10,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(251,191,36,0.25)",
        }}>
          {cards.length} domains · {cards.reduce((a, c) => a + (Array.isArray(c.ps) ? c.ps.length : 1), 0)} problem statements
        </div>
      </section>

      {activeCard && (
        <Modal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </>
  );
}