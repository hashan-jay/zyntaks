import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getServicePageSlugs } from "@/lib/service-pages";
import { blogPath, getBlogEntries } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries = getServicePageSlugs().map((slug) => ({
    url: `${siteConfig.url}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogEntries = getBlogEntries();
  const blogImages = blogEntries
    .filter((project) => Boolean(project.heroImage))
    .map((project) => `${siteConfig.url}${project.heroImage!}`);
  const blogArticleEntries = blogEntries.map((entry) => ({
    url: `${siteConfig.url}${blogPath(entry.slug)}`,
    lastModified: new Date(`${entry.created}-01T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    ...(entry.heroImage
      ? { images: [`${siteConfig.url}${entry.heroImage}`] }
      : {}),
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteConfig.url}/og.png`],
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: blogImages,
    },
    {
      url: `${siteConfig.url}/seo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...serviceEntries,
    ...blogArticleEntries,
  ];
}
