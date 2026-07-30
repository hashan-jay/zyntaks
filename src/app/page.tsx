import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Showcase } from "@/components/showcase";
import { Stats } from "@/components/stats";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteConfig.url,
  },
  verification: {
    other: {
      "ahrefs-site-verification":
        "3d730dbb6ae151775e7f2cad1f95f82d8d2c1948268ebd2fdcdcc1657e459b91",
    },
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
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
