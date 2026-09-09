"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, GripVertical, Save, Check } from "lucide-react";
import { api } from "../../lib/api.js";
import { ToggleField, SelectField } from "../../components/admin/fields/Fields.jsx";
import { SECTION_FORM_REGISTRY } from "../../components/admin/fields/SectionForms.jsx";
import LocalePicker from "../../components/admin/LocalePicker.jsx";
import { DEFAULT_LOCALE } from "../../lib/i18n.js";

// Mirrors BANDED_TYPES in components/site/PageSections.jsx — only these
// sections take part in the light/dark band rhythm, so only they get the
// background override control.
const BANDED = new Set([
  "textIntro", "iconGrid", "valueList", "processSteps", "columnGroups",
  "featureSplit", "marquee", "statsBand", "logoStrip", "tabbedPillars",
  "showcaseCarousel", "timeline", "commitments", "faq",
]);

export default function SectionsEditor() {
  const [pages, setPages] = useState([]);
  const [slug, setSlug] = useState(null);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [sections, setSections] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/content/pages").then(({ data }) => {
      setPages(data);
      if (data.length) setSlug(data[0].slug);
    });
  }, []);

  useEffect(() => {
    if (!slug) return;
    setSections(null);
    setOpenId(null);
    api.get(`/content/pages/${slug}`, { params: { locale } }).then(({ data }) => {
      setSections([...data.sections].sort((a, b) => a.order - b.order));
    });
  }, [slug, locale]);

  const updateLocal = (id, patch) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const save = async (section) => {
    setSavingId(section.id);
    setError("");
    try {
      await api.put(`/content/pages/${slug}/sections/${section.id}`, { data: section.data, visible: section.visible }, { params: { locale } });
      setSavedId(section.id);
      setTimeout(() => setSavedId((id) => (id === section.id ? null : id)), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  };

  const move = async (index, dir) => {
    const j = index + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[index], next[j]] = [next[j], next[index]];
    setSections(next);
    try {
      await api.put(`/content/pages/${slug}/sections/reorder`, { order: next.map((s) => s.id) }, { params: { locale } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Page Sections</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Choose a page and a language, then edit each section's content. Each language has its
        own copy — editing French here does not change English.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <select value={slug ?? ""} onChange={(e) => setSlug(e.target.value)} className="admin-input w-auto min-w-[260px]">
          {pages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
        <LocalePicker value={locale} onChange={setLocale} />
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

      {!sections ? (
        <div className="mt-8 h-8 w-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />
      ) : (
        <div className="mt-6 space-y-4">
          {sections.map((section, i) => {
            const meta = SECTION_FORM_REGISTRY[section.type];
            const isOpen = openId === section.id;
            if (!meta) return null;
            const Form = meta.Form;

            return (
              <div key={section.id} className="admin-card !p-0 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4">
                  <GripVertical className="h-4 w-4 shrink-0 text-ink-soft" />
                  <button
                    className="flex flex-1 items-center justify-between gap-3 text-left"
                    onClick={() => setOpenId(isOpen ? null : section.id)}
                  >
                    <span className="font-bold text-ink">{meta.label}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-ink-soft" /> : <ChevronDown className="h-4 w-4 text-ink-soft" />}
                  </button>
                  <div className="flex shrink-0 items-center gap-1">
                    <button onClick={() => move(i, -1)} className="rounded-lg p-1.5 text-ink-soft hover:bg-cream" title="Move up">
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button onClick={() => move(i, 1)} className="rounded-lg p-1.5 text-ink-soft hover:bg-cream" title="Move down">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-line px-5 py-5">
                    <div className="mb-5 grid gap-4 sm:grid-cols-2">
                      <ToggleField
                        label="Visible on live site"
                        checked={section.visible}
                        onChange={(v) => updateLocal(section.id, { visible: v })}
                      />
                      {/* Background band. "Automatic" leaves the section in the
                          page's alternating rhythm; the other values pin it. */}
                      {BANDED.has(section.type) && (
                        <SelectField
                          label="Background band"
                          value={section.data?.tone || ""}
                          placeholder="Automatic (alternates)"
                          options={[
                            { value: "dark", label: "Dark" },
                            { value: "deep", label: "Darker" },
                            { value: "light", label: "Light" },
                          ]}
                          onChange={(v) =>
                            updateLocal(section.id, {
                              data: { ...section.data, tone: v || undefined },
                            })
                          }
                        />
                      )}
                    </div>

                    <Form data={section.data} onChange={(data) => updateLocal(section.id, { data })} />

                    <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      <button
                        onClick={() => save(section)}
                        disabled={savingId === section.id}
                        className="btn-dark disabled:opacity-60"
                      >
                        {savingId === section.id ? (
                          "Saving..."
                        ) : savedId === section.id ? (
                          <>
                            <Check className="h-4 w-4" /> Saved
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" /> Save Section
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}