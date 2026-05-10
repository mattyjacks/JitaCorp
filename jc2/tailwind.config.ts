import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1a2a4a",
        teal: "#2d9b9b",
        gold: "#d4af37",
        cream: "#f5f1e8",
        border: "#e0ddd5",
        text: "#2c2c2c",
        "text-light": "#666666",
      },
    },
  },
  plugins: [],
} satisfies Config;
