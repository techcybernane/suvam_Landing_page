import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="text-3xl font-extrabold text-ink">Page not found</h1>
      <p className="text-ink-soft">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary mt-2">
        Back to home
      </Link>
    </div>
  );
}
