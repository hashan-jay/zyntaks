"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "night" | "day";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "zyntaks-theme";
const THEME_TRANSITION_MS = 800;

function runThemeTransition(next: Theme, updateState: () => void) {
  const root = document.documentElement;

  const commit = () => {
    root.classList.add("theme-transition");
    updateState();
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, THEME_TRANSITION_MS);
  };

  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(commit);
  } else {
    commit();
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("night");
  const [mounted, setMounted] = useState(false);
  const themeRef = useRef(theme);

  themeRef.current = theme;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "day" || stored === "night") {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
    setMounted(true);
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    if (themeRef.current === next) return;
    runThemeTransition(next, () => setThemeState(next));
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      if (!mounted) {
        setThemeState(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(STORAGE_KEY, next);
        return;
      }
      applyTheme(next);
    },
    [mounted, applyTheme]
  );

  const toggleTheme = useCallback(() => {
    applyTheme(themeRef.current === "night" ? "day" : "night");
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
