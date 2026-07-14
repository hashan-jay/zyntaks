"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItem,
} from "@/components/ui/animated-section";
import {
  ServiceDetailPanel,
  type ServiceItem,
} from "@/components/service-detail-panel";

export function Services() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  return (
    <AnimatedSection id="services" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 sm:text-sm">
            Services
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Everything you need to{" "}
            <span className="text-zinc-500">go from idea to production</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:mt-4 sm:text-lg">
            From MVPs to enterprise platforms — we deliver software that performs
            under real-world pressure.
          </p>
        </div>

        <StaggerContainer className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {siteConfig.services.map((service) => (
            <motion.button
              key={service.id}
              type="button"
              variants={staggerItem}
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
              <span className="text-2xl text-zinc-600 transition-colors group-hover:text-white">
                {service.icon}
              </span>
              <h3 className="mt-3 text-base font-medium sm:mt-4 sm:text-lg">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {service.description}
              </p>
              <span className="mt-5 flex items-center gap-1 text-sm text-zinc-600 transition-colors group-hover:text-white sm:mt-6">
                Learn more
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
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
