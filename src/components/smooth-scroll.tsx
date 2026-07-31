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
 * Snappy Lenis on desktop — high lerp + slightly boosted wheel travel
 * so scroll feels smooth without the “lagging behind” feel.
 * Touch devices keep native browser scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const root = document.documentElement;
    let scrollEndTimer = 0;
    let isScrolling = false;
    let rafId = 0;

    const lenis = new Lenis({
      autoRaf: true,
      // Higher lerp = catches the target faster (less sluggish trail).
      lerp: 0.42,
      smoothWheel: true,
      syncTouch: false,
      // Slightly more distance per wheel tick so the page doesn’t feel heavy.
      wheelMultiplier: 1.28,
      touchMultiplier: 1,
      anchors: {
        offset: 72,
        lerp: 0.38,
      },
    });

    const markScrolling = () => {
      if (!isScrolling) {
        isScrolling = true;
        root.classList.add("is-scrolling");
      }
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        isScrolling = false;
        root.classList.remove("is-scrolling");
      }, 120);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        markScrolling();
      });
    };

    lenis.on("scroll", onScroll);
    lenisInstance = lenis;

    return () => {
      window.clearTimeout(scrollEndTimer);
      if (rafId) cancelAnimationFrame(rafId);
      root.classList.remove("is-scrolling");
      lenis.off("scroll", onScroll);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
