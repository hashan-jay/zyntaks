"use client";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("h-[15px] w-[15px]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("h-[15px] w-[15px]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 3.5v1.75M12 18.75V20.5M4.8 4.8l1.25 1.25M17.95 17.95l1.25 1.25M3.5 12h1.75M18.75 12H20.5M4.8 19.2l1.25-1.25M17.95 6.05l1.25-1.25" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDay = theme === "day";

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="theme-toggle h-11 w-20 rounded-full border border-white/10 bg-[#141416]"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
      aria-pressed={isDay}
      title={isDay ? "Switch to night mode" : "Switch to day mode"}
      className="theme-toggle group relative grid h-11 w-20 grid-cols-2 items-center rounded-full border p-1 transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <span
        aria-hidden
        className={cn(
          "col-start-1 row-start-1 flex items-center justify-center transition-opacity duration-300",
          isDay ? "text-foreground/45 opacity-100" : "opacity-0"
        )}
      >
        <MoonIcon />
      </span>
      <span
        aria-hidden
        className={cn(
          "col-start-2 row-start-1 flex items-center justify-center transition-opacity duration-300",
          isDay ? "opacity-0" : "text-white/50 opacity-100"
        )}
      >
        <SunIcon />
      </span>

      <span
        aria-hidden
        className={cn(
          "theme-toggle-thumb relative col-start-1 row-start-1 flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isDay && "translate-x-full"
        )}
      >
        <MoonIcon
          className={cn(
            "absolute inset-0 m-auto transition-opacity duration-300",
            isDay ? "opacity-0" : "opacity-100"
          )}
        />
        <SunIcon
          className={cn(
            "absolute inset-0 m-auto transition-opacity duration-300",
            isDay ? "opacity-100" : "opacity-0"
          )}
        />
      </span>
      <span className="sr-only">
        {isDay ? "Day mode active" : "Night mode active"}
      </span>
    </button>
  );
}
