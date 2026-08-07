"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatBlogCreated, sortBlogByCreatedDesc } from "@/lib/blog-date";
import { siteConfig } from "@/lib/site-config";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function BlogView() {
  const entries = sortBlogByCreatedDesc(siteConfig.blog);

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
            Products, launches, and R&D from Zyntaks — each incident marked by
            the month and year it was logged.
          </FadeUp>
          <FadeUp
            delay={0.08}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            Browse the entries below for the problem, the approach, and where
            things stand. New work gets added as we ship — or as research moves
            forward.
          </FadeUp>
        </div>
      </header>

      <section
        aria-labelledby="blog-entries-heading"
        className="relative pb-20 sm:pb-28 lg:pb-32"
      >
        <div className="section-divider absolute top-0 right-0 left-0" />
        <h2 id="blog-entries-heading" className="sr-only">
          Blog incidents
        </h2>

        <div className="mx-auto max-w-6xl space-y-20 px-4 pt-14 sm:space-y-28 sm:px-6 sm:pt-20 lg:px-8">
          {entries.map((project, index) => {
            const createdLabel = formatBlogCreated(project.created);
            const isInDevelopment = project.status === "in-development";
            const hasLiveUrl = Boolean(project.url);
            const hasHero = Boolean(project.heroImage && project.heroAlt);

            return (
              <article
                key={project.slug}
                id={project.slug}
                className="scroll-mt-28"
              >
                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.8, ease }}
                >
                  <header className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                        <time dateTime={project.created}>{createdLabel}</time>
                        <span className="text-zinc-500">
                          {" "}
                          · {String(index + 1).padStart(2, "0")} ·{" "}
                          {project.category}
                        </span>
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500">
                        {project.role}
                      </p>
                    </div>
                    {hasLiveUrl ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-theme bg-surface/50 px-4 text-sm font-medium text-foreground transition-all hover:border-[var(--border-hover)] hover:bg-surface"
                      >
                        Visit live site
                        <span
                          aria-hidden
                          className="text-[var(--accent-yellow)]"
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span className="inline-flex h-10 items-center rounded-full border border-theme px-4 text-sm font-medium text-zinc-500">
                        {isInDevelopment
                          ? "Under development"
                          : "No live site yet"}
                      </span>
                    )}
                  </header>

                  {hasHero ? (
                    <figure className="mt-8 overflow-hidden rounded-2xl border border-theme bg-surface/40 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] sm:mt-10">
                      <div className="flex items-center gap-2 border-b border-theme px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                        <figcaption className="ml-3 truncate font-mono text-xs text-zinc-500">
                          {project.url
                            ? project.url.replace(/^https?:\/\//, "")
                            : project.name}
                        </figcaption>
                      </div>
                      <div className="relative aspect-[16/10] w-full bg-black/40">
                        <Image
                          src={project.heroImage!}
                          alt={project.heroAlt!}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 1120px"
                          className="object-cover object-top"
                        />
                      </div>
                    </figure>
                  ) : null}

                  <p className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:mt-10 sm:text-lg">
                    {project.intro}
                  </p>

                  <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2">
                    <section className="theme-card rounded-2xl p-5 sm:p-6">
                      <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                        The problem
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {project.problem}
                      </p>
                    </section>
                    <section className="theme-card rounded-2xl p-5 sm:p-6">
                      <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                        {isInDevelopment ? "Our approach" : "Our solution"}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {project.solution}
                      </p>
                    </section>
                  </div>

                  <section className="mt-8 max-w-3xl sm:mt-10">
                    <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                      {isInDevelopment ? "Where we are" : "Outcome"}
                    </h4>
                    {project.outcome.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>

                  <section className="mt-8 max-w-3xl sm:mt-10">
                    <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                      {isInDevelopment ? "What we are building toward" : "What we delivered"}
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {project.delivered.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-theme px-3 py-1 text-xs text-zinc-500 sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </article>
            );
          })}
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
