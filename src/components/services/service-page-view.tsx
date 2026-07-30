"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/site-config";
import {
  servicePages,
  type ServicePage,
} from "@/lib/service-pages";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const seoExploreCard = {
  href: "/seo",
  icon: "⟡",
  title: "SEO & Performance Optimization",
  description:
    "Website SEO, technical SEO, Next.js SEO, and performance optimization that turn search traffic into customers.",
} as const;

type ServicePageViewProps = {
  service: ServicePage;
};

export function ServicePageView({ service }: ServicePageViewProps) {
  const whatsappUrl = getWhatsAppUrl(
    `Hi Zyntaks! I would like to discuss ${service.title}.`
  );
  const related = servicePages.filter((item) => item.slug !== service.slug);

  return (
    <main className="relative flex-1">
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
            {service.eyebrow}
          </p>
          <TextReveal
            as="h1"
            className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-5xl md:text-6xl"
          >
            {service.heading}
          </TextReveal>
          <FadeUp className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:mt-5 sm:text-lg">
            {service.intro}
          </FadeUp>
          <FadeUp delay={0.08} className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-theme bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Talk about this service
            </a>
            <Link
              href="/#services"
              className="inline-flex h-11 items-center rounded-full border border-theme px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              All services
            </Link>
          </FadeUp>
        </div>
      </header>

      <section className="relative border-t border-theme py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              {service.whatItIs.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              {service.whatItIs.body}
            </p>
            <ul className="mt-6 space-y-3">
              {service.whatItIs.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-yellow)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              {service.whyNeedIt.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              {service.whyNeedIt.body}
            </p>
            <ul className="mt-6 space-y-3">
              {service.whyNeedIt.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-yellow)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative border-t border-theme py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Benefits
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            What teams gain when Zyntaks delivers {service.shortTitle.toLowerCase()}.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.45, delay: i * 0.04, ease }}
                className="theme-card rounded-2xl p-5 text-sm leading-relaxed text-zinc-300"
              >
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative border-t border-theme py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            How we approach {service.shortTitle.toLowerCase()}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Every engagement starts with clarity: who the product is for, what
            success looks like, and which constraints matter most. From there we
            design the experience, build in iterative milestones, and ship a
            production-ready result you can measure. You stay close to progress
            through demos and written updates, so decisions stay practical and
            the roadmap stays honest.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            After launch we can hand off cleanly or continue with improvements —
            performance, SEO foundations, new features, and maintenance — so the
            product keeps matching your business as it grows.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="service-faq-heading"
        className="relative border-t border-theme py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="service-faq-heading"
            className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          >
            FAQs
          </h2>
          <div className="mt-8 space-y-4 sm:mt-10">
            {service.faqs.map((faq) => (
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Explore more services
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="theme-card group flex h-full flex-col rounded-2xl p-5 transition-colors"
                >
                  <span className="text-xl text-zinc-600 transition-colors group-hover:text-foreground">
                    {item.icon}
                  </span>
                  <span className="mt-3 font-medium text-foreground">
                    {item.shortTitle}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {item.description}
                  </span>
                  <span className="mt-4 text-sm text-zinc-600 transition-colors group-hover:text-foreground">
                    Learn more →
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={seoExploreCard.href}
                className="theme-card group flex h-full flex-col rounded-2xl p-5 transition-colors"
              >
                <span className="text-xl text-zinc-600 transition-colors group-hover:text-foreground">
                  {seoExploreCard.icon}
                </span>
                <span className="mt-3 font-medium text-foreground">
                  {seoExploreCard.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {seoExploreCard.description}
                </span>
                <span className="mt-4 text-sm text-zinc-600 transition-colors group-hover:text-foreground">
                  Learn more →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="relative border-t border-theme py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Ready to start with {service.shortTitle.toLowerCase()}?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Tell us what you are building — we will map the approach and get you
            to a clear next step.
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
              href="/portfolio"
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
