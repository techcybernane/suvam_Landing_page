import { useEffect, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Save } from "lucide-react";
import { api } from "../../lib/api.js";
import { TextField, TextAreaField, ToggleField } from "../../components/admin/fields/Fields.jsx";

export default function FaqManager() {
  const [faqs, setFaqs] = useState(null);
  const [error, setError] = useState("");

  const load = () => api.get("/faqs/all").then(({ data }) => setFaqs(data.sort((a, b) => a.order - b.order)));

  useEffect(() => {
    load();
  }, []);

  const addFaq = async () => {
    try {
      const { data } = await api.post("/faqs", { question: "New question", answer: "New answer", category: "General" });
      setFaqs((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateLocal = (id, patch) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const saveFaq = async (faq) => {
    try {
      await api.put(`/faqs/${faq.id}`, faq);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFaq = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    await api.delete(`/faqs/${id}`);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const move = async (index, dir) => {
    const j = index + dir;
    if (j < 0 || j >= faqs.length) return;
    const next = [...faqs];
    [next[index], next[j]] = [next[j], next[index]];
    setFaqs(next);
    await api.put("/faqs/reorder/all", { order: next.map((f) => f.id) });
  };

  if (!faqs) {
    return <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">FAQs</h1>
          <p className="mt-1 text-sm text-ink-soft">Manage the questions shown in the FAQ section.</p>
        </div>
        <button onClick={addFaq} className="btn-primary">
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

      <div className="mt-6 space-y-4">
        {faqs.map((faq, i) => (
          <div key={faq.id} className="admin-card space-y-4">
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">FAQ {i + 1}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => move(i, -1)} className="rounded-lg p-1.5 text-ink-soft hover:bg-cream">
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button onClick={() => move(i, 1)} className="rounded-lg p-1.5 text-ink-soft hover:bg-cream">
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button onClick={() => removeFaq(faq.id)} className="rounded-lg p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <TextField label="Question" value={faq.question} onChange={(v) => updateLocal(faq.id, { question: v })} />
            <TextAreaField label="Answer" value={faq.answer} onChange={(v) => updateLocal(faq.id, { answer: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Category" value={faq.category} onChange={(v) => updateLocal(faq.id, { category: v })} />
              <ToggleField label="Enabled on live site" checked={faq.enabled} onChange={(v) => updateLocal(faq.id, { enabled: v })} />
            </div>

            <button onClick={() => saveFaq(faq)} className="btn-dark">
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
