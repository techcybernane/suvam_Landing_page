import { ArrowUpRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

export default function CtaBanner({ data }) {
  if (!data) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <Reveal variant="scale">
          <div className="bg-dot-grid-light relative overflow-hidden rounded-[2rem] bg-forest-gradient px-8 py-14 text-center text-white shadow-lift sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime/10 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-lime/10 blur-3xl" aria-hidden />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">{data.heading}</h2>
              {data.subtext && <p className="max-w-lg text-white/70">{data.subtext}</p>}
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
