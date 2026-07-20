"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

function Track({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`${reverse ? "marquee-track-reverse" : "marquee-track"} flex w-max gap-8 sm:gap-12`}
    >
      {loop.map((tech, i) => (
        <span
          key={`${tech}-${i}`}
          className="group flex shrink-0 items-center gap-3 font-display text-sm font-semibold tracking-wide text-zinc-500 transition-colors duration-300 hover:text-foreground sm:gap-4 sm:text-base"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-yellow)] opacity-50 transition-opacity group-hover:opacity-100" />
          {tech}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden border-y border-theme bg-background py-5 transition-colors duration-500 sm:py-7"
    >
      <div className="marquee-fade-l absolute top-0 left-0 z-10 h-full w-16 sm:w-28" />
      <div className="marquee-fade-r absolute top-0 right-0 z-10 h-full w-16 sm:w-28" />

      <div className="space-y-4">
        <Track items={siteConfig.techStack} />
        <Track items={[...siteConfig.techStack].reverse()} reverse />
      </div>
    </motion.section>
  );
}
