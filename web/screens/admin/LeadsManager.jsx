"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { api } from "../../lib/api.js";

const STATUS_COLORS = {
  New: "bg-lime-light text-forest",
  Contacted: "bg-blue-50 text-blue-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Converted: "bg-emerald-50 text-emerald-700",
  Closed: "bg-gray-100 text-gray-600",
};

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [sources, setSources] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [expandedId, setExpandedId] = useState(null);

  const load = () => {
    const params = { sort };
    if (q) params.q = q;
    if (status) params.status = status;
    if (source) params.source = source;
    api.get("/leads", { params }).then(({ data }) => {
      setLeads(data.items);
      setStatuses(data.statuses);
      setSources(data.sources || []);
    });
  };

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, source, sort]);

  const updateStatus = async (id, newStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    await api.put(`/leads/${id}`, { status: newStatus });
  };

  const remove = async (id) => {
    if (!confirm("Delete this lead?")) return;
    await api.delete(`/leads/${id}`);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Leads</h1>
      <p className="mt-1 text-sm text-ink-soft">Contact form and popup submissions from your website.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, message..."
            className="admin-input pl-9"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-input w-auto">
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value)} className="admin-input w-auto">
          <option value="">All sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="admin-input w-auto">
          <option value="-createdAt">Newest first</option>
          <option value="createdAt">Oldest first</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
        {leads.length === 0 ? (
          <p className="py-14 text-center text-sm text-ink-soft">No leads match your filters.</p>
        ) : (
          <div className="divide-y divide-line">
            {leads.map((lead) => {
              const isOpen = expandedId === lead.id;
              return (
                <div key={lead.id}>
                  <button
                    onClick={() => setExpandedId(isOpen ? null : lead.id)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{lead.name}</p>
                      <p className="truncate text-xs text-ink-soft">{lead.email}</p>
                    </div>
                    <span className="hidden shrink-0 rounded-pill border border-line px-2.5 py-1 text-[11px] font-semibold text-ink-soft md:block">
                      {lead.source || "Contact Form"}
                    </span>
                    <span className="hidden shrink-0 text-xs text-ink-soft sm:block">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`shrink-0 rounded-pill px-3 py-1 text-xs font-semibold ${STATUS_COLORS[lead.status] || "bg-gray-100"}`}>
                      {lead.status}
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-ink-soft" /> : <ChevronDown className="h-4 w-4 text-ink-soft" />}
                  </button>

                  {isOpen && (
                    <div className="border-t border-line bg-cream/50 px-5 py-4">
                      {lead.message ? (
                        <p className="whitespace-pre-wrap text-sm text-ink-soft">{lead.message}</p>
                      ) : (
                        <p className="text-sm italic text-ink-soft/70">No message — quick popup enquiry.</p>
                      )}
                      {(lead.phone || lead.company || lead.service) && (
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-soft">
                          {lead.phone && <span>📞 {lead.phone}</span>}
                          {lead.company && <span>🏢 {lead.company}</span>}
                          {lead.service && <span>🛠️ {lead.service}</span>}
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-3">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className="admin-input w-auto"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => remove(lead.id)}
                          className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
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
    </div>
  );
}