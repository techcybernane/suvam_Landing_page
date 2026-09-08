"use client";

import { useEffect, useState } from "react";
import { Save, Check, AlertTriangle } from "lucide-react";
import { api } from "../../lib/api.js";
import { TextField, TextAreaField, StringListField } from "../../components/admin/fields/Fields.jsx";

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/settings").then(({ data }) => setSettings(data));
  }, []);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const { data } = await api.put("/settings", {
        leadRecipients: settings.leadRecipients,
        autoResponse: settings.autoResponse,
      });
      setSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />;
  }

  const ar = settings.autoResponse;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Email &amp; Lead Settings</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Control who receives new leads and what the automatic confirmation email says.
      </p>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

      <div className="mt-6 admin-card">
        <h2 className="font-bold text-ink">SMTP status</h2>
        {settings.smtp?.configured ? (
          <p className="mt-2 flex items-center gap-2 text-sm text-emerald-700">
            <Check className="h-4 w-4" /> SMTP is configured — emails will be sent for real.
          </p>
        ) : (
          <p className="mt-2 flex items-center gap-2 text-sm text-amber-700">
            <AlertTriangle className="h-4 w-4" />
            SMTP is not configured — emails will be logged to the server console instead of sent.
            Set <code className="rounded bg-cream px-1.5 py-0.5 text-xs">SMTP_*</code> variables in{" "}
            <code className="rounded bg-cream px-1.5 py-0.5 text-xs">server/.env</code> to enable real delivery.
          </p>
        )}
      </div>

      <div className="mt-6 admin-card">
        <h2 className="font-bold text-ink">Lead recipients</h2>
        <p className="mt-1 text-sm text-ink-soft">Every email address here gets notified when a new lead comes in.</p>
        <div className="mt-4">
          <StringListField
            items={settings.leadRecipients}
            onChange={(v) => setSettings((s) => ({ ...s, leadRecipients: v }))}
          />
        </div>
      </div>

      <div className="mt-6 admin-card space-y-4">
        <div>
          <h2 className="font-bold text-ink">Customer auto-response email</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Sent automatically to whoever fills out the contact form. Use{" "}
            <code className="rounded bg-cream px-1.5 py-0.5 text-xs">{"{{name}}"}</code> to insert their name.
          </p>
        </div>
        <TextField
          label="Subject"
          value={ar.subject}
          onChange={(v) => setSettings((s) => ({ ...s, autoResponse: { ...ar, subject: v } }))}
        />
        <TextField
          label="Greeting"
          value={ar.greeting}
          onChange={(v) => setSettings((s) => ({ ...s, autoResponse: { ...ar, greeting: v } }))}
        />
        <TextAreaField
          label="Body"
          rows={5}
          value={ar.body}
          onChange={(v) => setSettings((s) => ({ ...s, autoResponse: { ...ar, body: v } }))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Button label (optional)"
            value={ar.ctaLabel}
            onChange={(v) => setSettings((s) => ({ ...s, autoResponse: { ...ar, ctaLabel: v } }))}
          />
          <TextField
            label="Button link"
            value={ar.ctaUrl}
            onChange={(v) => setSettings((s) => ({ ...s, autoResponse: { ...ar, ctaUrl: v } }))}
          />
        </div>
        <TextField
          label="Footer / signature"
          value={ar.footer}
          onChange={(v) => setSettings((s) => ({ ...s, autoResponse: { ...ar, footer: v } }))}
        />
      </div>

      <div className="mt-6">
        <button onClick={save} disabled={saving} className="btn-dark disabled:opacity-60">
          {saving ? "Saving..." : saved ? <><Check className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save Settings</>}
        </button>
      </div>
    </div>
  );
}