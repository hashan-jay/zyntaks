import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-theme bg-background py-12 transition-colors duration-500 sm:py-16"
      style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:gap-10 md:flex-row md:items-center">
          <div className="w-full md:w-auto">
            <Image
              src="/images/zyntaks-logo.png"
              alt={siteConfig.name}
              width={220}
              height={70}
              className="site-logo h-8 w-auto sm:h-9"
            />
            <p className="mt-3 max-w-xs text-sm text-zinc-500 sm:mt-4">
              {siteConfig.tagline}
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

        <div className="section-divider mt-10 mb-6 sm:mt-12 sm:mb-8" />

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
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
