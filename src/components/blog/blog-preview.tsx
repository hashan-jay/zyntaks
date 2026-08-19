"use client";

import Link from "next/link";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";
import { BlogCards } from "@/components/blog/blog-cards";

export function BlogPreview() {
  return (
    <section
      id="blog-preview"
      aria-labelledby="blog-preview-heading"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="section-divider absolute top-0 right-0 left-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-2xl flex-col">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
            Blog
          </p>
          <TextReveal
            as="h2"
            id="blog-preview-heading"
            className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Stories from the studio
          </TextReveal>
          <FadeUp className="mt-3 text-base leading-relaxed text-zinc-400 sm:mt-4 sm:text-lg">
            Short reads on products we have shipped and research we are
            exploring — open an article to see the full story.
          </FadeUp>
        </div>

        <BlogCards className="mt-10 sm:mt-16" />

        <FadeUp className="mt-8 sm:mt-10">
          <Link
            href="/blog"
            className="inline-flex h-11 items-center rounded-full border border-theme px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            View all articles
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
