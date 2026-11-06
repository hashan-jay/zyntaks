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
    <footer className="relative overflow-x-clip border-t border-theme bg-background pt-12 transition-colors duration-500 sm:pt-16">
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

      <div
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        style={{ paddingBottom: "max(0.25rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="section-divider mt-8 sm:mt-10" />
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
              className="text-zinc-400 transition-colors hover:text-foreground"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>

      <div className="footer-wordmark-clip" aria-hidden>
        <p className="footer-wordmark">{siteConfig.name}</p>
      </div>
    </footer>
  );
}
