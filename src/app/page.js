"use client";

import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Tracks from "@/components/tracks";
import Gallery from "@/components/gallery";
import Sponsors from "@/components/sponsors";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import Timeline from "@/components/timeline";
import SharedBackground from "@/components/SharedBackground";

export default function Page() {
  const [showHome, setShowHome] = useState(false);
  const [username, setUsername] = useState(null);

  return (
    <>
      {!showHome && (
        <Loader
          onComplete={(name) => {
            setUsername(name);
            setShowHome(true);
          }}
        />
      )}

      {showHome && (
        <>
          <header className="fixed top-0 right-0 left-0 z-50 pt-4">
            <Navbar />
          </header>

          <main className="relative bg-neutral-950">
            
            {/* 1. HERO LAYER */}
            {/* The Hero component natively handles its own 100dvh sticky behavior */}
<section id="home" className="relative z-10 bg-neutral-950">              
  <Hero />
            </section>

            {/* 2. MAIN CONTENT LAYER */}
            {/* -mt-[100dvh] pulls this layer up so it slides seamlessly over the sticky Hero */}
            <div className="relative z-30 -mt-[100dvh] bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,1)]">
              <SharedBackground />
              {/* Changed bg-neutral-950 to bg-transparent to let the particles show through */}
              <div className="relative z-10 bg-transparent">
                <section id="about"><About /></section>
                <section id="tracks"><Tracks /></section>
                <section id="timeline"><Timeline /></section>
                <section id="gallery" className="py-20"><Gallery /></section>
                <section id="sponsors"><Sponsors /></section>
                <section id="faq"><Faq /></section>
              </div>
            </div>

            {/* 3. FOOTER LAYER (Clip-Path Curtain Reveal) */}
            {/* How this works: The outer section creates a 100vh geometric "window" at the very bottom of the document.
              The clip-path hides everything outside this window. 
              The 'fixed' inner div locks the footer to your screen. As you scroll, the window moves UP, 
              revealing the fully rendered, animated footer behind it!
            */}
            <section 
              id="footer" 
              className="relative z-10 h-[100dvh] w-full"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <div className="fixed bottom-0 left-0 w-full h-[100dvh]">
                <Footer />
              </div>
            </section>

          </main>
        </>
      )}
    </>
  );
}