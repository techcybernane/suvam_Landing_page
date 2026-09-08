import { useRef, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Upload } from "lucide-react";
import { randomId } from "../../../lib/randomId.js";
import { api } from "../../../lib/api.js";

/**
 * Image picker: paste a URL (external stock or /uploads/...) or upload a file
 * straight to the Media Library, with a live thumbnail preview.
 */
export function ImageField({ label, value, onChange, placeholder = "https://…  or upload a file" }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef(null);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/media", fd, { headers: { "Content-Type": "multipart/form-data" } });
      onChange(data.url);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <div className="flex gap-3">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-cream">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-ink-soft">No image</div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input className="admin-input" value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-cream">
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading…" : "Upload"}
              <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
            </label>
            {value && (
              <button type="button" onClick={() => onChange("")} className="text-xs text-ink-soft hover:text-red-600">
                Clear
              </button>
            )}
          </div>
          {err && <p className="text-xs text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <input
        className="admin-input"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <textarea
        className="admin-input resize-none"
        rows={rows}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options = [], placeholder }) {
  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <select className="admin-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const text = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function ToggleField({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-line px-3 py-2.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <span
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-pill transition-colors ${checked ? "bg-forest" : "bg-line"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </label>
  );
}

// Simple list of plain strings (pills, logos) with add/remove/edit.
export function StringListField({ label, items = [], onChange }) {
  const update = (i, value) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input className="admin-input" value={item} onChange={(e) => update(i, e.target.value)} />
            <button type="button" onClick={() => remove(i)} className="rounded-lg p-2 text-ink-soft hover:bg-red-50 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-lime-dark hover:underline">
        <Plus className="h-3.5 w-3.5" /> Add item
      </button>
    </div>
  );
}

/**
 * Repeatable list of objects (cards, plans, testimonials...). `fields`
 * describes each column: [{ key, label, type: 'text'|'textarea'|'list' }].
 */
export function RepeaterField({ label, items = [], onChange, fields, newItem, itemLabel }) {
  const update = (i, patch) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { id: randomId(), ...(newItem ? newItem() : {}) }]);
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id ?? i} className="rounded-lg border border-line p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                {itemLabel ? itemLabel(item, i) : `Item ${i + 1}`}
              </span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} className="rounded p-1.5 text-ink-soft hover:bg-cream">
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => move(i, 1)} className="rounded p-1.5 text-ink-soft hover:bg-cream">
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => remove(i)} className="rounded p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.type === "textarea" || f.full ? "sm:col-span-2" : ""}>
                  {f.type === "textarea" ? (
                    <TextAreaField
                      label={f.label}
                      value={item[f.key]}
                      onChange={(v) => update(i, { [f.key]: v })}
                    />
                  ) : f.type === "list" ? (
                    <StringListField
                      label={f.label}
                      items={item[f.key] || []}
                      onChange={(v) => update(i, { [f.key]: v })}
                    />
                  ) : f.type === "select" ? (
                    <div>
                      <label className="admin-label">{f.label}</label>
                      <select
                        className="admin-input"
                        value={item[f.key] ?? ""}
                        onChange={(e) => update(i, { [f.key]: e.target.value })}
                      >
                        {f.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : f.type === "boolean" ? (
                    <ToggleField
                      label={f.label}
                      checked={!!item[f.key]}
                      onChange={(v) => update(i, { [f.key]: v })}
                    />
                  ) : f.type === "image" ? (
                    <ImageField label={f.label} value={item[f.key]} onChange={(v) => update(i, { [f.key]: v })} />
                  ) : f.type === "repeater" ? (
                    <div className="rounded-lg bg-cream/60 p-3">
                      <RepeaterField
                        label={f.label}
                        items={item[f.key] || []}
                        onChange={(v) => update(i, { [f.key]: v })}
                        fields={f.fields}
                        newItem={f.newItem}
                        itemLabel={f.itemLabel}
                      />
                    </div>
                  ) : (
                    <TextField label={f.label} value={item[f.key]} onChange={(v) => update(i, { [f.key]: v })} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-lime-dark hover:underline">
        <Plus className="h-3.5 w-3.5" /> Add {itemLabel ? itemLabel() : "item"}
      </button>
    </div>
  );
}
