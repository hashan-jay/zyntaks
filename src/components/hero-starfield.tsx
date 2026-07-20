"use client";

type Star = {
  id: number;
  x: string;
  y: string;
  size: string;
  duration: string;
  delay: string;
  minOpacity: string;
  maxOpacity: string;
  bright?: boolean;
};

function round(value: number, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function pct(value: number) {
  return `${round(value, 4)}%`;
}

function px(value: number) {
  return `${round(value, 2)}px`;
}

function sec(value: number) {
  return `${round(value, 3)}s`;
}

function unitless(value: number) {
  return `${round(value, 4)}`;
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function createStars(count: number, layer: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = layer * 1000 + i;
    const bright = pseudoRandom(seed + 50) > 0.92;
    const opacity = 0.25 + pseudoRandom(seed + 3) * 0.75;
    const size = bright
      ? 2 + pseudoRandom(seed + 2) * 1.5
      : 0.5 + pseudoRandom(seed + 2) * 1.5;

    return {
      id: layer * 1000 + i,
      x: pct(pseudoRandom(seed) * 100),
      y: pct(pseudoRandom(seed + 1) * 100),
      size: px(size),
      duration: sec(2 + pseudoRandom(seed + 4) * 5),
      delay: sec(pseudoRandom(seed + 5) * 6),
      minOpacity: unitless(0.1 + opacity * 0.15),
      maxOpacity: unitless(0.55 + opacity * 0.45),
      bright,
    };
  });
}

const smallStars = createStars(140, 1);
const mediumStars = createStars(45, 2);
const brightStars = createStars(12, 3).map((s) => {
  const size = 2.5 + pseudoRandom(s.id) * 2;
  return {
    ...s,
    bright: true,
    size: px(size),
  };
});

const shootingStars = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  top: pct(8 + pseudoRandom(i + 20) * 35),
  left: pct(pseudoRandom(i + 30) * 70),
  delay: sec(i * 9 + pseudoRandom(i + 40) * 6),
  duration: sec(14 + pseudoRandom(i + 50) * 4),
}));

function StarSpan({ star }: { star: Star }) {
  return (
    <span
      className={`star ${star.bright ? "star-bright" : ""}`}
      style={{
        left: star.x,
        top: star.y,
        width: star.size,
        height: star.size,
        animationDuration: star.duration,
        animationDelay: star.delay,
        ["--star-min" as string]: star.minOpacity,
        ["--star-max" as string]: star.maxOpacity,
      }}
    />
  );
}

export function HeroStarfield() {
  return (
    <div aria-hidden className="sky-scene pointer-events-none absolute inset-0 overflow-hidden">
      <div className="sky-bg absolute inset-0 transition-colors duration-700" />
      <div className="sky-glow absolute inset-0 transition-opacity duration-700" />

      <div className="star-layer-small absolute inset-0">
        {smallStars.map((star) => (
          <StarSpan key={star.id} star={star} />
        ))}
      </div>

      <div className="star-layer-medium absolute inset-0">
        {mediumStars.map((star) => (
          <StarSpan key={star.id} star={star} />
        ))}
      </div>

      <div className="star-layer-bright absolute inset-0">
        {brightStars.map((star) => (
          <StarSpan key={star.id} star={star} />
        ))}
      </div>

      {shootingStars.map((s) => (
        <span
          key={s.id}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}

      <div className="sky-horizon" />
    </div>
  );
}
