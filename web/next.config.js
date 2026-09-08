// The Express backend stays exactly as-is. We proxy /api and /uploads to it so
// the httpOnly auth cookie is same-origin (works over http in dev), mirroring the
// old Vite dev proxy. Server Components fetch the backend directly (see lib/server-api.js).
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND = process.env.BACKEND_ORIGIN || "http://localhost:4000";

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
