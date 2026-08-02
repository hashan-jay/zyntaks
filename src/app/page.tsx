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
import { HomeJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.defaultTitle,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    locale: "en_LK",
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  verification: {
    other: {
      "ahrefs-site-verification":
        "3d730dbb6ae151775e7f2cad1f95f82d8d2c1948268ebd2fdcdcc1657e459b91",
    },
  },
};
// Comment default
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Navbar />
      <main id="main-content">
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
