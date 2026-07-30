import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SeoLanding } from "@/components/seo/seo-landing";
import { organizationNode, websiteNode, serializeJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { seoPageContent } from "@/lib/seo-page";

export const metadata: Metadata = {
  title: "SEO",
  description: seoPageContent.description,
  keywords: [
    "SEO company Sri Lanka",
    "Website SEO Sri Lanka",
    "Next.js SEO",
    "Technical SEO services",
    "Website optimization Sri Lanka",
    "SEO services Sri Lanka",
    "technical SEO Sri Lanka",
    "Zyntaks SEO",
  ],
  alternates: {
    canonical: seoPageContent.path,
  },
  openGraph: {
    title: `SEO | ${siteConfig.seoTitle}`,
    description: seoPageContent.description,
    url: `${siteConfig.url}${seoPageContent.path}`,
    type: "website",
    locale: "en_LK",
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: siteConfig.seoTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO | ${siteConfig.seoTitle}`,
    description: seoPageContent.description,
    images: ["/og.png"],
  },
};

function SeoJsonLd() {
  const pageUrl = `${siteConfig.url}${seoPageContent.path}`;
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(orgId),
      websiteNode(websiteId, orgId),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "SEO & Website Optimization | Zyntaks",
        description: seoPageContent.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/og.png`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "SEO & Website Optimization",
        serviceType: "Technical SEO",
        description: seoPageContent.description,
        provider: { "@id": orgId },
        areaServed: {
          "@type": "Country",
          name: "Sri Lanka",
        },
        url: pageUrl,
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
            name: "SEO",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: seoPageContent.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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

export default function SeoPage() {
  return (
    <>
      <SeoJsonLd />
      <Navbar />
      <SeoLanding />
      <Footer />
    </>
  );
}
