"use client";

import { type RefObject } from "react";
import { useInView } from "framer-motion";

export type SectionAtmosphere = "aurora" | "rings" | "flow" | "signal";

type SectionScrollBgProps = {
  targetRef: RefObject<HTMLElement | null>;
  variant: SectionAtmosphere;
};

/**
 * Restored section atmospheres for desktop + mobile.
 * CSS-driven motion only; mounts when near viewport for scroll performance.
 */
export function SectionScrollBg({ targetRef, variant }: SectionScrollBgProps) {
  const isNear = useInView(targetRef, { margin: "25% 0px" });

  if (!isNear) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40"
      />
    );
  }

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden [contain:paint]"
      >
        {variant === "aurora" ? (
          <div className="section-atm section-atm--aurora absolute inset-[-8%]">
            <div className="section-atm-aurora-band section-atm-aurora-band--a" />
            <div className="section-atm-aurora-band section-atm-aurora-band--b" />
            <div className="section-atm-aurora-band section-atm-aurora-band--c" />
            <div className="section-atm-sweep" />
          </div>
        ) : null}

        {variant === "rings" ? (
          <div className="section-atm section-atm--rings absolute inset-0">
            <div className="section-atm-rings-wrap">
              <span className="section-atm-ring section-atm-ring--1" />
              <span className="section-atm-ring section-atm-ring--2" />
              <span className="section-atm-ring section-atm-ring--3" />
            </div>
            <div className="section-atm-core" />
          </div>
        ) : null}

        {variant === "flow" ? (
          <div className="section-atm section-atm--flow absolute inset-[-6%]">
            <div className="section-atm-flow-streams">
              <span className="section-atm-stream section-atm-stream--1" />
              <span className="section-atm-stream section-atm-stream--2" />
              <span className="section-atm-stream section-atm-stream--3" />
            </div>
            <div className="section-atm-flow-dots">
              {Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="section-atm-dot"
                  style={{
                    top: `${16 + ((i * 19) % 68)}%`,
                    left: `${10 + ((i * 27) % 80)}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </div>
            <div className="section-atm-flow-glow" />
          </div>
        ) : null}

        {variant === "signal" ? (
          <div className="section-atm section-atm--signal absolute inset-0">
            <div className="section-atm-signal-orb section-atm-signal-orb--a" />
            <div className="section-atm-signal-orb section-atm-signal-orb--b" />
            <div className="section-atm-radar">
              <span className="section-atm-radar-ring section-atm-radar-ring--1" />
              <span className="section-atm-radar-ring section-atm-radar-ring--2" />
              <span className="section-atm-radar-ring section-atm-radar-ring--3" />
              <span className="section-atm-radar-sweep" />
            </div>
          </div>
        ) : null}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/15 to-background/50"
      />
    </>
  );
}
