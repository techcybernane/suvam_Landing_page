import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  LayoutTemplate,
  ImageIcon,
  HelpCircle,
  Users,
  Mail,
  Globe,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/sections", label: "Page Sections", icon: LayoutTemplate },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/email", label: "Email & Leads Settings", icon: Mail },
  { to: "/admin/site", label: "Site & SEO", icon: Globe },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-cream lg:flex lg:h-screen lg:overflow-hidden">
      <aside className="border-b border-line bg-white lg:flex lg:h-full lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2 px-6 py-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-lime">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M6 7l6 11 6-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-extrabold text-ink">VERTEXA</p>
            <p className="text-[11px] text-ink-soft">Admin Console</p>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-6">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-forest text-lime" : "text-ink-soft hover:bg-cream hover:text-ink"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span className="whitespace-nowrap">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden border-t border-line px-3 py-4 lg:block">
          <Link to="/" target="_blank" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-cream hover:text-ink">
            <ExternalLink className="h-4 w-4" />
            View live site
          </Link>
          <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-ink">{user?.name}</p>
              <p className="text-[11px] text-ink-soft">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Log out"
              className="rounded-lg p-2 text-ink-soft hover:bg-cream hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 lg:h-full lg:overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
