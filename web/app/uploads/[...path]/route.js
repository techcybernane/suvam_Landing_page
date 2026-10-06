import { proxyToBackend } from "../../../lib/proxy.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function handle(req, context) {
  const { path } = await context.params;
  return proxyToBackend(req, { prefix: "/uploads", pathSegments: path });
}

export const GET = handle;
export const HEAD = handle;
export const OPTIONS = handle;
