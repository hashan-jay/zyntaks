import { siteConfig } from "@/lib/site-config";
import { servicePages } from "@/lib/service-pages";

export const ORG_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

function organizationNode(orgId: string = ORG_ID) {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: ["Zyntaks Studio", "Zyntaks Labs", "zyntaks.lk"],
    url: siteConfig.url,
    slogan: siteConfig.tagline,
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
    knowsAbout: [
      "Software Company in Sri Lanka",
      "Web Application development",
      "SEO optimization development",
      "Custom Software development",
      "Mobile Application development",
      "AI & Automation",
      "Business Digital Transformations",
      "Software development",
      "Web development",
      "AI automation",
      "Mobile app development",
      "UI/UX design",
      "Digital transformation",
      "SEO",
      "Technical SEO",
      "Next.js",
      "React",
      "TypeScript",
      "Core Web Vitals",
    ],
    ...(siteConfig.sameAs.length > 0 ? { sameAs: [...siteConfig.sameAs] } : {}),
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Zyntaks services",
      itemListElement: [
        ...servicePages.map((service, index) => ({
          "@type": "OfferCatalog",
          position: index + 1,
          name: service.title,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.title,
                description: service.description,
                url: `${siteConfig.url}/services/${service.slug}`,
                provider: { "@id": orgId },
              },
            },
          ],
        })),
        {
          "@type": "OfferCatalog",
          position: servicePages.length + 1,
          name: "SEO & Website Optimization",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SEO & Website Optimization",
                description:
                  "Technical SEO, Next.js SEO, and website optimization for businesses in Sri Lanka and globally.",
                url: `${siteConfig.url}/seo`,
                provider: { "@id": orgId },
              },
            },
          ],
        },
      ],
    },
  };
}

export function websiteNode(websiteId: string = WEBSITE_ID, orgId: string = ORG_ID) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: ["zyntaks.lk", "Zyntaks software studio"],
    description: siteConfig.description,
    inLanguage: "en-LK",
    publisher: { "@id": orgId },
    about: { "@id": orgId },
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/** Sitewide entity graph only — page-specific WebPage nodes live on each route. */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organizationNode(ORG_ID), websiteNode(WEBSITE_ID, ORG_ID)],
  };

  return <JsonLdScript data={graph} />;
}

export function HomeJsonLd() {
  const webpageId = `${siteConfig.url}/#webpage`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteConfig.url,
        name: siteConfig.defaultTitle,
        description: siteConfig.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/og.png`,
          width: 1200,
          height: 630,
        },
        inLanguage: "en-LK",
        breadcrumb: {
          "@id": `${siteConfig.url}/#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteConfig.url}/`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#services`,
        name: "Zyntaks services",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: servicePages.length + 1,
        itemListElement: [
          ...servicePages.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `${siteConfig.url}/services/${service.slug}`,
          })),
          {
            "@type": "ListItem",
            position: servicePages.length + 1,
            name: "SEO & Website Optimization",
            url: `${siteConfig.url}/seo`,
          },
        ],
      },
    ],
  };

  return <JsonLdScript data={graph} />;
}

export { organizationNode };
