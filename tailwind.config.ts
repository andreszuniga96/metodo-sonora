import { defineConfig } from "tailwindcss";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "sonora-dark": "#0f172a",
        "sonora-primary": "#0d9488",
        "sonora-gold": "#fbbf24",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
});
