import { ArrowUpRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import RevealWords from "../../ui/RevealWords.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import LiveDot from "../../ui/LiveDot.jsx";

/** Closing call-to-action. Always the darkest band on the page. */
export default function CtaBanner({ data }) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-void py-24 md:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_70%)]" aria-hidden />
      <div className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[150px]" aria-hidden />

      <div className="container-page relative flex flex-col items-center text-center">
        {data.kicker && (
          <Reveal variant="fade">
            <span className="eyebrow">
              <LiveDot />
              {data.kicker}
            </span>
          </Reveal>
        )}

        <RevealWords
          as="h2"
          start={80}
          stagger={55}
          text={data.heading}
          highlight={data.accent}
          className="mt-7 max-w-4xl text-fluid-3xl font-semibold leading-[0.94] tracking-tightest text-bone"
        />

        {data.subtext && (
          <Reveal variant="blur" delay={260} duration={1000}>
            <p className="mt-8 max-w-xl text-fluid-base leading-relaxed text-bone/60">{data.subtext}</p>
          </Reveal>
        )}

        {data.buttons?.length > 0 && (
          <Reveal delay={380}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              {data.buttons.map((btn, i) => (
                <SmartLink key={i} href={btn.href} className={i === 0 ? "btn-primary" : "btn-outline"}>
                  {btn.label}
                  {i === 0 && <ArrowUpRight className="h-4 w-4" />}
                </SmartLink>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
