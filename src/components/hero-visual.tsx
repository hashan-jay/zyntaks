"use client";

import { useRef } from "react";

const NODES = [0, 45, 90, 135, 180, 225, 270, 315];

function point(radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    cx: 200 + Math.cos(rad) * radius,
    cy: 200 + Math.sin(rad) * radius,
  };
}

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--hx", x.toFixed(3));
    event.currentTarget.style.setProperty("--hy", y.toFixed(3));
  };

  const onPointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--hx", "0");
    event.currentTarget.style.setProperty("--hy", "0");
  };

  return (
    <div
      ref={rootRef}
      aria-hidden
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-visual relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block"
    >
      <div className="hero-visual-glow pointer-events-none absolute inset-[8%] rounded-full" />
      <div className="hero-visual-shift relative h-full w-full">
        <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
          <g className="hv-frame" fill="none" stroke="var(--hv-dim)" strokeWidth="1.25">
            <path d="M48 92 V52 H88" />
            <path d="M312 52 H352 V92" />
            <path d="M352 308 V348 H312" />
            <path d="M88 348 H48 V308" />
            <circle cx="200" cy="200" r="188" strokeDasharray="2 10" />
            <path d="M200 28 V52 M200 348 V372 M28 200 H52 M348 200 H372" />
          </g>

          <g className="hv-orbit hv-orbit-slow" fill="none">
            <circle
              cx="200"
              cy="200"
              r="156"
              stroke="var(--hv-line)"
              strokeWidth="1.25"
              strokeDasharray="8 14"
              className="hv-dash"
            />
            {NODES.map((angle) => {
              const { cx, cy } = point(156, angle);
              return (
                <circle
                  key={angle}
                  cx={cx}
                  cy={cy}
                  r={angle % 90 === 0 ? 4.5 : 2.4}
                  fill="var(--hv-node)"
                  className="hv-node"
                />
              );
            })}
          </g>

          <g className="hv-orbit hv-orbit-rev" fill="none">
            <circle
              cx="200"
              cy="200"
              r="112"
              stroke="var(--hv-dim)"
              strokeWidth="1.25"
            />
            <path
              d="M200 88 A112 112 0 0 1 312 200"
              stroke="var(--hv-line)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {[20, 160, 250].map((angle) => {
              const { cx, cy } = point(112, angle);
              return (
                <circle key={angle} cx={cx} cy={cy} r="3.2" fill="var(--hv-core)" />
              );
            })}
          </g>

          <g className="hv-orbit hv-orbit-mid" fill="none">
            <circle
              cx="200"
              cy="200"
              r="68"
              stroke="var(--hv-line)"
              strokeWidth="1.15"
              strokeDasharray="3 7"
            />
          </g>

          <g className="hv-scan" fill="none">
            <path
              d="M200 44 A156 156 0 0 1 332 128"
              stroke="var(--hv-core)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          <g className="hv-core">
            <circle cx="200" cy="200" r="36" fill="var(--hv-glow)" className="hv-pulse" />
            <circle
              cx="200"
              cy="200"
              r="22"
              fill="none"
              stroke="var(--hv-line)"
              strokeWidth="1.4"
            />
            <circle cx="200" cy="200" r="6" fill="var(--hv-core)" />
            <path
              d="M200 176 V188 M200 212 V224 M176 200 H188 M212 200 H224"
              stroke="var(--hv-line)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
