import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogView } from "@/components/blog/blog-view";
import {
  ORG_ID,
  WEBSITE_ID,
  JsonLdScript,
} from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";

const blogDescription =
  "Selected web applications and digital products designed, built, and deployed by Zyntaks — including Fit with Shyama and more case studies covering problem, solution, and live results.";

export const metadata: Metadata = {
  title: "Blog",
  description: blogDescription,
  keywords: [
    "Zyntaks blog",
    "web development case studies",
    "software projects Sri Lanka",
    "Fit with Shyama",
    "Next.js projects",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteConfig.titleBrand}`,
    description:
      "Case studies of products shipped by Zyntaks — problem, solution, and live results.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    locale: "en_LK",
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `Blog — ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.titleBrand}`,
    description:
      "Case studies of products shipped by Zyntaks — problem, solution, and live results.",
    images: ["/og.png"],
  },
};

function BlogJsonLd() {
  const pageUrl = `${siteConfig.url}/blog`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Blog | ${siteConfig.titleBrand}`,
        description:
          "Selected web applications and digital products designed, built, and deployed by Zyntaks.",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: "en-LK",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/og.png`,
          width: 1200,
          height: 630,
        },
        mainEntity: {
          "@id": `${pageUrl}#projects`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#projects`,
        name: "Zyntaks blog projects",
        numberOfItems: siteConfig.blog.length,
        itemListElement: siteConfig.blog.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${pageUrl}#${project.slug}`,
            name: project.name,
            description: project.intro,
            url: project.url,
            datePublished: project.year,
            image: `${siteConfig.url}${project.heroImage}`,
            creator: { "@id": ORG_ID },
            about: project.category,
            keywords: project.stack.join(", "),
          },
        })),
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
            name: "Blog",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return <JsonLdScript data={graph} />;
}

export default function BlogPage() {
  return (
    <>
      <BlogJsonLd />
      <Navbar />
      <BlogView />
      <Footer />
    </>
  );
}
