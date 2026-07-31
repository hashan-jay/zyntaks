"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { resolveNavHref } from "@/lib/nav";
import { SiteLogo } from "@/components/site-logo";
import { servicePages } from "@/lib/service-pages";

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer
      className="relative overflow-hidden border-t border-theme bg-background pt-12 transition-colors duration-500 sm:pt-16"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="max-w-sm">
            <SiteLogo className="site-logo h-6 w-auto sm:h-7" />
            <p className="mt-3 text-sm text-zinc-500 sm:mt-4">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Software development and SEO company in Sri Lanka — web apps,
              custom software, and technical SEO built for lasting impact.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={resolveNavHref(item.href, pathname)}
                    className="inline-block py-0.5 text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/seo"
                  className="inline-block py-0.5 text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  SEO services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Services
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {servicePages.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-block py-0.5 text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/seo"
                  className="inline-block py-0.5 text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  SEO & optimization
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none relative z-0 mx-auto mt-2 w-full select-none text-center font-display text-[clamp(3.5rem,18vw,11rem)] font-semibold leading-[0.75] tracking-[-0.07em] text-foreground opacity-10 sm:mt-3"
      >
        {siteConfig.name}
      </p>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-divider mt-2 sm:mt-3" />
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:mt-6 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-xs text-zinc-600 sm:text-sm">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600 sm:text-sm">
            Built with{" "}
            <Link
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
