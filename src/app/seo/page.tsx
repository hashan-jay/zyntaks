import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SeoLanding } from "@/components/seo/seo-landing";
import { ORG_ID, WEBSITE_ID, JsonLdScript } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { seoPageContent } from "@/lib/seo-page";

export const metadata: Metadata = {
  title: "SEO Services Sri Lanka",
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
    "Core Web Vitals Sri Lanka",
  ],
  alternates: {
    canonical: seoPageContent.path,
  },
  openGraph: {
    title: `SEO Services Sri Lanka | ${siteConfig.titleBrand}`,
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
        alt: `SEO services — ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO Services Sri Lanka | ${siteConfig.titleBrand}`,
    description: seoPageContent.description,
    images: ["/og.png"],
  },
};

function SeoJsonLd() {
  const pageUrl = `${siteConfig.url}${seoPageContent.path}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `SEO Services Sri Lanka | ${siteConfig.titleBrand}`,
        description: seoPageContent.description,
        inLanguage: "en-LK",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
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
        provider: { "@id": ORG_ID },
        areaServed: [
          {
            "@type": "Country",
            name: "Sri Lanka",
          },
          {
            "@type": "Place",
            name: "Global",
          },
        ],
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

  return <JsonLdScript data={graph} />;
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
