"use client";

import { motion, useScroll } from "framer-motion";

/** Lightweight top progress bar — no spring (springs add scroll-frame lag). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="scroll-progress fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-teal-200 to-white will-change-transform"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
