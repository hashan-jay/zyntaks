"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/site-logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled ? "nav-scrolled" : "bg-transparent"
        )}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link href="/" className="relative flex shrink-0 items-center gap-2">
            <SiteLogo className="site-logo h-9 w-auto sm:h-11" priority />
          </Link>

          <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-theme-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex h-9 items-center rounded-full border border-theme bg-surface/50 px-4 text-sm font-medium text-foreground transition-all hover:border-[var(--border-hover)] hover:bg-surface"
            >
              Get in touch
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="relative z-50 -mr-1 flex h-11 w-11 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-full bg-foreground transition-all duration-300",
                  mobileOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-full bg-foreground transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-px w-full bg-foreground transition-all duration-300",
                  mobileOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      <motion.div
        initial={false}
        animate={mobileOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" as const },
          closed: { opacity: 0, pointerEvents: "none" as const },
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 px-6 backdrop-blur-xl md:hidden"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <ul className="flex w-full max-w-sm flex-col items-center gap-6">
          {siteConfig.nav.map((item, i) => (
            <motion.li
              key={item.href}
              className="w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.08 }}
            >
              <a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-2xl font-medium text-foreground"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
          <motion.li
            className="w-full pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-full border border-theme px-8 text-lg"
            >
              Get in touch
            </a>
          </motion.li>
        </ul>
      </motion.div>
    </>
  );
}
