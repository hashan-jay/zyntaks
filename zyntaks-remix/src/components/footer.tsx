"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t border-theme bg-background py-14 transition-colors duration-500 sm:py-16"
      style={{ paddingBottom: "max(3.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 -bottom-6 text-center font-display text-[clamp(4rem,18vw,12rem)] font-bold leading-none tracking-[-0.06em] select-none"
      >
        {siteConfig.name}
      </motion.p>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
                  className="nav-link inline-block py-1 text-sm text-zinc-500 transition-colors hover:text-foreground"
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
              className="text-zinc-400 transition-colors hover:text-foreground"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
