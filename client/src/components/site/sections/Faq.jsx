import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";

export default function Faq({ data, faqs }) {
  const [openId, setOpenId] = useState(faqs?.[0]?.id ?? null);
  if (!data) return null;

  return (
    <section id="faq" className="section-pad">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          {data.tag && <span className="eyebrow">{data.tag}</span>}
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">{data.heading}</h2>
          {data.subheading && <p className="mt-4 text-base text-ink-soft">{data.subheading}</p>}
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-2xl divide-y divide-line rounded-xl2 border border-line bg-white shadow-card">
          {faqs?.length ? (
            faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-cream/60"
                  >
                    <span className="font-semibold text-ink">{faq.question}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-lime-dark transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="px-6 py-8 text-center text-sm text-ink-soft">No FAQs yet.</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
