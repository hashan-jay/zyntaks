import { siteConfig } from "@/lib/site-config";

function organizationNode(orgId: string) {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: ["Zyntaks Studio", "Zyntaks Labs", "zyntaks.lk"],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/og.png`,
      width: 1200,
      height: 630,
    },
    description: siteConfig.entitySummary,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    knowsAbout: [
      "Software development",
      "Web development",
      "AI automation",
      "Mobile app development",
      "UI/UX design",
      "Digital transformation",
      "SEO",
      "Next.js",
      "React",
      "TypeScript",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      telephone: `+${siteConfig.whatsappNumber}`,
      availableLanguage: ["English", "Sinhala"],
      areaServed: {
        "@type": "Country",
        name: "Sri Lanka",
      },
    },
  };
}

export function websiteNode(websiteId: string, orgId: string) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: ["zyntaks.lk", "Zyntaks software studio"],
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": orgId },
    about: { "@id": orgId },
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationNode(orgId),
      },
      websiteNode(websiteId, orgId),
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.seoTitle,
        description: siteConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/og.png`,
          width: 1200,
          height: 630,
        },
        inLanguage: "en",
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

export { organizationNode };
