"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.16, 1, 0.3, 1] as const;

export function IntroLoader() {
  const [phase, setPhase] = useState<"boot" | "mark" | "exit" | "done">("boot");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("mark"), 180);
    const t2 = setTimeout(() => setPhase("exit"), 1600);
    const t3 = setTimeout(() => setPhase("done"), 2300);
    document.documentElement.classList.add("intro-locked");

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.documentElement.classList.remove("intro-locked");
    };
  }, []);

  useEffect(() => {
    if (phase === "done") {
      document.documentElement.classList.remove("intro-locked");
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          key="intro"
          className="intro-loader fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 45%, rgba(34,211,238,0.18), transparent 42%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              className="mb-8 h-px w-16 origin-left bg-cyan-300/80"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === "boot" ? 0 : 1 }}
              transition={{ duration: 0.7, ease }}
            />

            <motion.p
              className="font-display text-[clamp(2.75rem,10vw,6.5rem)] font-semibold tracking-[-0.04em] text-white"
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={
                phase === "exit"
                  ? { opacity: 0, y: -28, filter: "blur(10px)", scale: 1.06 }
                  : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
              }
              transition={{ duration: 0.75, ease }}
            >
              {siteConfig.name}
            </motion.p>

            <motion.p
              className="mt-3 font-mono text-xs uppercase tracking-[0.35em] text-white/45 sm:text-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={
                phase === "exit"
                  ? { opacity: 0, y: -10 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.25, ease }}
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              className="mt-10 h-1 w-40 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-cyan-300 via-teal-200 to-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.25, delay: 0.2, ease }}
              />
            </motion.div>
          </div>

          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"
            animate={phase === "exit" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
