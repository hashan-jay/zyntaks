"use client";

import { type RefObject } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type SectionAtmosphere = "aurora" | "rings" | "flow" | "signal";

type SectionScrollBgProps = {
  targetRef: RefObject<HTMLElement | null>;
  variant: SectionAtmosphere;
};

/**
 * Per-section scroll atmospheres — lighter paint cost than Services cyber scene.
 * Only runs scroll-linked transforms while the section is near the viewport.
 */
export function SectionScrollBg({ targetRef, variant }: SectionScrollBgProps) {
  const isNear = useInView(targetRef, { margin: "30% 0px" });
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const sceneOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.45]
  );

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
      <motion.div
        aria-hidden
        data-atm-active=""
        style={{ y, opacity: sceneOpacity }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {variant === "aurora" ? <AuroraScene /> : null}
        {variant === "rings" ? <RingsScene progress={scrollYProgress} /> : null}
        {variant === "flow" ? <FlowScene progress={scrollYProgress} /> : null}
        {variant === "signal" ? <SignalScene /> : null}
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/45 via-background/15 to-background/50 transition-colors duration-500"
      />
    </>
  );
}

function AuroraScene() {
  return (
    <div className="section-atm section-atm--aurora absolute inset-[-8%]">
      <div className="section-atm-aurora-band section-atm-aurora-band--a" />
      <div className="section-atm-aurora-band section-atm-aurora-band--b" />
      <div className="section-atm-sweep" />
    </div>
  );
}

function RingsScene({ progress }: { progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [-6, 8]);
  return (
    <div className="section-atm section-atm--rings absolute inset-0">
      <motion.div style={{ rotate }} className="section-atm-rings-wrap">
        <span className="section-atm-ring section-atm-ring--1" />
        <span className="section-atm-ring section-atm-ring--2" />
        <span className="section-atm-ring section-atm-ring--3" />
      </motion.div>
      <div className="section-atm-core" />
    </div>
  );
}

function FlowScene({ progress }: { progress: MotionValue<number> }) {
  const driftX = useTransform(progress, [0, 1], [-30, 40]);
  return (
    <div className="section-atm section-atm--flow absolute inset-[-6%]">
      <motion.div style={{ x: driftX }} className="section-atm-flow-streams">
        <span className="section-atm-stream section-atm-stream--1" />
        <span className="section-atm-stream section-atm-stream--2" />
      </motion.div>
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
  );
}

function SignalScene() {
  return (
    <div className="section-atm section-atm--signal absolute inset-0">
      <div className="section-atm-signal-orb section-atm-signal-orb--a" />
      <div className="section-atm-radar">
        <span className="section-atm-radar-ring section-atm-radar-ring--1" />
        <span className="section-atm-radar-ring section-atm-radar-ring--2" />
        <span className="section-atm-radar-sweep" />
      </div>
    </div>
  );
}
