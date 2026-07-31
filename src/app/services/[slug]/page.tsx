import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ServicePageView } from "@/components/services/service-page-view";
import { ORG_ID, WEBSITE_ID, JsonLdScript } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import {
  getServicePage,
  getServicePageSlugs,
  type ServicePage,
} from "@/lib/service-pages";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServicePageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};

  const path = `/services/${service.slug}`;
  const title = `${service.title} Sri Lanka`;

  return {
    title,
    description: service.description,
    keywords: [
      service.title,
      `${service.title} Sri Lanka`,
      "Zyntaks",
      "software development Sri Lanka",
      ...service.technologies.slice(0, 6),
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteConfig.titleBrand}`,
      description: service.description,
      url: `${siteConfig.url}${path}`,
      type: "website",
      locale: "en_LK",
      siteName: siteConfig.name,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${service.title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.titleBrand}`,
      description: service.description,
      images: ["/og.png"],
    },
  };
}

function ServiceJsonLd({ service }: { service: ServicePage }) {
  const pageUrl = `${siteConfig.url}/services/${service.slug}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${service.title} Sri Lanka | ${siteConfig.titleBrand}`,
        description: service.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: "en-LK",
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
        name: service.title,
        description: service.description,
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
        serviceType: service.title,
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
            name: "Services",
            item: `${siteConfig.url}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: service.faqs.map((faq) => ({
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

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceJsonLd service={service} />
      <Navbar />
      <ServicePageView service={service} />
      <Footer />
    </>
  );
}
