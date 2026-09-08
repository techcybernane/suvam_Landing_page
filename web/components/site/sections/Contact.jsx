"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import { api } from "../../../lib/api.js";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import LiveDot from "../../ui/LiveDot.jsx";

const EMPTY = { name: "", email: "", phone: "", company: "", service: "", message: "" };

const FIELD =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-fluid-sm text-bone outline-none transition-colors duration-300 placeholder:text-bone/25 focus:border-signal/60 focus:bg-white/[0.05]";
const LABEL = "mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone/40";

function ContactLine({ icon: Icon, href, children }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className="group flex items-center gap-4 border-b border-white/[0.08] py-4 transition-colors duration-300 hover:border-signal/40"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-signal transition-colors duration-300 group-hover:bg-signal group-hover:text-void">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-fluid-sm font-medium text-bone/80 transition-colors duration-300 group-hover:text-bone">
        {children}
      </span>
      {href && (
        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-bone/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
      )}
    </Tag>
  );
}

export default function Contact({ data, num }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  if (!data) return null;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await api.post("/leads", form);
      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden border-t border-white/[0.08] bg-void">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" aria-hidden />
      <div className="animate-breathe pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-signal/[0.09] blur-[140px]" aria-hidden />

      <div className="container-page relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            num={num}
            kicker={data.tag}
            heading={data.heading}
            accent={data.accent}
            intro={data.subheading}
            tone="dark"
          />

          <Reveal delay={200} className="mt-12">
            {data.companyEmail && (
              <ContactLine icon={Mail} href={`mailto:${data.companyEmail}`}>
                {data.companyEmail}
              </ContactLine>
            )}
            {data.companyPhone && (
              <ContactLine icon={Phone} href={`tel:${data.companyPhone.replace(/\s+/g, "")}`}>
                {data.companyPhone}
              </ContactLine>
            )}
            {data.companyAddress && <ContactLine icon={MapPin}>{data.companyAddress}</ContactLine>}
          </Reveal>

          {data.responseNote && (
            <Reveal delay={280} className="mt-8 flex items-center gap-2.5">
              <LiveDot />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-bone/45">{data.responseNote}</span>
            </Reveal>
          )}
        </div>

        <Reveal delay={150} variant="clip" duration={1000}>
          <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <CheckCircle2 className="h-12 w-12 text-signal" />
                <h3 className="text-fluid-xl font-semibold text-bone">Request sent</h3>
                <p className="max-w-xs text-fluid-sm text-bone/55">
                  Thanks for reaching out — we&apos;ll get back to you within one business day.
                </p>
                <button className="btn-outline mt-2" onClick={() => setStatus("idle")}>
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                {data.formHeading && (
                  <h3 className="text-fluid-lg font-semibold tracking-tight text-bone">{data.formHeading}</h3>
                )}

                {/* Service picker as chips: it reads as a menu of what we do,
                    not as one more thing to fill in. Backed by a hidden field
                    so the payload shape is unchanged. */}
                {data.serviceOptions?.length > 0 && (
                  <div>
                    <span className={LABEL}>{data.serviceLabel || "What can we help you with?"}</span>
                    <div className="flex flex-wrap gap-2">
                      {data.serviceOptions.map((opt) => {
                        const on = form.service === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, service: on ? "" : opt }))}
                            aria-pressed={on}
                            className={`rounded-pill border px-4 py-2 text-[0.78rem] font-medium transition-all duration-300 ease-editorial ${
                              on
                                ? "border-signal bg-signal text-void"
                                : "border-white/[0.1] bg-white/[0.03] text-bone/60 hover:border-signal/50 hover:text-bone"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="service" value={form.service} />
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={LABEL} htmlFor="name">Full name</label>
                    <input id="name" name="name" required value={form.name} onChange={onChange} className={FIELD} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="company">Organization</label>
                    <input id="company" name="company" value={form.company} onChange={onChange} className={FIELD} placeholder="Your organization" />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required value={form.email} onChange={onChange} className={FIELD} placeholder="jane@company.com" />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" value={form.phone} onChange={onChange} className={FIELD} placeholder="+235 00 00 00 00" />
                  </div>
                </div>

                <div>
                  <label className={LABEL} htmlFor="message">Tell us about your project or challenge</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    className={`${FIELD} resize-none`}
                    placeholder="What are you trying to build, secure or modernize?"
                  />
                </div>

                {status === "error" && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-fluid-sm text-red-300">{error}</p>
                )}

                <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-60">
                  {status === "submitting" ? "Sending…" : data.submitLabel || "Send Request"}
                  {status !== "submitting" && <ArrowUpRight className="h-4 w-4" />}
                </button>

                <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/25">
                  {data.privacyNote || "No obligation · No spam"}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
