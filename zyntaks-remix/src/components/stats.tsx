"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { AnimatedSection } from "@/components/ui/animated-section";

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const numeric = parseFloat(value.replace(/[^\d.]/g, ""));
  const suffix = value.replace(/[\d.]/g, "");
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 });

  useEffect(() => {
    if (isInView) motionValue.set(Number.isFinite(numeric) ? numeric : 0);
  }, [isInView, motionValue, numeric]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (!ref.current) return;
      if (!Number.isFinite(numeric)) {
        ref.current.textContent = value;
        return;
      }
      const rounded = Number.isInteger(numeric)
        ? Math.round(latest)
        : latest.toFixed(1);
      ref.current.textContent = `${rounded}${suffix}`;
    });
    return unsub;
  }, [spring, numeric, suffix, value]);

  if (!Number.isFinite(numeric)) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <AnimatedSection className="relative py-16 sm:py-24 lg:py-28">
      <div className="section-divider absolute top-0 right-0 left-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative text-center"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--section-tint)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.04em]">
                <AnimatedValue value={stat.value} />
              </div>
              <div className="mt-2 text-xs leading-snug text-zinc-500 sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
