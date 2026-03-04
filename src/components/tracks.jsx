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
              Track {String(card.index + 1).padStart(2, "0")}
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
      {/* Running border wrapper */}
      <div className="group relative h-[400px] w-[300px]">
        {/* Spinning border */}
        <div className="absolute -inset-[2px] z-0 overflow-hidden rounded-2xl">
          <div className="absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_270deg,#f59e0b_360deg)] opacity-60" />
          <div className="absolute inset-[2px] rounded-[14px] bg-[#111110]" />
        </div>

        <SpotlightCard
          spotlightColor="rgba(251,191,36,0.15)"
          className="cursor-pointer !w-[300px] !h-[400px] !p-0 !bg-[#111110] !border-transparent"
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
                Track {String(index + 1).padStart(2, "0")}
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
    </div>
  );
}

export default function Tracks() {
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      domain: "Track 1",
      ps: ["Yet to be revealed!"],
      variant: "gold",
    },
    {
      domain: "Track 2",
      ps: ["Yet to be revealed!"],
      variant: "gold",
    },
    {
      domain: "Track 3",
      ps: ["Yet to be revealed!"],
      variant: "gold",
    },
  ];

  return (
    <>
      <style>{styles}</style>

      <section className="relative flex flex-col items-center overflow-hidden bg-transparent py-24 px-10 pb-0">

        {/* Heading */}
        <div className="relative z-10 text-center mb-14">
          <h2 className="font-orbitron text-4xl font-bold tracking-widest text-[#F5A623] uppercase drop-shadow-[0_0_15px_rgba(243,106,29,0.4)] md:text-6xl">
            Tracks
          </h2>
      <p className="mt-2 max-w-xl px-4 text-sm font-light text-neutral-400 md:mt-4 md:text-lg">
        Each Track is locked until reveal day.
      </p>
              </div>

        {/* Top divider */}
        <div className="relative z-10 w-full mb-14">
          <TechDivider />
        </div>

        {/* Cards */}
        <div className="relative z-10 flex flex-wrap gap-7 justify-center w-full">
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
        <div className="relative z-10 w-full mt-14">
          <TechDivider />
        </div>

 
      </section>

      {activeCard && (
        <Modal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </>
  );
}