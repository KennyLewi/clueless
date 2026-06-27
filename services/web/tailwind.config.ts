import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#1D9E75",
          dark: "#0F6E56",
          tint: "#E1F5EE",
        },
        // Amber used exclusively on the success screen.
        success: {
          fill: "#FBEEDB",
          text: "#7A4A06",
          mark: "#C97B14",
        },
      },
    },
  },
  plugins: [],
};

export default config;
