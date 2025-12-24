import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Tracks from "@/components/tracks";
import Timeline from "@/components/timeline";
import Gallery from "@/components/gallery";
import Sponsors from "@/components/sponsors";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <Gallery />
      <Sponsors />
      <Faq />
      <Footer />
    </main>
  );
}
