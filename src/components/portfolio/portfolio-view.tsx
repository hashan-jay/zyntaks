"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function PortfolioView() {
  const projects = siteConfig.portfolio;

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
            Selected work
          </p>
          <TextReveal
            as="h1"
            className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-5xl md:text-6xl"
          >
            Portfolio
          </TextReveal>
          <FadeUp className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-5 sm:text-lg">
            Real products designed, built, and deployed by Zyntaks — from first
            conversation to a live site your customers can use. This portfolio
            highlights production web applications shipped for clients who needed
            a clear digital presence, stronger conversion paths, and reliable
            modern engineering.
          </FadeUp>
          <FadeUp
            delay={0.08}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            Each case study below explains the business problem, the product
            approach we took, and the live result. As Zyntaks grows, this page
            will expand with more launched products across web development,
            mobile experiences, and digital transformation work.
          </FadeUp>
        </div>
      </header>

      <section
        aria-labelledby="portfolio-cases-heading"
        className="relative pb-20 sm:pb-28 lg:pb-32"
      >
        <div className="section-divider absolute top-0 right-0 left-0" />
        <h2 id="portfolio-cases-heading" className="sr-only">
          Portfolio case studies
        </h2>

        <div className="mx-auto max-w-6xl space-y-20 px-4 pt-14 sm:space-y-28 sm:px-6 sm:pt-20 lg:px-8">
          {projects.map((project, index) => (
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
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
                      {String(index + 1).padStart(2, "0")} · {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">
                      {project.year} · {project.role}
                    </p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-theme bg-surface/50 px-4 text-sm font-medium text-foreground transition-all hover:border-[var(--border-hover)] hover:bg-surface"
                  >
                    Visit live site
                    <span aria-hidden className="text-[var(--accent-yellow)]">
                      ↗
                    </span>
                  </a>
                </header>

                <figure className="mt-8 overflow-hidden rounded-2xl border border-theme bg-surface/40 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] sm:mt-10">
                  <div className="flex items-center gap-2 border-b border-theme px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                    <figcaption className="ml-3 truncate font-mono text-xs text-zinc-500">
                      {project.url.replace(/^https?:\/\//, "")}
                    </figcaption>
                  </div>
                  <div className="relative aspect-[16/10] w-full bg-black/40">
                    <Image
                      src={project.heroImage}
                      alt={project.heroAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 1120px"
                      className="object-cover object-top"
                    />
                  </div>
                </figure>

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
                      Our solution
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {project.solution}
                    </p>
                  </section>
                </div>

                <section className="mt-8 max-w-3xl sm:mt-10">
                  <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                    Outcome
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    The launched product gives the client a professional,
                    shareable web presence with clear calls to action, package
                    discovery, and a direct WhatsApp path for new members. It
                    demonstrates how Zyntaks turns an offline or social-only
                    business into a conversion-ready digital experience —
                    designed, engineered, and deployed end to end.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    For visitors, the site answers the essentials quickly: what
                    the studio offers, who it is for, where sessions happen, and
                    how to start. For the business, it creates a durable brand
                    asset that can be shared in chats, maps listings, and local
                    marketing — without relying on temporary social posts alone.
                  </p>
                </section>

                <section className="mt-8 max-w-3xl sm:mt-10">
                  <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                    What we delivered
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    <li>
                      Responsive marketing website with a clear hero, brand
                      story, and conversion-focused layout.
                    </li>
                    <li>
                      Package and class presentation that helps prospects compare
                      options before reaching out.
                    </li>
                    <li>
                      Location and contact flows that reduce friction for first-
                      time visitors in Wattala and nearby areas.
                    </li>
                    <li>
                      Production deployment with a WhatsApp-first inquiry path
                      for faster follow-up.
                    </li>
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
          ))}
        </div>
      </section>

      <section
        aria-labelledby="portfolio-cta-heading"
        className="relative border-t border-theme py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="portfolio-cta-heading"
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
