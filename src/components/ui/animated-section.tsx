"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  SectionScrollBg,
  type SectionAtmosphere,
} from "@/components/section-scroll-bg";

const ease = [0.16, 1, 0.3, 1] as const;

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** Unique scroll-reactive background (not the Services cyber scene). */
  atmosphere?: SectionAtmosphere;
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
  atmosphere,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: 0.9, delay, ease }}
      className={cn("relative", atmosphere && "overflow-hidden", className)}
    >
      {atmosphere ? (
        <SectionScrollBg targetRef={ref} variant={atmosphere} />
      ) : null}
      {children}
    </motion.section>
  );
}

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};
