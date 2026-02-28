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

          <main className="relative">
            <section id="home">
              <Hero />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="tracks">
              <Tracks />
            </section>

            <section id="timeline">
              <div className="min-h-screen bg-[#0E0E10]">
                <Timeline />
              </div>
            </section>

<section id="gallery" className="relative py-20 bg-neutral-950 overflow-hidden">
<Gallery/>
</section>

            <section id="sponsors">
              <Sponsors />
            </section>

            <section id="faq">
              <Faq />
            </section>

            <section id="footer">
              <Footer />
            </section>
          </main>
        </>
      )}
    </>
  );
}
