import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PortfolioView } from "@/components/portfolio/portfolio-view";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected web applications and digital products designed, built, and deployed by Zyntaks — including Fit with Shyama and more.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: `Portfolio | ${siteConfig.seoTitle}`,
    description:
      "Case studies of products shipped by Zyntaks developers — problem, solution, and live results.",
    url: `${siteConfig.url}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <PortfolioView />
      <Footer />
    </>
  );
}
