"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 36,
    mass: 0.35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="scroll-progress fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-teal-200 to-white"
      style={{ scaleX }}
    />
  );
}
