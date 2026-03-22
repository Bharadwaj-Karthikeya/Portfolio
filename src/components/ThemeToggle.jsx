import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const buttonClasses = clsx(
    "flex items-center justify-center rounded-full border px-2 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    isDark
      ? "border-white/20 text-white hover:bg-white/10"
      : "border-black/10 text-black hover:bg-black/5",
    className,
  );

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      className={buttonClasses}
    >
      <span className="flex items-center">
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </span>
    </button>
  );
}
