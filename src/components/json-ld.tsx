import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
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
        image: `${siteConfig.url}/og.png`,
        description: siteConfig.entitySummary,
        email: siteConfig.email,
        telephone: `+${siteConfig.whatsappNumber}`,
        foundingLocation: {
          "@type": "Place",
          name: "Sri Lanka",
        },
        areaServed: siteConfig.areaServed.map((name) => ({
          "@type": "Place",
          name,
        })),
        knowsAbout: [
          "Software development",
          "Web application development",
          "SEO company Sri Lanka",
          "Website SEO Sri Lanka",
          "Next.js SEO",
          "Technical SEO services",
          "Website optimization Sri Lanka",
          "Next.js",
          "React",
          "TypeScript",
          "Cloud infrastructure",
          "DevOps",
          "UI/UX engineering",
          "API development",
          "Mobile solutions",
          "AI automation",
        ],
        makesOffer: siteConfig.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            ...(service.id === "seo-performance"
              ? {
                  url: `${siteConfig.url}/seo`,
                  areaServed: [
                    { "@type": "Country", name: "Sri Lanka" },
                    { "@type": "Place", name: "Global" },
                  ],
                  serviceType: [
                    "SEO company Sri Lanka",
                    "Website SEO Sri Lanka",
                    "Next.js SEO",
                    "Technical SEO services",
                    "Website optimization Sri Lanka",
                  ],
                }
              : {}),
          },
        })),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.email,
            telephone: `+${siteConfig.whatsappNumber}`,
            availableLanguage: ["English"],
            areaServed: siteConfig.areaServed,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: ["zyntaks.lk", "Zyntaks software studio"],
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": orgId },
        about: { "@id": orgId },
      },
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
        },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
