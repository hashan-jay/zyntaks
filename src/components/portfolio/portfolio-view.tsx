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
    <main className="relative flex-1">
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
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
            conversation to a live site your customers can use.
          </FadeUp>
        </div>
      </section>

      <section className="relative pb-20 sm:pb-28 lg:pb-32">
        <div className="section-divider absolute top-0 right-0 left-0" />

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
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
                      {String(index + 1).padStart(2, "0")} · {project.category}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
                      {project.name}
                    </h2>
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
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-theme bg-surface/40 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] sm:mt-10">
                  <div className="flex items-center gap-2 border-b border-theme px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                    <span className="ml-3 truncate font-mono text-xs text-zinc-500">
                      {project.url.replace(/^https?:\/\//, "")}
                    </span>
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
                </div>

                <p className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:mt-10 sm:text-lg">
                  {project.intro}
                </p>

                <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2">
                  <div className="theme-card rounded-2xl p-5 sm:p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                      The problem
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {project.problem}
                    </p>
                  </div>
                  <div className="theme-card rounded-2xl p-5 sm:p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]">
                      Our solution
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {project.solution}
                    </p>
                  </div>
                </div>

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

      <section className="relative border-t border-theme py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Have a product to ship?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Tell us what you&apos;re building — we&apos;ll map the problem, craft
            the solution, and get it live.
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
