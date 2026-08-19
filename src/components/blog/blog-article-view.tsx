"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatBlogCreated } from "@/lib/blog-date";
import { getBlogEntries } from "@/lib/blog";
import type { BlogEntry } from "@/lib/site-config";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";
import { BlogCards } from "@/components/blog/blog-cards";

const ease = [0.16, 1, 0.3, 1] as const;

type BlogArticleViewProps = {
  entry: BlogEntry;
};

export function BlogArticleView({ entry }: BlogArticleViewProps) {
  const createdLabel = formatBlogCreated(entry.created);
  const isInDevelopment = entry.status === "in-development";
  const hasLiveUrl = Boolean(entry.url);
  const hasHero = Boolean(entry.heroImage && entry.heroAlt);
  const hasMoreArticles = getBlogEntries().some(
    (item) => item.slug !== entry.slug
  );

  return (
    <main id="main-content" className="relative flex-1">
      <article className="relative">
        <header className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% -10%, color-mix(in srgb, var(--accent-yellow) 18%, transparent), transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
              <Link href="/blog" className="transition-colors hover:text-white">
                Blog
              </Link>
              <span className="text-zinc-500">
                {" "}
                · <time dateTime={entry.created}>{createdLabel}</time> ·{" "}
                {entry.category}
              </span>
            </p>
            <TextReveal
              as="h1"
              className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-5xl md:text-6xl"
            >
              {entry.name}
            </TextReveal>
            <FadeUp className="mt-3 text-sm text-zinc-500 sm:text-base">
              {entry.role}
            </FadeUp>
            <FadeUp delay={0.08} className="mt-8 flex flex-wrap gap-3">
              {hasLiveUrl ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-theme bg-surface/50 px-5 text-sm font-medium text-foreground transition-all hover:border-[var(--border-hover)] hover:bg-surface"
                >
                  Visit live site
                  <span aria-hidden className="text-[var(--accent-yellow)]">
                    ↗
                  </span>
                </a>
              ) : (
                <span className="inline-flex h-11 items-center rounded-full border border-theme px-5 text-sm font-medium text-zinc-500">
                  {isInDevelopment ? "Under development" : "No live site yet"}
                </span>
              )}
              <Link
                href="/blog"
                className="inline-flex h-11 items-center rounded-full border border-theme px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                All articles
              </Link>
            </FadeUp>
          </div>
        </header>

        <div className="relative border-t border-theme pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8"
          >
            {hasHero ? (
              <figure className="overflow-hidden rounded-2xl border border-theme bg-surface/40 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)]">
                <div className="flex items-center gap-2 border-b border-theme px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                  <figcaption className="ml-3 truncate font-mono text-xs text-zinc-500">
                    {entry.url
                      ? entry.url.replace(/^https?:\/\//, "")
                      : entry.name}
                  </figcaption>
                </div>
                <div className="relative aspect-[16/10] w-full bg-black/40">
                  <Image
                    src={entry.heroImage!}
                    alt={entry.heroAlt!}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1120px"
                    className="object-cover object-top"
                  />
                </div>
              </figure>
            ) : null}

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:mt-10 sm:text-lg">
              {entry.intro}
            </p>

            <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2">
              <section className="theme-card rounded-2xl p-5 sm:p-6">
                <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                  The problem
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {entry.problem}
                </p>
              </section>
              <section className="theme-card rounded-2xl p-5 sm:p-6">
                <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                  {isInDevelopment ? "Our approach" : "Our solution"}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {entry.solution}
                </p>
              </section>
            </div>

            <section className="mt-8 max-w-3xl sm:mt-10">
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                {isInDevelopment ? "Where we are" : "Outcome"}
              </h2>
              {entry.outcome.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="mt-8 max-w-3xl sm:mt-10">
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                {isInDevelopment
                  ? "What we are building toward"
                  : "What we delivered"}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {entry.delivered.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8">
              {entry.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-theme px-3 py-1 text-xs text-zinc-500 sm:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </article>

      {hasMoreArticles ? (
        <section
          aria-labelledby="more-articles-heading"
          className="relative border-t border-theme py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="more-articles-heading"
              className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
            >
              More from the blog
            </h2>
            <BlogCards excludeSlug={entry.slug} className="mt-8 sm:mt-10" />
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="article-cta-heading"
        className="relative border-t border-theme py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="article-cta-heading"
            className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          >
            Have a product to ship?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Tell us what you are building — we will map the problem, craft the
            solution, and get it live.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center rounded-full border border-theme bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-11 items-center rounded-full border border-theme px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Back to blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
