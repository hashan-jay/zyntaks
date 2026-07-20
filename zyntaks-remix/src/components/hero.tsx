"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { HeroStarfield } from "@/components/hero-starfield";
import { useTheme } from "@/components/theme-provider";
import { MagneticButton } from "@/components/ui/magnetic-button";

const ease = [0.16, 1, 0.3, 1] as const;

function MottoWords() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % siteConfig.motto.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 1.55 } },
      }}
      className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-[clamp(1.5rem,4.5vw,3.75rem)] font-medium lowercase tracking-[-0.03em] sm:mt-4 sm:gap-x-5"
    >
      {siteConfig.motto.map((word, i) => (
        <motion.span
          key={word}
          variants={{
            hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.65, ease },
            },
          }}
          className="relative"
        >
          <span
            className={`transition-colors duration-500 ${
              activeIndex === i ? "text-foreground" : "text-theme-soft"
            }`}
          >
            {word}
          </span>
          {activeIndex === i ? (
            <motion.span
              layoutId="motto-underline"
              className="absolute -bottom-1 left-0 h-px w-full bg-[var(--accent-yellow)]"
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            />
          ) : null}
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
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.96]);

  const nightCursor = useMotionTemplate`radial-gradient(560px circle at ${springX}px ${springY}px, rgba(103,232,249,0.08), transparent 55%)`;
  const dayCursor = useMotionTemplate`radial-gradient(560px circle at ${springX}px ${springY}px, rgba(8,145,178,0.12), transparent 55%)`;
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
        transition={{ duration: 1.6, delay: 0.4 }}
        style={{ y: heroY }}
      >
        <HeroStarfield />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[1] grid-bg hero-grid-drift opacity-70" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden sm:block"
        style={{ background: cursorGlow }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <h1 className="max-w-5xl font-display font-semibold tracking-[-0.05em] text-foreground">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.045, delayChildren: 0.85 } },
            }}
            aria-label={siteConfig.name}
            className="hero-brand inline-flex justify-center text-[clamp(3.5rem,14vw,9.5rem)] leading-[0.9]"
          >
            {siteConfig.name.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 80, rotateX: -40, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.8, ease },
                  },
                }}
                className="hero-shimmer-text inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>

          <MottoWords />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.85, ease }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-theme-muted sm:mt-9 sm:text-lg md:text-xl"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.05, ease }}
          className="mt-9 flex w-full max-w-md flex-col gap-3 sm:mt-11 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
        >
          <MagneticButton
            href="#contact"
            className="theme-btn-primary group relative h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-sm font-semibold transition-colors duration-500 sm:w-auto"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.7 }}
            />
            <span className="relative">Start a project</span>
            <span className="relative transition-transform group-hover:translate-x-1">→</span>
          </MagneticButton>

          <MagneticButton
            href="#work"
            className="theme-btn-secondary h-12 w-full items-center justify-center rounded-full border px-8 text-sm font-semibold backdrop-blur-sm transition-all duration-500 hover:border-[var(--border-hover)] sm:w-auto"
          >
            View our work
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-theme-soft">
            Scroll
          </span>
          <motion.span
            aria-hidden
            className="h-10 w-px origin-top bg-gradient-to-b from-[var(--accent-yellow)] to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
