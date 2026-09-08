import Reveal from "../../ui/Reveal.jsx";
import CountUp from "../../ui/CountUp.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { toneOf } from "../../../lib/tone.js";

/**
 * A row of headline metrics that count up from zero as the band enters view.
 * Values are authored as plain strings ("24/7", "360°", "80%") and only the
 * numeric part animates.
 */
export default function StatsBand({ data, tone, num }) {
  if (!data?.stats?.length) return null;
  const t = toneOf(tone);
  const cols =
    data.stats.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : data.stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className={`${t.grid} pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} aria-hidden />

      <div className="container-page relative">
        <SectionHeading
          num={num}
          kicker={data.kicker}
          heading={data.heading}
          accent={data.accent}
          intro={data.intro}
          tone={tone}
          align={data.align === "left" ? "left" : "center"}
        />

        <div className={`mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border ${t.border} ${cols}`}>
          {data.stats.map((st, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className={`relative flex flex-col justify-between gap-6 p-8 ${
                t.light ? "bg-white" : "bg-white/[0.03]"
              } sm:p-10`}
            >
              <CountUp
                display={st.value}
                className={`block text-fluid-3xl font-semibold leading-[0.85] tracking-tightest ${
                  t.light ? "text-void" : "text-bone"
                }`}
              />
              <p className={`font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.16em] ${t.muted}`}>
                {st.label}
              </p>
            </Reveal>
          ))}
        </div>

        {data.footnote && (
          <Reveal delay={200}>
            <p className={`mt-10 text-center text-fluid-sm ${t.muted}`}>{data.footnote}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
