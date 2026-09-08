/** @type {import('tailwindcss').Config} */
//
// TWO palettes live here on purpose.
//
// 1. The DARK EDITORIAL system (void/bark/steel/bone/signal/volt) drives the
//    public site. It is the palette the revamp is built on.
// 2. The LEGACY semantic keys (cream/ink/lime/forest/line) are kept — with
//    their existing light values — because the whole /admin tree is a light
//    dashboard styled with them. Retargeting those values would have flipped
//    the admin panel to black as a side effect.
//
// Note the legacy names are historical: `lime` is azure, `forest` is navy.
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./screens/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- dark editorial (public site) ----
        void: "#04070F", // page ground
        bark: "#080D1A", // recessed panels
        steel: "#0E1626", // raised surfaces / cards
        "steel-soft": "#141F35", // hover surface
        bone: "#F2F5FA", // light content band
        "bone-dim": "#E3E9F3", // light band, second tone
        signal: "#4DA3FF", // primary accent (azure)
        "signal-deep": "#1E5FD8", // accent on light surfaces
        "signal-soft": "#A9CBFF", // accent text on dark
        volt: "#5DE4E4", // secondary accent (cyan)

        // ---- legacy light system (admin dashboard) ----
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
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Instrument Serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      // Fluid type — every display size scales with the viewport instead of
      // stepping at breakpoints, which is what gives the reference its poster feel.
      fontSize: {
        "fluid-xs": "clamp(0.72rem, 0.68rem + 0.15vw, 0.8rem)",
        "fluid-sm": "clamp(0.85rem, 0.8rem + 0.22vw, 0.95rem)",
        "fluid-base": "clamp(0.98rem, 0.92rem + 0.3vw, 1.12rem)",
        "fluid-lg": "clamp(1.1rem, 1rem + 0.5vw, 1.35rem)",
        "fluid-xl": "clamp(1.35rem, 1.1rem + 1.1vw, 2rem)",
        "fluid-2xl": "clamp(1.75rem, 1.3rem + 2vw, 3rem)",
        "fluid-3xl": "clamp(2.2rem, 1.4rem + 3.4vw, 4.5rem)",
        "fluid-4xl": "clamp(2.8rem, 1.4rem + 5.6vw, 7rem)",
        "fluid-mega": "clamp(3.4rem, 0.9rem + 9.6vw, 12rem)",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      borderRadius: {
        xl2: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(12,30,62,0.04), 0 8px 24px rgba(12,30,62,0.07)",
        lift: "0 20px 50px -12px rgba(11,35,80,0.35)",
        deep: "0 40px 90px -50px rgba(0,0,0,1)",
        panel: "0 20px 60px -24px rgba(0,0,0,0.9)",
      },
      transitionTimingFunction: {
        // The reference's signature ease — a long, soft settle.
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #0B2350 0%, #071A3D 100%)",
        "lime-gradient": "linear-gradient(135deg, #5AA0FF 0%, #2E6BFF 100%)",
        "signal-gradient": "linear-gradient(135deg, #5DE4E4 0%, #4DA3FF 55%, #1E5FD8 100%)",
      },
    },
  },
  plugins: [],
};
