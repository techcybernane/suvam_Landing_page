import Marquee from "../../ui/Marquee.jsx";
import { toneOf } from "../../../lib/tone.js";

/**
 * Full-bleed keyword ticker between two heavier sections — a breath in the
 * page rhythm that also reinforces the vocabulary of the brand.
 */
export default function MarqueeStrip({ data, tone }) {
  if (!data?.items?.length) return null;
  const t = toneOf(tone);
  const speed = Number(data.speed) > 0 ? Number(data.speed) : 34;

  return (
    <section className={`relative border-y ${t.border} ${t.bg} py-7`}>
      <Marquee
        items={data.items}
        speed={speed}
        reverse={!!data.reverse}
        itemClassName={`font-display text-fluid-xl font-medium tracking-tight ${
          t.light ? "text-void/70" : "text-bone/70"
        }`}
      />
    </section>
  );
}
