import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PortfolioView } from "@/components/portfolio/portfolio-view";
import {
  organizationNode,
  websiteNode,
  serializeJsonLd,
} from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected web applications and digital products designed, built, and deployed by Zyntaks — including Fit with Shyama and more case studies covering problem, solution, and live results.",
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

function PortfolioJsonLd() {
  const pageUrl = `${siteConfig.url}/portfolio`;
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(orgId),
      websiteNode(websiteId, orgId),
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Portfolio | Zyntaks",
        description:
          "Selected web applications and digital products designed, built, and deployed by Zyntaks.",
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        inLanguage: "en",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/og.png`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteConfig.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioJsonLd />
      <Navbar />
      <PortfolioView />
      <Footer />
    </>
  );
}
