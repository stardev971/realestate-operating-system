import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f0ff",
          100: "#e6e4ff",
          200: "#d0ccff",
          300: "#b0a8ff",
          400: "#8b7cff",
          500: "#6c5ce7",
          600: "#5b4bd6",
          700: "#4d3eb5",
          800: "#403593",
          900: "#372f78",
        },
        ink: {
          DEFAULT: "#0f1222",
          soft: "#3a3f55",
          muted: "#6b7280",
        },
        canvas: "#f5f6fa",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 18, 34, 0.04), 0 4px 16px rgba(16, 18, 34, 0.04)",
        cardhover: "0 2px 6px rgba(16, 18, 34, 0.06), 0 12px 28px rgba(16, 18, 34, 0.08)",
        pop: "0 8px 30px rgba(16, 18, 34, 0.12)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.1rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
