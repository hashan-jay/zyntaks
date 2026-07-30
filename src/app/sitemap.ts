import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getServicePageSlugs } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries = getServicePageSlugs().map((slug) => ({
    url: `${siteConfig.url}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/seo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...serviceEntries,
  ];
}
