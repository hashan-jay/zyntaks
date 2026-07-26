"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisScrollLocked(locked: boolean) {
  if (!lenisInstance) return;
  if (locked) {
    lenisInstance.stop();
  } else {
    lenisInstance.start();
  }
}

/**
 * Snappy Lenis — short duration so scroll feels real-time,
 * without the sticky lag of longer smooth-scroll settings.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 0.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1.15,
    });

    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
