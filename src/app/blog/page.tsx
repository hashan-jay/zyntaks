import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogView } from "@/components/blog/blog-view";
import {
  ORG_ID,
  WEBSITE_ID,
  JsonLdScript,
} from "@/components/json-ld";
import { sortBlogByCreatedDesc } from "@/lib/blog-date";
import { siteConfig } from "@/lib/site-config";

const blogDescription =
  "The Zyntaks blog — product launches and R&D incidents marked by month and year, including ZyntaksGenAI offline education research and Fit with Shyama.";

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
      "Zyntaks blog incidents — products shipped, marked by month and year.",
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
      "Zyntaks blog incidents — products shipped, marked by month and year.",
    images: ["/og.png"],
  },
};

function BlogJsonLd() {
  const pageUrl = `${siteConfig.url}/blog`;
  const entries = sortBlogByCreatedDesc(siteConfig.blog);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Blog | ${siteConfig.titleBrand}`,
        description:
          "Zyntaks blog — product launches and ship-log incidents marked by month and year.",
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
          "@id": `${pageUrl}#entries`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#entries`,
        name: "Zyntaks blog incidents",
        numberOfItems: entries.length,
        itemListElement: entries.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "BlogPosting",
            "@id": `${pageUrl}#${project.slug}`,
            name: project.name,
            headline: project.name,
            description: project.intro,
            url: project.url ?? `${pageUrl}#${project.slug}`,
            datePublished: project.created,
            ...(project.heroImage
              ? { image: `${siteConfig.url}${project.heroImage}` }
              : {}),
            creator: { "@id": ORG_ID },
            author: { "@id": ORG_ID },
            about: project.category,
            keywords: project.stack.join(", "),
            creativeWorkStatus:
              project.status === "in-development"
                ? "Incomplete"
                : "Published",
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
