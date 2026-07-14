"use client";

import { useMemo } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  bright?: boolean;
};

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function createStars(count: number, layer: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = layer * 1000 + i;
    const bright = pseudoRandom(seed + 50) > 0.92;
    return {
      id: layer * 1000 + i,
      x: pseudoRandom(seed) * 100,
      y: pseudoRandom(seed + 1) * 100,
      size: bright ? 2 + pseudoRandom(seed + 2) * 1.5 : 0.5 + pseudoRandom(seed + 2) * 1.5,
      opacity: 0.25 + pseudoRandom(seed + 3) * 0.75,
      duration: 2 + pseudoRandom(seed + 4) * 5,
      delay: pseudoRandom(seed + 5) * 6,
      bright,
    };
  });
}

const smallStars = createStars(140, 1);
const mediumStars = createStars(45, 2);
const brightStars = createStars(12, 3).map((s) => ({
  ...s,
  bright: true,
  size: 2.5 + pseudoRandom(s.id) * 2,
}));

export function HeroStarfield() {
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: 8 + pseudoRandom(i + 20) * 35,
        left: pseudoRandom(i + 30) * 70,
        delay: i * 9 + pseudoRandom(i + 40) * 6,
        duration: 14 + pseudoRandom(i + 50) * 4,
      })),
    []
  );

  return (
    <div aria-hidden className="sky-scene pointer-events-none absolute inset-0 overflow-hidden">
      <div className="sky-bg absolute inset-0 transition-colors duration-700" />
      <div className="sky-glow absolute inset-0 transition-opacity duration-700" />
      <div className="sky-orb-wrap sky-orb-wrap--mobile sm:hidden">
        <div className="sky-orb sky-orb--mobile" />
      </div>
      <div className="sky-orb-wrap hidden sm:block">
        <div className="sky-orb" />
      </div>

      <div className="star-layer-small absolute inset-0">
        {smallStars.map((star) => (
          <span
            key={star.id}
            className={`star ${star.bright ? "star-bright" : ""}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              ["--star-min" as string]: `${0.1 + star.opacity * 0.15}`,
              ["--star-max" as string]: `${0.55 + star.opacity * 0.45}`,
            }}
          />
        ))}
      </div>

      <div className="star-layer-medium absolute inset-0">
        {mediumStars.map((star) => (
          <span
            key={star.id}
            className={`star ${star.bright ? "star-bright" : ""}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              ["--star-min" as string]: `${0.1 + star.opacity * 0.15}`,
              ["--star-max" as string]: `${0.55 + star.opacity * 0.45}`,
            }}
          />
        ))}
      </div>

      <div className="star-layer-bright absolute inset-0">
        {brightStars.map((star) => (
          <span
            key={star.id}
            className={`star ${star.bright ? "star-bright" : ""}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              ["--star-min" as string]: `${0.1 + star.opacity * 0.15}`,
              ["--star-max" as string]: `${0.55 + star.opacity * 0.45}`,
            }}
          />
        ))}
      </div>

      {shootingStars.map((s) => (
        <span
          key={s.id}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <div className="sky-horizon" />
    </div>
  );
}
