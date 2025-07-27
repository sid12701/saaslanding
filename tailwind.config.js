/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1280px" } },
    extend: {
      // Figtree as the default sans
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },

      // Brand palette from your specimen
      colors: {
        primary: {
          25:  "#EAF5FF",
          50:  "#CEE9FE",
          100: "#9CDBFF",
          200: "#41C2FF",
          300: "#008ec1", // confirm this shade if needed
          400: "#0080AE",
          500: "#007BA7",
          600: "#005B7D",
          700: "#003E56",
          800: "#002331",
          900: "#001721",
          DEFAULT: "#007BA7",
          foreground: "#ffffff",
        },

        // semantic tokens used across the site
        border: "hsl(214 10% 90%)",
        input: "hsl(214 10% 90%)",
        ring: "#007BA7",
        background: "#ffffff",
        foreground: "hsl(225 15% 12%)",
        muted: { DEFAULT: "hsl(220 14% 96%)", foreground: "hsl(220 9% 46%)" },
        accent: { DEFAULT: "hsl(220 14% 96%)", foreground: "hsl(225 15% 12%)" },
        card: { DEFAULT: "#ffffff", foreground: "hsl(225 15% 12%)" },
      },

      borderRadius: { lg: "14px", xl: "20px", "2xl": "24px", "3xl": "32px", pill: "9999px" },
      boxShadow: {
        soft: "0 8px 24px rgba(16, 24, 40, 0.08)",
        pill: "0 8px 12px rgba(0,123,167,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
        nav: "0 8px 0 0 rgba(0,0,0,0.02), 0 16px 32px rgba(16,24,40,0.08)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 18s linear infinite" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
