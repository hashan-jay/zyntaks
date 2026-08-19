import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogArticleView } from "@/components/blog/blog-article-view";
import { ORG_ID, WEBSITE_ID, JsonLdScript } from "@/components/json-ld";
import { siteConfig, type BlogEntry } from "@/lib/site-config";
import { formatBlogCreated } from "@/lib/blog-date";
import { blogPath, getBlogEntry, getBlogSlugs } from "@/lib/blog";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBlogEntry(slug);
  if (!entry) return {};

  const path = blogPath(entry.slug);
  const title = entry.name;
  const description = entry.summary;
  const image = entry.heroImage
    ? {
        url: entry.heroImage,
        alt: entry.heroAlt ?? entry.name,
      }
    : {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${entry.name} — ${siteConfig.name}`,
      };

  return {
    title,
    description,
    keywords: [
      entry.name,
      "Zyntaks blog",
      entry.category,
      ...entry.stack.slice(0, 6),
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteConfig.titleBrand}`,
      description,
      url: `${siteConfig.url}${path}`,
      type: "article",
      publishedTime: `${entry.created}-01`,
      locale: "en_LK",
      siteName: siteConfig.name,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.titleBrand}`,
      description,
      images: [image.url],
    },
  };
}

function ArticleJsonLd({ entry }: { entry: BlogEntry }) {
  const pageUrl = `${siteConfig.url}${blogPath(entry.slug)}`;
  const createdLabel = formatBlogCreated(entry.created);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        name: entry.name,
        headline: entry.name,
        description: entry.summary,
        datePublished: `${entry.created}-01`,
        dateModified: `${entry.created}-01`,
        inLanguage: "en-LK",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": ORG_ID },
        creator: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        about: entry.category,
        keywords: entry.stack.join(", "),
        articleSection: createdLabel,
        creativeWorkStatus:
          entry.status === "in-development" ? "Incomplete" : "Published",
        ...(entry.heroImage
          ? { image: `${siteConfig.url}${entry.heroImage}` }
          : { image: `${siteConfig.url}/og.png` }),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${entry.name} | ${siteConfig.titleBrand}`,
        description: entry.summary,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: "en-LK",
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
            item: `${siteConfig.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: entry.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return <JsonLdScript data={graph} />;
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const entry = getBlogEntry(slug);
  if (!entry) notFound();

  return (
    <>
      <ArticleJsonLd entry={entry} />
      <Navbar />
      <BlogArticleView entry={entry} />
      <Footer />
    </>
  );
}
