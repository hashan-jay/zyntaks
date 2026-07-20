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
    <AnimatedSection id="process" className="section-aura relative py-20 sm:py-28 lg:py-36">
      <div className="section-divider absolute top-0 right-0 left-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
              03 — Process
            </p>
          </FadeUp>
          <TextReveal
            as="h2"
            className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
          >
            How we work
          </TextReveal>
          <FadeUp delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
              A proven framework that keeps projects on track and stakeholders
              in the loop.
            </p>
          </FadeUp>
        </div>

        <div ref={trackRef} className="relative mt-12 sm:mt-16">
          <div className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-white/10 lg:block" />
          <motion.div
            className="absolute top-10 right-[12%] left-[12%] hidden h-px origin-left bg-gradient-to-r from-[var(--accent-yellow)] via-teal-200 to-transparent lg:block"
            style={{ scaleX: lineScale }}
          />

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {siteConfig.process.map((step) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative h-full rounded-2xl border border-transparent p-1 transition-colors duration-300 group-hover:border-[var(--border-hover)]">
                  <div className="theme-card h-full rounded-[0.9rem] p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-10 w-10 items-center justify-center">
                        <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-yellow)] opacity-0 group-hover:opacity-100" />
                        <span className="font-mono text-sm text-[var(--accent-yellow)]">
                          {step.step}
                        </span>
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight sm:mt-5">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </AnimatedSection>
  );
}
