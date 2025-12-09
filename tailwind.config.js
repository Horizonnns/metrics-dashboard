/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefdf6",
          100: "#d5fbe8",
          200: "#aef6d5",
          300: "#76eebf",
          400: "#38e0a3",
          500: "#009a5c", // Giga Green
          600: "#008751",
          700: "#006c42",
          800: "#005636",
          900: "#00462e",
        },
        secondary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937", // Dark Grey
          900: "#111827",
        },
        surface: "#ffffff",
        background: "#f9fafb", // Very light grey
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 15px rgba(0, 154, 92, 0.3)",
      },
    },
  },
  plugins: [],
};
