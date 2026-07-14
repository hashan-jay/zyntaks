"use client";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDay = theme === "day";

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="theme-toggle z-[9999] h-11 w-[4.75rem] rounded-full border border-border bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md sm:h-12 sm:w-[5.25rem]"
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
      className={cn(
        "theme-toggle z-[9999] flex h-11 w-[4.75rem] shrink-0 items-center justify-between rounded-full border px-1 sm:h-12 sm:w-[5.25rem] sm:px-1.5",
        "border-border bg-surface/95 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md",
        "transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 w-8 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] sm:inset-y-1.5 sm:left-1.5 sm:w-9",
          isDay
            ? "translate-x-[calc(100%+0.125rem)] bg-[var(--accent-yellow)] shadow-[0_0_20px_rgba(250,204,21,0.55)]"
            : "translate-x-0 bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.25)]"
        )}
      />
      <span
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors duration-500 sm:h-9 sm:w-9 sm:text-base",
          !isDay ? "text-background" : "text-muted"
        )}
      >
        ☾
      </span>
      <span
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors duration-500 sm:h-9 sm:w-9 sm:text-base",
          isDay ? "text-white" : "text-muted"
        )}
      >
        ☀
      </span>
      <span className="sr-only">{isDay ? "Day mode active" : "Night mode active"}</span>
    </button>
  );
}
