// The Express backend stays exactly as-is. Browser calls go through the
// runtime proxies in app/api/[...path] and app/uploads/[...path], which read
// BACKEND_ORIGIN on every request (so production works even if the env var
// was added after the last build). These rewrites remain as a local-dev
// fallback when the route handlers are not hit.
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND = (process.env.BACKEND_ORIGIN || "http://localhost:4000").replace(/\/+$/, "");

if (process.env.NODE_ENV === "production" && /localhost|127\.0\.0\.1/i.test(BACKEND)) {
  console.warn(
    "[next.config] BACKEND_ORIGIN is missing or points at localhost. " +
      "Set BACKEND_ORIGIN to your deployed API URL on Vercel or the site cannot load CMS content."
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the file-tracing root to this app (a stray lockfile in $HOME otherwise
  // makes Next guess the wrong workspace root).
  outputFileTracingRoot: __dirname,
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${BACKEND}/api/:path*` },
      { source: "/uploads/:path*", destination: `${BACKEND}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
