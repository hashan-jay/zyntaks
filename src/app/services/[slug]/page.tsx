import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ServicePageView } from "@/components/services/service-page-view";
import { organizationNode, websiteNode, serializeJsonLd } from "@/components/json-ld";
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

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.seoTitle}`,
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
      title: `${service.title} | ${siteConfig.seoTitle}`,
      description: service.description,
      images: ["/og.png"],
    },
  };
}

function ServiceJsonLd({ service }: { service: ServicePage }) {
  const pageUrl = `${siteConfig.url}/services/${service.slug}`;
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
        name: service.title,
        description: service.description,
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
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.description,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
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
