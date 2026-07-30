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
 * Near-native Lenis on desktop trackpads/mice.
 * Touch devices keep browser momentum scrolling (no Lenis overhead).
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

    const lenis = new Lenis({
      autoRaf: true,
      // Near-native response — high lerp removes the “scroll lag” feel.
      lerp: 0.32,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      anchors: {
        offset: 72,
        lerp: 0.28,
      },
    });

    const onScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        root.classList.add("is-scrolling");
      }
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        isScrolling = false;
        root.classList.remove("is-scrolling");
      }, 100);
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
