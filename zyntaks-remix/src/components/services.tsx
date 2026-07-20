"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItem,
} from "@/components/ui/animated-section";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";
import {
  ServiceDetailPanel,
  type ServiceItem,
} from "@/components/service-detail-panel";

export function Services() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  return (
    <AnimatedSection id="services" className="section-aura relative py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
              01 — Services
            </p>
          </FadeUp>
          <TextReveal className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Everything you need to go from idea to production
          </TextReveal>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-5 sm:text-lg">
              From MVPs to enterprise platforms — we deliver software that performs
              under real-world pressure.
            </p>
          </FadeUp>
        </div>

        <StaggerContainer className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => (
            <motion.button
              key={service.id}
              type="button"
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveService(service)}
              className="card-shine theme-card group relative rounded-2xl p-5 text-left sm:p-6"
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
              <div className="flex items-start justify-between gap-3">
                <span className="text-2xl text-zinc-600 transition-colors duration-300 group-hover:text-[var(--accent-yellow)]">
                  {service.icon}
                </span>
                <span className="font-mono text-[10px] text-zinc-600 transition-colors group-hover:text-zinc-400">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight sm:mt-5 sm:text-xl">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {service.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors group-hover:text-foreground">
                Learn more
                <motion.span
                  className="inline-block"
                  initial={false}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          ))}
        </StaggerContainer>
      </div>

      <ServiceDetailPanel
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </AnimatedSection>
  );
}
