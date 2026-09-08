/**
 * Band tokens for a section. Sections alternate between the two dark grounds
 * for rhythm, and an occasional "light" band breaks the page the way the
 * reference's bone-coloured stretch does. Every section accepts a `tone`
 * override from the admin panel.
 */
const TONES = {
  dark: {
    light: false,
    bg: "bg-void",
    text: "text-bone",
    heading: "text-bone",
    body: "text-bone/60",
    muted: "text-bone/40",
    border: "border-white/[0.08]",
    hairline: "bg-white/10",
    card: "border-white/[0.08] bg-white/[0.03]",
    cardHover: "hover:border-signal/40 hover:bg-white/[0.06]",
    accent: "text-signal",
    grid: "bg-grid",
    button: "btn-primary",
  },
  deep: {
    light: false,
    bg: "bg-bark",
    text: "text-bone",
    heading: "text-bone",
    body: "text-bone/60",
    muted: "text-bone/40",
    border: "border-white/[0.08]",
    hairline: "bg-white/10",
    card: "border-white/[0.08] bg-white/[0.035]",
    cardHover: "hover:border-signal/40 hover:bg-white/[0.07]",
    accent: "text-signal",
    grid: "bg-grid",
    button: "btn-primary",
  },
  light: {
    light: true,
    bg: "bg-bone",
    text: "text-void",
    heading: "text-void",
    body: "text-void/65",
    muted: "text-void/45",
    border: "border-void/[0.08]",
    hairline: "bg-void/10",
    card: "border-void/[0.08] bg-white",
    cardHover: "hover:border-signal-deep/40 hover:shadow-lift",
    accent: "text-signal-deep",
    grid: "bg-grid-dark",
    button: "btn-dark",
  },
};

export function toneOf(tone) {
  return TONES[tone] || TONES.dark;
}

export const TONE_KEYS = Object.keys(TONES);
