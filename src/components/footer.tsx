"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { resolveNavHref } from "@/lib/nav";
import { SiteLogo } from "@/components/site-logo";

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer
      className="relative overflow-x-clip border-t border-theme bg-background pt-12 transition-colors duration-500 sm:pt-16"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <SiteLogo className="site-logo h-6 w-auto max-w-full shrink-0 self-start sm:h-7" />
            <nav aria-label="Footer" className="w-full min-w-0 sm:w-auto">
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end sm:gap-x-6 sm:gap-y-2.5">
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
            </nav>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">
            {siteConfig.tagline}
          </p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none relative z-0 mx-auto mt-2 w-full max-w-full select-none overflow-hidden px-2 text-center font-display text-[clamp(2.75rem,17vw,11rem)] font-semibold leading-none tracking-[-0.06em] text-foreground opacity-10 sm:mt-3 sm:px-0 sm:text-[clamp(3.5rem,18vw,11rem)] sm:leading-[0.75] sm:tracking-[-0.07em]"
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
