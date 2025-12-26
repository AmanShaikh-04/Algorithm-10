"use client";

import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Tracks from "@/components/tracks";
import Timeline from "@/components/timeline";
import DomeGallery from "@/components/gallery";
import Sponsors from "@/components/sponsors";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

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
          <Timeline />
          <div className="h-[60vh] w-full overflow-hidden sm:h-[70vh] md:h-screen">
            <DomeGallery autoRotateSpeed={0.2} />
          </div>
          <Sponsors />
          <Faq />
          <Footer />
        </main>
      )}
    </>
  );
}
