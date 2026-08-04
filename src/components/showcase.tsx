"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

const codeLines = [
  { tokens: [{ t: "import", c: "text-purple-400" }, { t: " { createApp } ", c: "text-zinc-300" }, { t: "from", c: "text-purple-400" }, { t: ' "@zyntaks/core"', c: "text-emerald-400" }] },
  { tokens: [] },
  { tokens: [{ t: "const", c: "text-purple-400" }, { t: " app ", c: "text-zinc-300" }, { t: "=", c: "text-zinc-500" }, { t: " createApp", c: "text-blue-400" }, { t: "({", c: "text-zinc-300" }] },
  { tokens: [{ t: "  name:", c: "text-zinc-400" }, { t: ' "YourProduct"', c: "text-emerald-400" }, { t: ",", c: "text-zinc-300" }] },
  { tokens: [{ t: "  scale:", c: "text-zinc-400" }, { t: " true", c: "text-orange-400" }, { t: ",", c: "text-zinc-300" }] },
  { tokens: [{ t: "  deploy:", c: "text-zinc-400" }, { t: ' "instant"', c: "text-emerald-400" }] },
  { tokens: [{ t: "})", c: "text-zinc-300" }] },
  { tokens: [] },
  { tokens: [{ t: "await", c: "text-purple-400" }, { t: " app.", c: "text-zinc-300" }, { t: "launch", c: "text-blue-400" }, { t: "()", c: "text-zinc-300" }, { t: "  ", c: "" }, { t: "// 🚀", c: "text-zinc-600" }] },
];

const features = [
  {
    title: "Websites & apps people enjoy using",
    description:
      "From websites and mobile apps to clear UI/UX design — we build digital experiences that feel simple for your customers and team.",
  },
  {
    title: "Software that fits the way you work",
    description:
      "Custom software, AI automation, and digital transformation that cut busywork and match how your business actually runs — not generic one-size-fits-all tools.",
  },
  {
    title: "Built to grow with your business",
    description:
      "Fast, reliable platforms that stay easy to find online and scale smoothly as your audience, products, and operations expand.",
  },
];

export function Showcase() {
  return (
    <AnimatedSection
      id="work"
      atmosphere="aurora"
      className="relative py-16 sm:py-24 lg:py-32"
    >
      <div className="section-divider absolute top-0 right-0 left-0 z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
              Our approach
            </p>
            <TextReveal className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
              Code that speaks for itself
            </TextReveal>
            <FadeUp className="mt-3 text-base leading-relaxed text-zinc-400 sm:mt-4 sm:text-lg">
              From websites and mobile apps to custom software, design, AI
              automation, and digital transformation — we make technology clear,
              useful, and built to last.
            </FadeUp>

            <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {features.map((feature, i) => (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex gap-3 sm:gap-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs text-zinc-500">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="order-1 animate-float lg:order-2"
            style={{ perspective: 1000 }}
          >
            <div className="code-window overflow-hidden rounded-xl">
              <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2.5 sm:px-4 sm:py-3">
                <span className="dot-red h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" />
                <span className="dot-yellow h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" />
                <span className="dot-green h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" />
                <span className="ml-2 truncate font-mono text-[10px] text-zinc-600 sm:ml-3 sm:text-xs">
                  app.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-6 sm:p-6 sm:text-sm sm:leading-7">
                {codeLines.map((line, li) => (
                  <div key={li} className="flex min-w-max sm:min-w-0">
                    <span className="mr-3 inline-block w-4 shrink-0 select-none text-right text-zinc-700 sm:mr-4">
                      {li + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.tokens.map((tok, ti) => (
                        <span key={ti} className={tok.c}>
                          {tok.t}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
