"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItem,
} from "@/components/ui/animated-section";

export function Process() {
  return (
    <AnimatedSection id="process" className="relative py-16 sm:py-24 lg:py-32">
      <div className="section-divider absolute top-0 right-0 left-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 sm:text-sm">
            Process
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
            How we work
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:mt-4 sm:text-lg">
            A proven framework that keeps projects on track and stakeholders
            in the loop.
          </p>
        </div>

        <StaggerContainer className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {siteConfig.process.map((step, i) => (
            <motion.div
              key={step.step}
              variants={staggerItem}
              className="group relative"
            >
              {i < siteConfig.process.length - 1 && (
                <div className="absolute top-8 left-full hidden h-px w-full bg-gradient-to-r from-white/10 to-transparent lg:block" />
              )}
              <div className="theme-card h-full rounded-2xl p-5 transition-all duration-300 group-hover:border-[var(--border-hover)] sm:p-6">
                <span className="font-mono text-sm text-zinc-600">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-medium sm:mt-4 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
