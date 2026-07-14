"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { HeroStarfield } from "@/components/hero-starfield";
import { useTheme } from "@/components/theme-provider";

function MottoWords() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % siteConfig.motto.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.85 } },
      }}
      className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-normal lowercase tracking-wide text-2xl sm:mt-3 sm:gap-x-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
    >
      {siteConfig.motto.map((word, i) => (
        <motion.span
          key={word}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
            },
          }}
          className={`transition-colors duration-500 ${
            activeIndex === i ? "text-foreground" : "text-theme-soft"
          }`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const nightCursor = useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, rgba(180,190,255,0.05), transparent 50%)`;
  const dayCursor = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(250,204,21,0.14), rgba(253,224,71,0.05) 35%, transparent 65%)`;
  const cursorGlow = theme === "day" ? dayCursor : nightCursor;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-dvh overflow-hidden bg-background pt-14 transition-colors duration-500 sm:pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
      >
        <HeroStarfield />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden sm:block"
        style={{ background: cursorGlow }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.03 }}
          className="theme-surface mb-6 inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur-md transition-colors duration-500 sm:mb-8 sm:max-w-none sm:px-4 sm:text-sm"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-yellow)] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-yellow)]" />
          </span>
          <span className="truncate sm:whitespace-normal">{siteConfig.heroBadge}</span>
        </motion.div>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
            }}
            className="hero-shimmer-text inline-flex flex-wrap justify-center"
          >
            {siteConfig.name.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -90 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                      duration: 0.55,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  },
                }}
                className="inline-block origin-bottom"
                style={{ perspective: 600 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>

          <MottoWords />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-theme-muted sm:mt-8 sm:text-lg md:text-xl"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="theme-btn-primary group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-sm font-medium transition-colors duration-500 sm:w-auto"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative">Start a project</span>
            <span className="relative transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.a>

          <motion.a
            href="#work"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="theme-btn-secondary inline-flex h-12 w-full items-center justify-center rounded-full border px-8 text-sm font-medium backdrop-blur-sm transition-all duration-500 hover:border-[var(--border-hover)] sm:w-auto"
          >
            View our work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
