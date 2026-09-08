import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { randomId } from "../../../lib/randomId.js";

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
