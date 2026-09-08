/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F3F4EC",
        ink: "#12140F",
        "ink-soft": "#565D4E",
        lime: {
          DEFAULT: "#B6F21F",
          dark: "#93C90F",
          light: "#E4FA9E",
        },
        forest: {
          DEFAULT: "#0E2415",
          soft: "#163420",
          deep: "#081A0F",
        },
        line: "#E3E5DA",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,20,15,0.04), 0 8px 24px rgba(18,20,15,0.06)",
        lift: "0 20px 50px -12px rgba(14,36,21,0.35)",
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #0E2415 0%, #081A0F 100%)",
        "lime-gradient": "linear-gradient(135deg, #C7FA3C 0%, #93C90F 100%)",
      },
    },
  },
  plugins: [],
};
