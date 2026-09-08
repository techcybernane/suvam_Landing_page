import Reveal from "./Reveal.jsx";
import RevealWords from "./RevealWords.jsx";

/**
 * The shared section opener: a monospaced "02 / What we do" kicker on a hairline
 * rule, a large word-by-word display heading, and an optional intro paragraph.
 *
 * `accent` is appended to the heading in serif italic. `tone` picks the palette
 * for the band the section sits on.
 */
export default function SectionHeading({
  num,
  kicker,
  heading,
  accent,
  intro,
  tone = "dark",
  align = "left",
  className = "",
  headingClassName = "",
  as = "h2",
}) {
  if (!kicker && !heading && !intro) return null;
  const light = tone === "light";
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-4xl"} ${className}`}>
      {(kicker || num) && (
        <Reveal variant="fade" duration={800}>
          <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
            {num && (
              <span
                className={`font-mono text-fluid-xs font-semibold tracking-[0.22em] ${
                  light ? "text-signal-deep" : "text-signal"
                }`}
              >
                {num}
              </span>
            )}
            <span
              aria-hidden
              className={`h-px w-10 ${light ? "bg-void/20" : "bg-white/20"}`}
            />
            {kicker && (
              <span
                className={`font-mono text-fluid-xs font-semibold uppercase tracking-[0.22em] ${
                  light ? "text-void/55" : "text-bone/50"
                }`}
              >
                {kicker}
              </span>
            )}
          </div>
        </Reveal>
      )}

      {heading && (
        <RevealWords
          as={as}
          start={80}
          stagger={45}
          text={heading}
          highlight={accent}
          highlightClassName={light ? "accent-dark" : "accent"}
          className={`mt-6 text-fluid-3xl font-semibold leading-[0.95] tracking-tightest ${
            light ? "text-void" : "text-bone"
          } ${headingClassName}`}
        />
      )}

      {intro && (
        <Reveal variant="blur" delay={180} duration={1000}>
          <p
            className={`mt-7 max-w-2xl text-fluid-base leading-relaxed ${
              centered ? "mx-auto" : ""
            } ${light ? "text-void/60" : "text-bone/55"}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
