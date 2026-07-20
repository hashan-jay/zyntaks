"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type TextRevealProps = {
  children: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
};

export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = children.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: "110%", rotate: 4, opacity: 0 },
    visible: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.85, ease },
    },
  };

  return (
    <div ref={ref}>
      <Tag className={cn(className)} aria-label={children}>
        <motion.span
          className="inline-flex flex-wrap"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
          aria-hidden
        >
          {words.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="mr-[0.28em] inline-block overflow-hidden pb-[0.12em]"
            >
              <motion.span className="inline-block origin-bottom-left" variants={word}>
                {w}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Tag>
    </div>
  );
}

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 36, filter: "blur(8px)" }
      }
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
