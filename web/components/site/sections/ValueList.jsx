import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { toneOf } from "../../../lib/tone.js";

/**
 * A dense tag wall — service lists, certification names, capability keywords.
 * Each tag lifts in on its own delay so the block assembles rather than blinks.
 */
export default function ValueList({ data, tone, num }) {
  if (!data?.items?.length) return null;
  const t = toneOf(tone);

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className="animate-breathe pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-signal/[0.09] blur-[130px]" aria-hidden />

      <div className="container-page relative">
        <SectionHeading
          num={num}
          kicker={data.kicker}
          heading={data.heading}
          intro={data.subheading || data.intro}
          accent={data.accent}
          tone={tone}
          align="center"
        />

        <div className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-2.5">
          {data.items.map((item, i) => (
            <Reveal key={i} delay={i * 45} duration={800}>
              <span
                className={`group inline-flex items-center gap-2.5 rounded-pill border px-5 py-2.5 text-fluid-sm font-medium transition-all duration-300 ease-editorial hover:-translate-y-0.5 ${t.card} ${t.heading} ${
                  t.light ? "hover:border-void hover:bg-void hover:text-bone" : "hover:border-signal hover:bg-signal hover:text-void"
                }`}
              >
                <span
                  className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                    t.light ? "bg-signal-deep group-hover:bg-signal" : "bg-signal group-hover:bg-void"
                  }`}
                  aria-hidden
                />
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
