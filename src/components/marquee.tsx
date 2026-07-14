"use client";

import { siteConfig } from "@/lib/site-config";

export function Marquee() {
  const items = [...siteConfig.techStack, ...siteConfig.techStack];

  return (
    <section className="relative overflow-hidden border-y border-theme bg-background py-4 transition-colors duration-500 sm:py-6">
      <div className="marquee-fade-l absolute top-0 left-0 z-10 h-full w-12 sm:w-24" />
      <div className="marquee-fade-r absolute top-0 right-0 z-10 h-full w-12 sm:w-24" />

      <div className="marquee-track flex w-max gap-8 sm:gap-12">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex shrink-0 items-center gap-2 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-white sm:gap-3 sm:text-sm"
          >
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
