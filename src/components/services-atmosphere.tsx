"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { HeroStarfield } from "@/components/hero-starfield";

/**
 * Services sky — the same twinkling field and shooting stars as the hero,
 * masked into the section so the cards stay readable.
 * Mounted after hydrate; star motion pauses while scrolling.
 */
export function ServicesAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const isNear = useInView(ref, { margin: "20% 0px", amount: 0.05 });

  useEffect(() => {
    setReady(true);
  }, []);

  const active = ready && isNear;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {active ? <HeroStarfield variant="section" /> : null}
      <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-transparent to-background/55" />
    </div>
  );
}
