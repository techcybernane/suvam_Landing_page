"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Sparkles, HelpCircle, ImageIcon } from "lucide-react";
import { api } from "../../lib/api.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then(({ data }) => setStats(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">An overview of your website and recent activity.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Leads" value={stats?.totalLeads} />
        <StatCard icon={Sparkles} label="New Leads" value={stats?.newLeads} accent />
        <StatCard icon={HelpCircle} label="FAQs" value={stats?.totalFaqs} />
        <StatCard icon={ImageIcon} label="Media Files" value={stats?.totalMedia} />
      </div>

      <div className="mt-10 admin-card">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ink">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-semibold text-lime-dark hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-4 divide-y divide-line">
          {stats?.recentLeads?.length ? (
            stats.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{lead.name}</p>
                  <p className="truncate text-xs text-ink-soft">{lead.email}</p>
                </div>
                <span className="shrink-0 rounded-pill bg-lime-light px-3 py-1 text-xs font-semibold text-forest">
                  {lead.status}
                </span>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-ink-soft">No leads yet — they'll show up here.</p>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <QuickLink to="/admin/sections" title="Edit Page Content" description="Update headings, cards, pricing & more." />
        <QuickLink to="/admin/media" title="Upload Media" description="Manage images used across the site." />
        <QuickLink to="/admin/email" title="Configure Emails" description="Set lead recipients & auto-reply." />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className={`admin-card flex items-center gap-4 ${accent ? "bg-forest text-white" : ""}`}>
      <span className={`flex h-11 w-11 items-center justify-center rounded-full ${accent ? "bg-lime text-forest" : "bg-lime-light text-forest"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className={`text-2xl font-extrabold ${accent ? "text-white" : "text-ink"}`}>{value ?? "—"}</p>
        <p className={`text-xs ${accent ? "text-white/60" : "text-ink-soft"}`}>{label}</p>
      </div>
    </div>
  );
}

function QuickLink({ to, title, description }) {
  return (
    <Link href={to} className="admin-card block transition-transform hover:-translate-y-0.5">
      <h3 className="font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{description}</p>
    </Link>
  );
}
