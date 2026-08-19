"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBlogEntry } from "@/lib/blog";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";
import { BlogCards } from "@/components/blog/blog-cards";

export function BlogView() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && getBlogEntry(hash)) {
      router.replace(`/blog/${hash}`);
    }
  }, [router]);

  return (
    <main id="main-content" className="relative flex-1">
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
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
            Blog
          </p>
          <TextReveal
            as="h1"
            className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-5xl md:text-6xl"
          >
            Blog
          </TextReveal>
          <FadeUp className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-5 sm:text-lg">
            Products, launches, and R&D from Zyntaks.
          </FadeUp>
          <FadeUp
            delay={0.08}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            Pick an article to read the full story — each one has its own page
            you can share.
          </FadeUp>
        </div>
      </header>

      <section
        aria-labelledby="blog-entries-heading"
        className="relative pb-20 sm:pb-28 lg:pb-32"
      >
        <div className="section-divider absolute top-0 right-0 left-0" />
        <h2 id="blog-entries-heading" className="sr-only">
          Blog articles
        </h2>

        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <BlogCards />
        </div>
      </section>

      <section
        aria-labelledby="blog-cta-heading"
        className="relative border-t border-theme py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="blog-cta-heading"
            className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          >
            Have a product to ship?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Tell us what you are building — we will map the problem, craft the
            solution, and get it live. Whether you need a marketing site, a
            custom web app, or a full digital product, Zyntaks can help you move
            from idea to production with clarity. Share your goals and timeline,
            and we will respond with a practical next step.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center rounded-full border border-theme bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full border border-theme px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
