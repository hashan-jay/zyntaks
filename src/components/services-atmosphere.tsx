"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Services atmosphere — layered orbits, traveling lights, soft aurora.
 * Distinct from the old cyber panels / network scene.
 */
export function ServicesAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useInView(ref, { margin: "20% 0px", amount: 0.05 });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {!isNear ? (
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
      ) : (
        <>
          <div className="svc-atm absolute inset-0">
            <span className="svc-atm-aurora svc-atm-aurora--a" />
            <span className="svc-atm-aurora svc-atm-aurora--b" />
            <span className="svc-atm-aurora svc-atm-aurora--c" />

            <span className="svc-atm-sheen" />

            <span className="svc-atm-ring svc-atm-ring--lg" />
            <span className="svc-atm-ring svc-atm-ring--md" />
            <span className="svc-atm-ring svc-atm-ring--sm" />

            <svg
              className="svc-atm-arcs"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                className="svc-atm-arc svc-atm-arc--1"
                d="M8 72 C 28 40, 48 38, 72 58 S 96 78, 102 52"
                fill="none"
              />
              <path
                className="svc-atm-arc svc-atm-arc--2"
                d="M-4 28 C 22 18, 44 46, 68 34 S 94 12, 108 30"
                fill="none"
              />
            </svg>

            <span className="svc-atm-comet svc-atm-comet--1" />
            <span className="svc-atm-comet svc-atm-comet--2" />
            <span className="svc-atm-comet svc-atm-comet--3" />

            <span className="svc-atm-spark svc-atm-spark--1" />
            <span className="svc-atm-spark svc-atm-spark--2" />
            <span className="svc-atm-spark svc-atm-spark--3" />
            <span className="svc-atm-spark svc-atm-spark--4" />
            <span className="svc-atm-spark svc-atm-spark--5" />
            <span className="svc-atm-spark svc-atm-spark--6" />
            <span className="svc-atm-spark svc-atm-spark--7" />
            <span className="svc-atm-spark svc-atm-spark--8" />

            <span className="svc-atm-glyph svc-atm-glyph--a" />
            <span className="svc-atm-glyph svc-atm-glyph--b" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/8 to-background/60" />
        </>
      )}
    </div>
  );
}
