import type { Config } from "tailwindcss";

/**
 * Brand design system — "Cape Cod light, natural wood, clean paper,
 * structured financial clarity." Intentionally NOT generic coastal
 * blue-and-white. Adjust the palette here to re-skin the whole platform.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Warm paper backgrounds
        paper: {
          DEFAULT: "#FAF7F1",
          deep: "#F2ECE1",
          edge: "#ECE4D6",
        },
        // Deep harbor slate — primary ink + brand color
        ink: "#172329",
        harbor: {
          DEFAULT: "#1C4B59",
          600: "#1A4451",
          700: "#163B46",
          800: "#112E37",
          50: "#EAF1F2",
        },
        // Muted sea-glass green (secondary accent)
        sea: {
          DEFAULT: "#5E8C84",
          soft: "#9CB8B1",
        },
        // Natural wood / clay (warm accent — craftsmanship)
        wood: {
          DEFAULT: "#B5703E",
          soft: "#CE9C6B",
          50: "#F6ECE0",
        },
        sand: "#E7DDCB",
        fog: "#5C6A6F",
        line: "#E3DBCC",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(23,35,41,0.04), 0 8px 24px -12px rgba(23,35,41,0.12)",
        lift: "0 2px 4px rgba(23,35,41,0.05), 0 18px 40px -20px rgba(23,35,41,0.22)",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
