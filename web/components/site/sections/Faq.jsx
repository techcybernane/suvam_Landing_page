"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { toneOf } from "../../../lib/tone.js";

export default function Faq({ data, faqs, tone, num }) {
  const [openId, setOpenId] = useState(faqs?.[0]?.id ?? null);
  if (!data) return null;
  const t = toneOf(tone);

  return (
    <section id="faq" className={`section-pad relative border-t ${t.border} ${t.bg}`}>
      <div className="container-page">
        <SectionHeading
          num={num}
          kicker={data.tag || data.kicker}
          heading={data.heading}
          accent={data.accent}
          intro={data.subheading || data.intro}
          tone={tone}
          align="center"
        />

        <Reveal delay={120} className={`mx-auto mt-14 max-w-2xl divide-y overflow-hidden rounded-[22px] border ${t.border} ${
          t.light ? "divide-void/[0.08] bg-white" : "divide-white/[0.08] bg-white/[0.03]"
        }`}>
          {faqs?.length ? (
            faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 ${
                      t.light ? "hover:bg-bone" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className={`font-medium ${t.heading}`}>{faq.question}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 transition-transform duration-500 ease-editorial ${t.accent} ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-editorial ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className={`px-6 pb-6 text-fluid-sm leading-relaxed ${t.body}`}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={`px-6 py-8 text-center text-fluid-sm ${t.muted}`}>No FAQs yet.</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
