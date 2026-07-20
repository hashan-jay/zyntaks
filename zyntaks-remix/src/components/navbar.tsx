"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";

const ease = [0.16, 1, 0.3, 1] as const;

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
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.15, ease }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled ? "nav-scrolled" : "bg-transparent"
        )}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link href="/" className="relative flex shrink-0 items-center gap-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Image
                src="/images/zyntaks-logo.png"
                alt={siteConfig.name}
                width={240}
                height={77}
                className="site-logo h-8 w-auto sm:h-9"
                priority
              />
            </motion.div>
          </Link>

          <ul className="hidden items-center gap-7 lg:gap-9 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link text-sm text-theme-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton
              href="#contact"
              strength={0.25}
              className="h-9 items-center rounded-full border border-theme bg-surface/50 px-4 text-sm font-medium text-foreground transition-all hover:border-[var(--border-hover)] hover:bg-surface"
            >
              Get in touch
            </MagneticButton>
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

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 28px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 28px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 28px)" }}
            transition={{ duration: 0.55, ease }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/96 px-6 backdrop-blur-2xl md:hidden"
            style={{
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <ul className="flex w-full max-w-sm flex-col items-center gap-2">
              {siteConfig.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="w-full text-center"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-display text-3xl font-semibold tracking-tight text-foreground"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="w-full pt-4"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease }}
              >
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="theme-btn-primary flex h-12 w-full items-center justify-center rounded-full px-8 text-lg font-semibold"
                >
                  Get in touch
                </a>
              </motion.li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
