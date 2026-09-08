import { Check } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import CountUp from "../../ui/CountUp.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { toneOf } from "../../../lib/tone.js";

/**
 * "Here is what we publish, and here is what we won't bend on" — a set of
 * counting headline metrics above a numbered list of non-negotiable rules.
 */
export default function Commitments({ data, tone, num }) {
  const metrics = data?.metrics || [];
  const rules = data?.rules || [];
  if (!metrics.length && !rules.length) return null;
  const t = toneOf(tone);

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div
        className="animate-breathe pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-signal/[0.08] blur-[140px]"
        aria-hidden
      />

      <div className="container-page relative">
        <SectionHeading
          num={num}
          kicker={data.kicker}
          heading={data.heading}
          accent={data.accent}
          intro={data.intro}
          tone={tone}
        />

        {metrics.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal key={i} delay={i * 100} className="relative">
                <span className={`absolute -top-3 left-0 h-px w-full ${t.hairline}`} aria-hidden>
                  <span className="animate-trace absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-signal to-transparent" />
                </span>
                <CountUp
                  display={m.value}
                  className={`block text-fluid-3xl font-semibold leading-[0.85] tracking-tightest ${t.heading}`}
                />
                <p className={`mt-4 max-w-[14rem] font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.16em] ${t.muted}`}>
                  {m.label}
                </p>
              </Reveal>
            ))}
          </div>
        )}

        {rules.length > 0 && (
          <div className={`mt-20 grid gap-px overflow-hidden rounded-[22px] border md:grid-cols-2 ${t.border}`}>
            {rules.map((rule, i) => (
              <Reveal
                key={i}
                delay={i * 70}
                className={`group flex items-start gap-5 p-7 transition-colors duration-500 ease-editorial ${
                  t.light ? "bg-white hover:bg-bone" : "bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <span className={`font-mono text-fluid-xs tracking-[0.2em] ${t.accent}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`flex-1 text-fluid-base leading-snug ${t.heading}`}>{rule}</span>
                <Check
                  className={`mt-0.5 h-4 w-4 shrink-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${t.accent}`}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
