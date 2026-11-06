"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { resolveNavHref } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/site-logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 20;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const contactHref = resolveNavHref("#contact", pathname);
  const navItems = siteConfig.nav.filter((item) => item.href !== "#contact");

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500 ease-out",
          scrolled
            ? "inset-x-3 top-[max(0.75rem,env(safe-area-inset-top,0px))] sm:inset-x-4 sm:top-[max(1rem,env(safe-area-inset-top,0px))]"
            : "inset-x-0 top-0 pt-[env(safe-area-inset-top,0px)]"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-500 ease-out",
            scrolled
              ? "nav-scrolled h-11 max-w-5xl rounded-2xl px-3.5 sm:h-14 sm:px-6 lg:px-8"
              : "h-16 max-w-6xl bg-transparent px-4 sm:h-20 sm:px-6 lg:px-8"
          )}
        >
          <Link href="/" className="relative flex shrink-0 items-center gap-2">
            <SiteLogo
              className={cn(
                "site-logo w-auto transition-all duration-500 ease-out",
                scrolled ? "h-5 sm:h-6" : "h-6 sm:h-7"
              )}
              priority
            />
          </Link>

          <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navItems.map((item) => {
              const href = resolveNavHref(item.href, pathname);
              const isActive =
                item.href === "/blog"
                  ? pathname === "/blog" || pathname.startsWith("/blog/")
                  : false;

              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-[15px] transition-colors hover:text-[var(--brand-cyan)]",
                      isActive
                        ? "text-foreground"
                        : "text-[color:color-mix(in_srgb,var(--foreground)_72%,transparent)]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Link
              href={contactHref}
              className={cn(
                "nav-cta group px-4 transition-all duration-500 ease-out",
                scrolled ? "h-8" : "h-9"
              )}
            >
              <span className="nav-cta-dot" aria-hidden />
              <span className="relative">Get in touch</span>
              <span
                aria-hidden
                className="relative transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
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
      </header>

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
          {navItems.map((item, i) => (
            <motion.li
              key={item.href}
              className="w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={resolveNavHref(item.href, pathname)}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-2xl font-medium text-foreground"
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
          <motion.li
            className="w-full pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: navItems.length * 0.08 }}
          >
            <Link
              href={contactHref}
              onClick={() => setMobileOpen(false)}
              className="nav-cta group h-12 w-full px-8 text-base"
            >
              <span className="nav-cta-dot" aria-hidden />
              <span className="relative">Get in touch</span>
              <span
                aria-hidden
                className="relative transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </motion.li>
        </ul>
      </motion.div>
    </>
  );
}
