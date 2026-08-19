"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatBlogCreated } from "@/lib/blog-date";
import { blogPath, getBlogEntries } from "@/lib/blog";
import {
  StaggerContainer,
  staggerItem,
} from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

type BlogCardsProps = {
  excludeSlug?: string;
  className?: string;
};

export function BlogCards({ excludeSlug, className }: BlogCardsProps) {
  const entries = getBlogEntries().filter(
    (entry) => entry.slug !== excludeSlug
  );

  if (entries.length === 0) return null;

  return (
    <StaggerContainer
      className={cn(
        "grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3",
        className
      )}
    >
      {entries.map((entry) => {
        const href = blogPath(entry.slug);
        const createdLabel = formatBlogCreated(entry.created);

        return (
          <motion.div key={entry.slug} variants={staggerItem}>
            <Link
              href={href}
              className="card-shine theme-card group relative flex h-full flex-col rounded-2xl p-5 text-left sm:p-6"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--mouse-x",
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  "--mouse-y",
                  `${e.clientY - rect.top}px`
                );
              }}
            >
              <time
                dateTime={entry.created}
                className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-yellow)]"
              >
                {createdLabel}
              </time>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight sm:text-xl">
                {entry.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                {entry.summary}
              </p>
              <span className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full border border-theme bg-foreground px-4 text-sm font-medium text-background transition-opacity group-hover:opacity-90">
                Read more
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </StaggerContainer>
  );
}
