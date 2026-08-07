"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/site-config";
import { seoPageContent } from "@/lib/seo-page";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function SeoLanding() {
  const whatsappUrl = getWhatsAppUrl(
    "Hi Zyntaks! I am interested in SEO and website optimization services."
  );

  return (
    <main id="main-content" className="relative flex-1">
      <header className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36">
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
            SEO & website optimization
          </p>
          <TextReveal
            as="h1"
            className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-5xl md:text-6xl"
          >
            {seoPageContent.heading}
          </TextReveal>
          <FadeUp className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:mt-5 sm:text-lg">
            {seoPageContent.intro}
          </FadeUp>
          <FadeUp delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-theme bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get an SEO audit
            </a>
            <Link
              href="/#services"
              className="inline-flex h-11 items-center rounded-full border border-theme px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              View all services
            </Link>
          </FadeUp>
        </div>
      </header>

      <section className="relative border-t border-theme py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            What we optimize
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Search rankings start with engineering. We combine SEO strategy with
            the same delivery quality we use to ship production web apps.
          </p>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2">
            {seoPageContent.pillars.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                className="theme-card rounded-2xl p-5 sm:p-6"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {pillar.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-theme py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            How Zyntaks delivers SEO results
          </h2>
          <ol className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {seoPageContent.process.map((item, i) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <p className="font-mono text-xs tracking-[0.22em] text-[var(--accent-yellow)]">
                  {item.step}
                </p>
                <h3 className="mt-2 font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-t border-theme py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Why technical SEO matters for modern sites
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Beautiful design alone does not rank. Search engines need crawlable
            HTML, clear metadata, stable URLs, fast Core Web Vitals, and
            structured data that matches what visitors see. When those layers are
            weak, even strong content underperforms — especially on JavaScript-
            heavy frameworks if rendering and indexing are not handled carefully.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Zyntaks pairs SEO strategy with hands-on engineering so fixes land in
            production: metadata, schema, performance, and page structure. That
            is how Sri Lankan businesses and remote-first teams get durable gains
            instead of audit PDFs that never get implemented.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="seo-faq-heading"
        className="relative border-t border-theme py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="seo-faq-heading"
            className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          >
            SEO questions we hear most
          </h2>
          <div className="mt-8 space-y-4 sm:mt-10">
            {seoPageContent.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-theme px-5 py-4"
              >
                <h3 className="font-medium text-foreground">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-theme py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Ready for website SEO that actually ships?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Talk to Zyntaks about technical SEO services, Next.js SEO, and
            website optimization in Sri Lanka.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-theme bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Start a project
            </a>
            <Link
              href="/blog"
              className="inline-flex h-11 items-center rounded-full border border-theme px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
