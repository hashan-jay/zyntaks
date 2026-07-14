"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { AnimatedSection } from "@/components/ui/animated-section";

export function Stats() {
  return (
    <AnimatedSection className="relative py-12 sm:py-20 lg:py-24">
      <div className="section-divider absolute top-0 right-0 left-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs leading-snug text-zinc-500 sm:mt-2 sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
