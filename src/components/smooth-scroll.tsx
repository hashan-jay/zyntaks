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

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Native scroll is smoother when the page has heavy animated layers
    if (reduceMotion) return;

    const lenis = new Lenis({
      // Snappier than before — long lerp felt like sticky / stuck scrolling
      duration: 0.55,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
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
      if (lenisInstance === lenis) {
        lenisInstance = null;
      }
    };
  }, []);

  return <>{children}</>;
}
