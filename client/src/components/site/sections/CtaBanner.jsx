import { ArrowUpRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

export default function CtaBanner({ data }) {
  if (!data) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <Reveal variant="scale">
          <div className="animate-gradient relative overflow-hidden rounded-[2rem] bg-forest-gradient px-8 py-16 text-center text-white shadow-lift sm:px-16">
            <div className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime/15 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-lime/15 blur-3xl" aria-hidden />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-4xl">{data.heading}</h2>
              {data.subtext && <p className="max-w-lg text-base leading-relaxed text-white/70">{data.subtext}</p>}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {data.buttons?.map((btn, i) => (
                  <SmartLink
                    key={i}
                    href={btn.href}
                    className={i === 0 ? "btn-primary" : "btn-outline !border-white/30 !bg-transparent !text-white hover:!bg-white/10"}
                  >
                    {btn.label}
                    {i === 0 && <ArrowUpRight className="h-4 w-4" />}
                  </SmartLink>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
