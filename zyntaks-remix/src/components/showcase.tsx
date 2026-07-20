"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

const codeLines = [
  { tokens: [{ t: "import", c: "text-cyan-400" }, { t: " { createApp } ", c: "text-zinc-300" }, { t: "from", c: "text-cyan-400" }, { t: ' "@zyntaks/core"', c: "text-emerald-400" }] },
  { tokens: [] },
  { tokens: [{ t: "const", c: "text-cyan-400" }, { t: " app ", c: "text-zinc-300" }, { t: "=", c: "text-zinc-500" }, { t: " createApp", c: "text-sky-300" }, { t: "({", c: "text-zinc-300" }] },
  { tokens: [{ t: "  name:", c: "text-zinc-400" }, { t: ' "YourProduct"', c: "text-emerald-400" }, { t: ",", c: "text-zinc-300" }] },
  { tokens: [{ t: "  scale:", c: "text-zinc-400" }, { t: " true", c: "text-amber-300" }, { t: ",", c: "text-zinc-300" }] },
  { tokens: [{ t: "  deploy:", c: "text-zinc-400" }, { t: ' "instant"', c: "text-emerald-400" }] },
  { tokens: [{ t: "})", c: "text-zinc-300" }] },
  { tokens: [] },
  { tokens: [{ t: "await", c: "text-cyan-400" }, { t: " app.", c: "text-zinc-300" }, { t: "launch", c: "text-sky-300" }, { t: "()", c: "text-zinc-300" }, { t: "  ", c: "" }, { t: "// ship it", c: "text-zinc-600" }] },
];

const features = [
  {
    title: "Performance-first",
    description: "Sub-second loads, optimized bundles, and edge-ready deployments.",
  },
  {
    title: "Type-safe by default",
    description: "End-to-end TypeScript for fewer bugs and faster iteration.",
  },
  {
    title: "Built to scale",
    description: "Architecture that grows with your users, not against them.",
  },
];

function TypedCode() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    setVisibleLines(0);
    let line = 0;
    const id = setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= codeLines.length) clearInterval(id);
    }, 140);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div ref={ref} className="code-window overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="dot-red h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" />
        <span className="dot-yellow h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" />
        <span className="dot-green h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" />
        <span className="ml-2 truncate font-mono text-[10px] text-zinc-600 sm:ml-3 sm:text-xs">
          app.ts
        </span>
        <motion.span
          className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-6 sm:p-6 sm:text-sm sm:leading-7">
        {codeLines.map((line, li) => (
          <motion.div
            key={li}
            className="flex min-w-max sm:min-w-0"
            initial={{ opacity: 0, x: -8 }}
            animate={
              li < visibleLines
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -8 }
            }
            transition={{ duration: 0.25 }}
          >
            <span className="mr-3 inline-block w-4 shrink-0 select-none text-right text-zinc-700 sm:mr-4">
              {li + 1}
            </span>
            <span className="whitespace-pre">
              {line.tokens.map((tok, ti) => (
                <span key={ti} className={tok.c}>
                  {tok.t}
                </span>
              ))}
              {li === visibleLines - 1 && visibleLines < codeLines.length ? (
                <motion.span
                  className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-cyan-300 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              ) : null}
            </span>
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

export function Showcase() {
  return (
    <AnimatedSection id="work" className="relative py-20 sm:py-28 lg:py-36">
      <div className="section-divider absolute top-0 right-0 left-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <FadeUp>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
                02 — Our approach
              </p>
            </FadeUp>
            <TextReveal className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Code that speaks for itself
            </TextReveal>
            <FadeUp delay={0.12}>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                Clean architecture, modern tooling, and obsessive attention to detail
                — the foundation of every Zyntaks project.
              </p>
            </FadeUp>

            <ul className="mt-9 space-y-5 sm:mt-10 sm:space-y-6">
              {features.map((feature, i) => (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: -28, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-4"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 font-mono text-xs text-zinc-500 transition-colors group-hover:border-[var(--accent-yellow)] group-hover:text-[var(--accent-yellow)]">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 48, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 animate-float lg:order-2"
            style={{ perspective: 1200 }}
          >
            <TypedCode />
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
