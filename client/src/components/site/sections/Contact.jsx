import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { api } from "../../../lib/api.js";
import Reveal from "../../ui/Reveal.jsx";

const EMPTY = { name: "", email: "", phone: "", company: "", service: "", message: "" };

export default function Contact({ data }) {
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
    <section id="contact" className="section-pad bg-white">
      <div className="container-page grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          {data.tag && <span className="eyebrow">{data.tag}</span>}
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">{data.heading}</h2>
          {data.subheading && <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">{data.subheading}</p>}

          <div className="mt-10 space-y-5">
            {data.companyEmail && (
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-light text-forest">
                  <Mail className="h-4 w-4" />
                </span>
                <a href={`mailto:${data.companyEmail}`} className="text-sm font-medium text-ink hover:text-lime-dark">
                  {data.companyEmail}
                </a>
              </div>
            )}
            {data.companyPhone && (
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-light text-forest">
                  <Phone className="h-4 w-4" />
                </span>
                <a href={`tel:${data.companyPhone}`} className="text-sm font-medium text-ink hover:text-lime-dark">
                  {data.companyPhone}
                </a>
              </div>
            )}
            {data.companyAddress && (
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-light text-forest">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-ink">{data.companyAddress}</span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={150} className="card p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-lime-dark" />
              <h3 className="text-lg font-bold text-ink">Message sent</h3>
              <p className="max-w-xs text-sm text-ink-soft">
                Thanks for reaching out — we'll get back to you within one business day.
              </p>
              <button className="btn-outline mt-2" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {data.formHeading && <h3 className="font-bold text-ink">{data.formHeading}</h3>}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="admin-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    className="admin-input"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="company">Organization</label>
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    className="admin-input"
                    placeholder="Your organization"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    className="admin-input"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="admin-input"
                    placeholder="+235 00 00 00 00"
                  />
                </div>
              </div>

              {data.serviceOptions?.length > 0 && (
                <div>
                  <label className="admin-label" htmlFor="service">Service Required</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    className="admin-input"
                  >
                    <option value="">Select a service...</option>
                    {data.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="admin-label" htmlFor="message">Tell us about your project or challenge</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  className="admin-input resize-none"
                  placeholder="Tell us about your project or challenge..."
                />
              </div>

              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
              )}

              <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-60">
                {status === "submitting" ? "Sending..." : "Send Request"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
