"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="inline-flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
      role="group"
      aria-label="Theme selection"
    >
      {/* Light */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Switch to light mode"
        title="Switch to light mode"
        className={`p-1.5 rounded-full text-xs transition-all duration-300 ${
          mounted && theme === "light"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-titanium-400 hover:text-white"
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      {/* System */}
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="Follow system theme"
        title="Follow system preference"
        className={`p-1.5 rounded-full text-xs transition-all duration-300 ${
          mounted && theme === "system"
            ? "bg-white/20 text-emerald-glow shadow-sm"
            : "text-titanium-400 hover:text-white"
        }`}
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>

      {/* Dark */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Switch to dark mode"
        title="Switch to dark mode"
        className={`p-1.5 rounded-full text-xs transition-all duration-300 ${
          mounted && theme === "dark"
            ? "bg-white/20 text-white shadow-sm"
            : "text-titanium-400 hover:text-white"
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
