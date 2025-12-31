"use client";

import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Tracks from "@/components/tracks";
import DomeGallery from "@/components/gallery";
import Sponsors from "@/components/sponsors";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import Timeline from '@/components/timeline';

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
        <main className="relative overflow-x-hidden">
          <Navbar />
         
          <Hero />
          <About />
          <Tracks />
          <div className="min-h-screen bg-[#0E0E10]">
      <Timeline />
    </div>
          <div className="border-border relative h-[60vh] max-h-[800px] w-full overflow-hidden rounded border shadow-2xl md:h-[80vh]">
            <DomeGallery autoRotateSpeed={0.2} overlayBlurColor="#000000" />
          </div>

          <Sponsors />
          <Faq />
          <Footer />
        </main>
      )}
    </>
  );
}
