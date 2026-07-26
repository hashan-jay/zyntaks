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
 * Responsive Lenis on fine-pointer devices (mouse/trackpad).
 * Touch / coarse pointers keep native scrolling — smoother and cheaper.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    // Phones/tablets: native momentum scrolling feels better and avoids jank.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const root = document.documentElement;
    let scrollEndTimer = 0;

    const lenis = new Lenis({
      autoRaf: true,
      // Higher lerp = closer to native; avoids the "lagging behind" feel.
      lerp: 0.16,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      anchors: {
        offset: 72,
        lerp: 0.14,
      },
    });

    const onScroll = () => {
      root.classList.add("is-scrolling");
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        root.classList.remove("is-scrolling");
      }, 140);
    };

    lenis.on("scroll", onScroll);
    lenisInstance = lenis;

    return () => {
      window.clearTimeout(scrollEndTimer);
      root.classList.remove("is-scrolling");
      lenis.off("scroll", onScroll);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
