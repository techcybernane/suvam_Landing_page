import Reveal from "../../ui/Reveal.jsx";
import Marquee from "../../ui/Marquee.jsx";
import { toneOf } from "../../../lib/tone.js";

/**
 * Partner / vendor / certification-body wall. Names are plain text so the
 * client can maintain the list from the admin panel without sourcing logo
 * files; any entry with an `image` renders its mark instead.
 */
export default function LogoStrip({ data, tone }) {
  if (!data?.logos?.length) return null;
  const t = toneOf(tone);

  const items = data.logos.map((logo, i) =>
    logo?.image ? (
      <img
        key={i}
        src={logo.image}
        alt={logo.name || ""}
        loading="lazy"
        // On dark bands, knock supplied marks back to a flat white silhouette
        // so a wall of mismatched brand colours still reads as one row.
        className={`h-8 w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 ${
          t.light ? "" : "brightness-0 invert"
        }`}
      />
    ) : (
      <span
        key={i}
        className={`font-display text-fluid-lg font-medium tracking-tight transition-colors duration-300 ${
          t.light ? "text-void/45 hover:text-void" : "text-bone/40 hover:text-bone"
        }`}
      >
        {logo.name}
      </span>
    )
  );

  return (
    <section className={`relative border-t ${t.border} ${t.bg} py-16 md:py-20`}>
      <div className="container-page">
        {data.heading && (
          <Reveal variant="fade" duration={800}>
            <p className={`text-center font-mono text-fluid-xs uppercase tracking-[0.22em] ${t.muted}`}>
              {data.heading}
            </p>
          </Reveal>
        )}
      </div>
      <Reveal delay={120} className="mt-10">
        <Marquee items={items} speed={Number(data.speed) > 0 ? Number(data.speed) : 42} separator="·" />
      </Reveal>
    </section>
  );
}
