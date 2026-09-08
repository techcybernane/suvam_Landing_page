import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream text-center px-6">
      <span className="eyebrow">404</span>
      <h1 className="text-3xl font-extrabold text-ink">Page not found</h1>
      <p className="text-ink-soft">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-2">
        Back to home
      </Link>
    </div>
  );
}
