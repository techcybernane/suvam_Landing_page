import { proxyToBackend } from "../../../lib/proxy.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function handle(req, context) {
  const { path } = await context.params;
  return proxyToBackend(req, { prefix: "/api", pathSegments: path });
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
export const HEAD = handle;
