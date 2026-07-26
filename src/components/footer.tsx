import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SiteLogo } from "@/components/site-logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t border-theme bg-background pt-12 transition-colors duration-500 sm:pt-16"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:gap-10 md:flex-row md:items-center">
          <div className="w-full md:w-auto md:max-w-xl">
            <SiteLogo className="site-logo h-9 w-auto sm:h-11" />
            <p className="mt-3 max-w-xs text-sm text-zinc-500 sm:mt-4">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
              Zyntaks is a software development studio on zyntaks.lk — we build
              web applications, cloud platforms, UI/UX, APIs, and digital
              products for teams that need to ship with confidence.
            </p>
          </div>

          <ul className="flex w-full flex-wrap gap-x-6 gap-y-3 sm:w-auto sm:gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-block py-1 text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none relative z-0 mx-auto mt-2 w-full select-none text-center font-display text-[clamp(5.5rem,28vw,18rem)] font-semibold leading-[0.75] tracking-[-0.07em] text-foreground opacity-10 sm:mt-3"
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
              href="https://nextjs.org"
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
