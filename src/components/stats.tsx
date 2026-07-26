"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { AnimatedSection } from "@/components/ui/animated-section";

function parseStatValue(value: string) {
  if (value.includes("/")) {
    const [left, right] = value.split("/");
    return {
      numeric: Number.parseFloat(left),
      suffix: `/${right}`,
      decimals: 0,
    };
  }

  const numeric = Number.parseFloat(value.replace(/[^\d.]/g, ""));
  const suffix = value.replace(/[\d.]/g, "");
  const decimals = value.includes(".") ? 1 : 0;

  return { numeric, suffix, decimals };
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const { numeric, suffix, decimals } = parseStatValue(value);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 });

  useEffect(() => {
    if (isInView && Number.isFinite(numeric)) {
      motionValue.set(numeric);
    }
  }, [isInView, motionValue, numeric]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (!ref.current) return;
      if (!Number.isFinite(numeric)) {
        ref.current.textContent = value;
        return;
      }
      const rounded =
        decimals > 0 ? latest.toFixed(decimals) : `${Math.round(latest)}`;
      ref.current.textContent = `${rounded}${suffix}`;
    });
    return unsub;
  }, [spring, numeric, suffix, decimals, value]);

  if (!Number.isFinite(numeric)) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {decimals > 0 ? `0.${"0".repeat(decimals)}` : "0"}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <AnimatedSection
      atmosphere="rings"
      className="relative py-12 sm:py-20 lg:py-24"
    >
      <div className="section-divider absolute top-0 right-0 left-0 z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:text-5xl">
                <AnimatedValue value={stat.value} />
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
