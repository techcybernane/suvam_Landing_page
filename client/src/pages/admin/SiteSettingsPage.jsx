import { useEffect, useState } from "react";
import { Save, Check, Plus, Trash2 } from "lucide-react";
import { api } from "../../lib/api.js";
import { TextField, TextAreaField, RepeaterField } from "../../components/admin/fields/Fields.jsx";
import { randomId } from "../../lib/randomId.js";

export default function SiteSettingsPage() {
  const [meta, setMeta] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [pages, setPages] = useState([]);
  const [seoSlug, setSeoSlug] = useState(null);
  const [seo, setSeo] = useState(null);
  const [seoSaving, setSeoSaving] = useState(false);
  const [seoSaved, setSeoSaved] = useState(false);

  useEffect(() => {
    api.get("/content/meta").then(({ data }) => setMeta(data));
    api.get("/content/pages").then(({ data }) => {
      setPages(data);
      if (data.length) setSeoSlug(data[0].slug);
    });
  }, []);

  useEffect(() => {
    if (!seoSlug) return;
    setSeo(null);
    api.get(`/content/pages/${seoSlug}`).then(({ data }) => setSeo(data.seo));
  }, [seoSlug]);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const { data } = await api.put("/content/meta", meta);
      setMeta(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveSeo = async () => {
    setSeoSaving(true);
    setError("");
    try {
      const { data } = await api.put(`/content/pages/${seoSlug}/seo`, seo);
      setSeo(data.seo);
      setSeoSaved(true);
      setTimeout(() => setSeoSaved(false), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSeoSaving(false);
    }
  };

  if (!meta) {
    return <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />;
  }

  const { brand, nav, footer } = meta;

  const updateColumnLinks = (colIndex, links) => {
    const columns = [...footer.columns];
    columns[colIndex] = { ...columns[colIndex], links };
    setMeta((m) => ({ ...m, footer: { ...footer, columns } }));
  };

  const updateColumnTitle = (colIndex, title) => {
    const columns = [...footer.columns];
    columns[colIndex] = { ...columns[colIndex], title };
    setMeta((m) => ({ ...m, footer: { ...footer, columns } }));
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Site, Navigation &amp; SEO</h1>
      <p className="mt-1 text-sm text-ink-soft">Brand, navigation, footer, and per-page search-engine metadata.</p>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

      <div className="mt-6 admin-card space-y-4">
        <h2 className="font-bold text-ink">Page SEO</h2>
        <select value={seoSlug ?? ""} onChange={(e) => setSeoSlug(e.target.value)} className="admin-input w-auto min-w-[260px]">
          {pages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
        {seo && (
          <>
            <TextField label="Page title" value={seo.title} onChange={(v) => setSeo((s) => ({ ...s, title: v }))} />
            <TextAreaField label="Meta description" value={seo.description} onChange={(v) => setSeo((s) => ({ ...s, description: v }))} />
            <button onClick={saveSeo} disabled={seoSaving} className="btn-dark disabled:opacity-60">
              {seoSaving ? "Saving..." : seoSaved ? <><Check className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save Page SEO</>}
            </button>
          </>
        )}
      </div>

      <div className="mt-6 admin-card space-y-4">
        <h2 className="font-bold text-ink">Brand</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Brand name" value={brand.name} onChange={(v) => setMeta((m) => ({ ...m, brand: { ...brand, name: v } }))} />
          <TextField label="Tagline" value={brand.tagline} onChange={(v) => setMeta((m) => ({ ...m, brand: { ...brand, tagline: v } }))} />
        </div>
      </div>

      <div className="mt-6 admin-card space-y-4">
        <h2 className="font-bold text-ink">Navigation</h2>
        <p className="text-xs text-ink-soft">
          Top-level links. The "Solutions" dropdown's sub-links are managed in code for now — edit its label/link here, not its children.
        </p>
        <RepeaterField
          label="Nav links"
          items={nav.links}
          onChange={(v) => setMeta((m) => ({ ...m, nav: { ...nav, links: v } }))}
          itemLabel={(item, i) => item?.label || `Link ${i + 1}`}
          newItem={() => ({ label: "New Link", href: "/" })}
          fields={[
            { key: "label", label: "Label" },
            { key: "href", label: "Link" },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Primary button label"
            value={nav.ctaPrimary?.label}
            onChange={(v) => setMeta((m) => ({ ...m, nav: { ...nav, ctaPrimary: { ...nav.ctaPrimary, label: v } } }))}
          />
          <TextField
            label="Primary button link"
            value={nav.ctaPrimary?.href}
            onChange={(v) => setMeta((m) => ({ ...m, nav: { ...nav, ctaPrimary: { ...nav.ctaPrimary, href: v } } }))}
          />
        </div>
      </div>

      <div className="mt-6 admin-card space-y-5">
        <h2 className="font-bold text-ink">Footer</h2>
        <TextAreaField
          label="Tagline"
          value={footer.tagline}
          onChange={(v) => setMeta((m) => ({ ...m, footer: { ...footer, tagline: v } }))}
        />

        {footer.columns.map((col, i) => (
          <div key={col.id} className="rounded-lg border border-line p-4">
            <TextField label="Column title" value={col.title} onChange={(v) => updateColumnTitle(i, v)} />
            <div className="mt-3 space-y-2">
              {col.links.map((link, li) => (
                <div key={link.id} className="flex gap-2">
                  <input
                    className="admin-input"
                    value={link.label}
                    placeholder="Label"
                    onChange={(e) => {
                      const links = [...col.links];
                      links[li] = { ...links[li], label: e.target.value };
                      updateColumnLinks(i, links);
                    }}
                  />
                  <input
                    className="admin-input"
                    value={link.href}
                    placeholder="Link"
                    onChange={(e) => {
                      const links = [...col.links];
                      links[li] = { ...links[li], href: e.target.value };
                      updateColumnLinks(i, links);
                    }}
                  />
                  <button
                    onClick={() => updateColumnLinks(i, col.links.filter((_, idx) => idx !== li))}
                    className="rounded-lg p-2 text-ink-soft hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => updateColumnLinks(i, [...col.links, { id: randomId(), label: "New Link", href: "/" }])}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-lime-dark hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Add link
            </button>
          </div>
        ))}

        <TextField
          label="Copyright line"
          value={footer.copyright}
          onChange={(v) => setMeta((m) => ({ ...m, footer: { ...footer, copyright: v } }))}
        />
      </div>

      <div className="mt-6">
        <button onClick={save} disabled={saving} className="btn-dark disabled:opacity-60">
          {saving ? "Saving..." : saved ? <><Check className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}
