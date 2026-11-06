"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [0, 45, 90, 135, 180, 225, 270, 315];
const CENTER = 200;
const BIG_CIRCLE_RADIUS = 188;

type Shot = {
  id: number;
  x: number;
  y: number;
};

function point(radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    cx: 200 + Math.cos(rad) * radius,
    cy: 200 + Math.sin(rad) * radius,
  };
}

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const shotId = useRef(0);
  const lastShotAt = useRef(0);
  const [shots, setShots] = useState<Shot[]>([]);

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

  const spawnShot = (clientX: number, clientY: number, button: number) => {
    if (button !== 0) return;
    const svg = svgRef.current;
    if (!svg) return;
    const matrix = svg.getScreenCTM();
    if (!matrix) return;

    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const local = point.matrixTransform(matrix.inverse());
    const dx = local.x - CENTER;
    const dy = local.y - CENTER;
    if (dx * dx + dy * dy > BIG_CIRCLE_RADIUS * BIG_CIRCLE_RADIUS) return;
    if (Math.hypot(dx, dy) < 14) return;

    const now = performance.now();
    if (now - lastShotAt.current < 40) return;
    lastShotAt.current = now;

    const id = shotId.current++;
    setShots((current) => [...current.slice(-15), { id, x: local.x, y: local.y }]);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const onDown = (event: PointerEvent) => {
      spawnShot(event.clientX, event.clientY, event.button);
    };

    svg.addEventListener("pointerdown", onDown);
    return () => svg.removeEventListener("pointerdown", onDown);
  }, []);

  const removeShot = (id: number) => {
    setShots((current) => current.filter((shot) => shot.id !== id));
  };

  return (
    <div
      ref={rootRef}
      aria-hidden
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={(event) => spawnShot(event.clientX, event.clientY, event.button)}
      className="hero-visual relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block"
    >
      <div className="hero-visual-glow pointer-events-none absolute inset-[8%] rounded-full" />
      <div className="hero-visual-shift relative h-full w-full">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="hv-stage h-full w-full overflow-visible"
        >
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
        {shots.map((shot) => (
          <span
            key={shot.id}
            className="hv-shot"
            style={{
              left: `${(shot.x / 400) * 100}%`,
              top: `${(shot.y / 400) * 100}%`,
            }}
            onAnimationEnd={() => removeShot(shot.id)}
          />
        ))}
      </div>
    </div>
  );
}
