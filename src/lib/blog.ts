import { siteConfig, type BlogEntry } from "@/lib/site-config";
import { sortBlogByCreatedDesc } from "@/lib/blog-date";

export function getBlogEntries(): BlogEntry[] {
  return sortBlogByCreatedDesc(siteConfig.blog);
}

export function getBlogEntry(slug: string): BlogEntry | null {
  return siteConfig.blog.find((entry) => entry.slug === slug) ?? null;
}

export function getBlogSlugs(): string[] {
  return siteConfig.blog.map((entry) => entry.slug);
}

export function blogPath(slug: string): string {
  return `/blog/${slug}`;
}
