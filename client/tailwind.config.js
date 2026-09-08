/** @type {import('tailwindcss').Config} */
// Palette note: the semantic key names below (cream/ink/lime/forest/line) are kept
// stable so the whole component tree keeps its existing class names, but the VALUES
// are a professional blue IT-company system:
//   cream  = light blue-tinted page background
//   ink    = deep navy primary text
//   lime   = the luminous azure accent (readable both on navy and as a fill)
//   forest = deep navy brand surface
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#EEF3FB",
        ink: "#0C1E3E",
        "ink-soft": "#5A6884",
        lime: {
          DEFAULT: "#2F6BEB",
          dark: "#1E54C9",
          light: "#DCE8FF",
          glow: "#82AEFF",
        },
        forest: {
          DEFAULT: "#0B2350",
          soft: "#12305F",
          deep: "#071A3D",
        },
        line: "#DBE3F1",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(12,30,62,0.04), 0 8px 24px rgba(12,30,62,0.07)",
        lift: "0 20px 50px -12px rgba(11,35,80,0.35)",
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #0B2350 0%, #071A3D 100%)",
        "lime-gradient": "linear-gradient(135deg, #5AA0FF 0%, #2E6BFF 100%)",
      },
    },
  },
  plugins: [],
};
