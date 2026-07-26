"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const CODE_LINES = [
  "const ship = await build(idea)",
  "pipeline.deploy({ env: 'prod' })",
  "scale(cluster, { replicas: 12 })",
];

const NODES = [
  [78, 22],
  [86, 30],
  [92, 42],
  [84, 52],
  [74, 46],
  [70, 32],
  [88, 60],
  [96, 28],
];

/**
 * Services cyber background restored for desktop + mobile.
 * CSS animations only (no scroll-linked transforms) so Lenis stays smooth.
 */
export function ServicesScrollBg() {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useInView(ref, { margin: "25% 0px", amount: 0.05 });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {!isNear ? (
        <div className="services-cyber-sky absolute inset-0 opacity-60" />
      ) : (
        <>
          <div className="services-cyber-sky absolute inset-[-8%]" />
          <div className="services-cyber-nebula services-cyber-nebula--a" />
          <div className="services-cyber-nebula services-cyber-nebula--b" />

          <div className="services-cyber-floor">
            <div className="services-cyber-grid" />
          </div>

          <div className="services-cyber-panel services-cyber-panel--code">
            <div className="services-cyber-panel__bar">
              <span />
              <span />
              <span />
            </div>
            <div className="services-cyber-panel__body font-mono">
              {CODE_LINES.map((line) => (
                <p key={line}>
                  <span className="services-cyber-panel__kw">→</span> {line}
                </p>
              ))}
            </div>
          </div>

          <div className="services-cyber-panel services-cyber-panel--chart">
            <svg
              viewBox="0 0 200 90"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="svcChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(103,232,249,0.45)" />
                  <stop offset="100%" stopColor="rgba(103,232,249,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0 70 C20 62, 35 40, 55 48 S90 20, 110 28 S150 55, 170 35 S190 20, 200 28 L200 90 L0 90 Z"
                fill="url(#svcChartFill)"
              />
              <path
                d="M0 70 C20 62, 35 40, 55 48 S90 20, 110 28 S150 55, 170 35 S190 20, 200 28"
                fill="none"
                stroke="rgba(167,139,250,0.85)"
                strokeWidth="2"
              />
            </svg>
          </div>

          <svg
            className="services-cyber-network"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <g stroke="rgba(186,156,255,0.35)" strokeWidth="0.25" fill="none">
              <line x1="78" y1="22" x2="86" y2="30" />
              <line x1="86" y1="30" x2="92" y2="42" />
              <line x1="92" y1="42" x2="84" y2="52" />
              <line x1="84" y1="52" x2="74" y2="46" />
              <line x1="74" y1="46" x2="70" y2="32" />
              <line x1="70" y1="32" x2="78" y2="22" />
              <line x1="86" y1="30" x2="70" y2="32" />
              <line x1="84" y1="52" x2="88" y2="60" />
              <line x1="92" y1="42" x2="96" y2="28" />
            </g>
            {NODES.map(([cx, cy], i) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={i % 3 === 0 ? 1.1 : 0.7}
                fill={
                  i % 2 === 0
                    ? "rgba(103,232,249,0.9)"
                    : "rgba(220,200,255,0.85)"
                }
              />
            ))}
          </svg>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/50" />
    </div>
  );
}
