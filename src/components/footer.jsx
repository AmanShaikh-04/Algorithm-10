"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import SharedBackground from "./SharedBackground";

const base_team_members = [
  { image: "/team/M-member1.webp",  role: "Management",        name: "Basheer"  },
  { image: "/team/M-member2.webp",  role: "Management",        name: "Ayesha"    },
  { image: "/team/M-member3.webp", role: "Media & Marketing", name: "Qaif"   },
  { image: "/team/MM-member1.webp", role: "Media & Marketing", name: "Arman"   },
  { image: "/team/MM-member2.webp", role: "Media & Marketing", name: "Aman"    },
  { image: "/team/MM-member3.webp", role: "Media & Marketing", name: "Alamin"  },
  { image: "/team/MM-member4.webp", role: "Media & Marketing", name: "Javeriya"    },
  { image: "/team/MM-member5.webp", role: "Media & Marketing", name: "Altaf"   },
  { image: "/team/MM-member6.webp", role: "Media & Marketing", name: "Zain"   },
  { image: "/team/S-member1.webp",  role: "Sponsorship",       name: "Umar"    },
  { image: "/team/T-member2.webp",  role: "Technical",         name: "Asim"    },
  { image: "/team/T-member3.webp",  role: "Technical",         name: "Mueez"   },
  { image: "/team/T-member4.webp",  role: "Technical",         name: "Moin"    },
  { image: "/team/T-member5.webp",  role: "Technical",         name: "A.Rehman"    },
  { image: "/team/T-member6.webp",  role: "Technical",         name: "Iffah"   },
  { image: "/team/T-member7.webp",  role: "Technical",         name: "Ayesha"  },
  { image: "/team/T-member8.webp",  role: "Technical",         name: "Huzaifa"   },
  { image: "/team/T-member9.webp",  role: "Technical",         name: "Owais" },
  { image: "/team/DO-member1.webp", role: "Documentation",     name: "Irfan"   },
  { image: "/team/DO-member2.webp", role: "Documentation",     name: "Ayesha"  },
  { image: "/team/DO-member3.webp", role: "Documentation",     name: "Shama"  },
  { image: "/team/D-member1.webp",  role: "Design",            name: "Aarhaan" },
  { image: "/team/D-member2.webp",  role: "Design",            name: "Umair"   },
  { image: "/team/D-member3.webp",  role: "Design",            name: "Sumaiya" },
  { image: "/team/D-member4.webp",  role: "Design",            name: "Humaira" },
  { image: "/team/D-member5.webp",  role: "Design",            name: "Jishan"  },
  { image: "/team/D-member6.webp",  role: "Design",            name: "Affan"   },
  { image: "/team/D-member7.webp",  role: "Design",            name: "Arshiya"   },
  { image: "/team/DE-member1.webp", role: "Decoration",        name: "Reefa"   },
  { image: "/team/DE-member2.webp", role: "Decoration",        name: "Yahya"   },
  { image: "/team/DE-member3.webp", role: "Decoration",        name: "Afrah"   },
  { image: "/team/DE-member4.webp", role: "Decoration",        name: "Ashish"  },
  { image: "/team/DE-member5.webp", role: "Decoration",        name: "Shweta"  },
];

const Team_card = ({ image_src, role, name }) => (
  <div className="group w-32 h-[168px] bg-[#f9f9f9] p-2 flex flex-col items-center rounded-sm transition-all duration-300 drop-shadow-[0_15px_30px_rgba(255,140,66,0.3)] hover:-translate-y-3 hover:scale-105 hover:drop-shadow-[0_20px_40px_rgba(255,140,66,0.7)]">
    <div className="w-full h-[110px] relative overflow-hidden bg-[#222]">
      <Image src={image_src} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="flex flex-col items-center justify-center mt-auto pb-1 w-full text-gray-800">
      <span className="text-[20px] font-[cursive] text-[#1a1a1a] leading-none mb-[2px]">{name}</span>
      <span className="text-[8px] uppercase tracking-widest font-bold text-gray-500 transition-colors duration-300 group-hover:text-orange-600">{role}</span>
    </div>
  </div>
);

const instagram_svg = () => (<svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>);
const twitter_svg  = () => (<svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const linkedin_svg = () => (<svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24.774 24 23.2 0 22.225 0z"/></svg>);
const youtube_svg  = () => (<svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const gmail_svg    = () => (<svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.59l8.073-6.097C21.691 2.279 24 3.434 24 5.457z"/></svg>);

const social_items = [
  { name: "Instagram", icon: instagram_svg, url: "#", colors: "text-[#E1306C] border-[#E1306C]/50 bg-[#E1306C]/10 drop-shadow-[0_0_10px_rgba(225,48,108,0.3)] hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] hover:drop-shadow-[0_0_20px_rgba(225,48,108,0.8)]" },
  { name: "Twitter",   icon: twitter_svg,   url: "#", colors: "text-[#1DA1F2] border-[#1DA1F2]/50 bg-[#1DA1F2]/10 drop-shadow-[0_0_10px_rgba(29,161,242,0.3)] hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] hover:drop-shadow-[0_0_20px_rgba(29,161,242,0.8)]" },
  { name: "LinkedIn",  icon: linkedin_svg,  url: "#", colors: "text-[#0A66C2] border-[#0A66C2]/50 bg-[#0A66C2]/10 drop-shadow-[0_0_10px_rgba(10,102,194,0.3)] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:drop-shadow-[0_0_20px_rgba(10,102,194,0.8)]" },
  { name: "YouTube",   icon: youtube_svg,   url: "#", colors: "text-[#FF0000] border-[#FF0000]/50 bg-[#FF0000]/10 drop-shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" },
  { name: "Gmail",     icon: gmail_svg,     url: "#", colors: "text-[#EA4335] border-[#EA4335]/50 bg-[#EA4335]/10 drop-shadow-[0_0_10px_rgba(234,67,53,0.3)] hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335] hover:drop-shadow-[0_0_20px_rgba(234,67,53,0.8)]" },
];

// ─── Config hook ──────────────────────────────────────────────────────────────
const useConfig = () => {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // ── MOBILE (phones + iPad Mini/Air, excluding iPad Pro) ──────────────
      if (w < 1180) {
        const scale     = h / 852;                               // baseline: iPhone 14 Pro Max
        const radius    = Math.round(900  * scale);
        const arcTop    = Math.round(200  * scale);
        const mapH      = Math.round(Math.min(180, 120 * scale));
        const iconW     = Math.round(48   * scale);
        const iconSz    = Math.round(20   * scale);
        const cardScale = h < 680 ? Math.max(0.78, h / 852) : 1;
        setCfg({ mobile: true, radius, arcTop, mapH, iconW, iconSz, cardScale });
        return;
      }

      const R       = Math.round(w * 1.8);
      const arcSize = R * 1;
      const arcTop  = 150;                                      
      const hs      = h / 1080;
      const hScale  = Math.min(1.2, Math.max(0.85, hs));
      setCfg({
        mobile:    false,
        arcSize,
        arcTop,
        mapH:      Math.round(140 * hScale),
        iconW:     Math.round(56  * hScale),
        iconSz:    Math.round(24  * hScale),
      });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return cfg;
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const cfg = useConfig();
  const added_rotation  = useMotionValue(0);
  const smooth_rotation = useSpring(added_rotation, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const onWheel = (e) => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
      if (atBottom) added_rotation.set(added_rotation.get() - e.deltaY * 0.05);
    };
    let lastY = 0;
    const onTouchStart = (e) => { lastY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
      if (atBottom) {
        added_rotation.set(added_rotation.get() - (lastY - e.touches[0].clientY) * 0.1);
        lastY = e.touches[0].clientY;
      }
    };
    window.addEventListener("wheel",      onWheel,       { passive: true });
    window.addEventListener("touchstart", onTouchStart,  { passive: true });
    window.addEventListener("touchmove",  onTouchMove,   { passive: true });
    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
    };
  }, [added_rotation]);

  if (!cfg) return null; // wait for client measurement

  const { mobile } = cfg;

  // Arc size/position
  const arcW   = mobile ? cfg.radius * 2 : cfg.arcSize;
  const arcH   = arcW;
  const arcTop = mobile ? cfg.arcTop     : cfg.arcTop;

  return (
    <footer className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#050505]/80 text-white flex flex-col items-center border-t border-orange-500/20 shadow-[0_-15px_40px_rgba(255,140,66,0.1)]">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <SharedBackground id="footer-particles" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-orange-600/20 to-transparent blur-[120px] pointer-events-none z-0 rounded-full translate-y-1/2" />

      {/* ── Arc ── */}
      <div
        className="absolute z-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-90"
        style={{ width: arcW, height: arcH, top: arcTop }}
      >
        <motion.div style={{ rotate: smooth_rotation }} className="w-full h-full relative">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: mobile ? 120 : 1000, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            {base_team_members.map((member, i) => (
              <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * (360 / base_team_members.length)}deg)` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer transition-transform hover:-translate-y-4 hover:scale-110 duration-300">
                  {mobile && cfg.cardScale !== 1 ? (
                    <div style={{ transform: `scale(${cfg.cardScale})`, transformOrigin: "top center" }}>
                      <Team_card image_src={member.image} role={member.role} name={member.name} />
                    </div>
                  ) : (
                    <Team_card image_src={member.image} role={member.role} name={member.name} />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom UI ── */}
      <div className="relative z-20 flex flex-col items-center w-full mt-auto pb-6 px-4 max-w-4xl">
        <div className="flex flex-col items-center gap-6 w-full mb-6">

          {/* Map */}
          <div className="relative w-full max-w-[450px] group" style={{ height: `${cfg.mapH}px` }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-full w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 p-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.863620408042!2d73.10204687466346!3d19.000230854347873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e83a36fbf179%3A0xbbb0905051e8c56e!2sAnjuman-I-Islam's%20Kalsekar%20Technical%20Campus!5e1!3m2!1sen!2sin!4v1772359776194!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0, borderRadius: "0.6rem" }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-6">
            {social_items.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-center rounded-2xl border transition-all duration-300 hover:-translate-y-2 cursor-pointer ${item.colors}`}
                style={{ width: cfg.iconW, height: cfg.iconW }}
                title={item.name}
              >
                <div style={{ width: cfg.iconSz, height: cfg.iconSz }}><item.icon /></div>
              </a>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div className="w-full text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-full max-w-2xl mb-4 mt-2">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div className="mx-4 h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(255,140,66,0.8)]" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-amber-500/50 to-transparent" />
          </div>
          <p className="text-sm lg:text-base font-normal tracking-wide text-white/90 flex items-center justify-center gap-1.5">
            Made With <span className="inline-block animate-pulse text-red-500 text-lg lg:text-xl drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">❤️</span> By
            <span className="font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              Algo Team
            </span>
          </p>
          <p className="text-[10px] lg:text-xs text-white/40 font-extralight tracking-wider mt-1.5">
            © 2026 Algorithm 10. All rights reserved. Navi Mumabi.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;