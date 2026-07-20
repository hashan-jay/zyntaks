import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Showcase } from "@/components/showcase";
import { Stats } from "@/components/stats";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee />
        <Services />
        <Showcase />
        <Stats />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
