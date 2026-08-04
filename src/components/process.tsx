"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItem,
} from "@/components/ui/animated-section";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <AnimatedSection
      id="process"
      atmosphere="flow"
      className="relative py-16 sm:py-24 lg:py-32"
    >
      <div className="section-divider absolute top-0 right-0 left-0 z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
            Process
          </p>
          <TextReveal className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
            How we work
          </TextReveal>
          <FadeUp className="mt-3 text-base leading-relaxed text-zinc-400 sm:mt-4 sm:text-lg">
            A simple, clear process that keeps every project on track — and you
            involved from start to finish.
          </FadeUp>
        </div>

        <div ref={trackRef} className="relative mt-10 sm:mt-16">
          <div className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-white/10 lg:block" />
          <motion.div
            aria-hidden
            className="absolute top-8 right-[12%] left-[12%] hidden h-px origin-left bg-gradient-to-r from-[var(--accent-yellow)] via-teal-200 to-transparent lg:block"
            style={{ scaleX: lineScale }}
          />

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {siteConfig.process.map((step) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                className="group relative"
              >
                <div className="theme-card h-full rounded-2xl p-5 transition-all duration-300 group-hover:border-[var(--border-hover)] sm:p-6">
                  <span className="relative z-10 font-mono text-sm text-[var(--accent-yellow)]">
                    {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight sm:mt-4 sm:text-xl">
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
      </div>
    </AnimatedSection>
  );
}
