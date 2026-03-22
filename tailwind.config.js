/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        "accent-strong": "var(--color-accent-strong)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"General Sans"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        glass: "0 20px 50px rgba(17, 17, 26, 0.25)",
        neon: "0 20px 45px rgba(255, 211, 105, 0.4)",
        "neon-dark": "0 20px 45px rgba(102, 94, 255, 0.35)",
      },
      backgroundImage: {
        "nav-glass":
          "linear-gradient(120deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
        "hero-day":
          "radial-gradient(circle at 90% 10%, rgba(255, 236, 179, 0.6), transparent 55%)",
        "hero-night":
          "radial-gradient(circle at 80% 0%, rgba(104, 92, 255, 0.6), transparent 45%)",
      },
      keyframes: {
        float: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(8px, -6px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        fall: {
          "0%": { transform: "translateY(-120px) scale(0.9)", opacity: 0 },
          "60%": { opacity: 1 },
          "100%": { transform: "translateY(0) scale(1)", opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        fall: "fall 0.9s ease-out forwards",
        "slide-in": "slideIn 0.6s ease forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
