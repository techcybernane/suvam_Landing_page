import { getBackendOrigin, BackendConfigError } from "./backend.js";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

/**
 * Forward a Next.js request to the Express API (or its /uploads static files).
 * Reads BACKEND_ORIGIN at request time so production works even when the env
 * var was not present at build time (unlike next.config.js rewrites).
 */
export async function proxyToBackend(req, { prefix, pathSegments }) {
  let backend;
  try {
    backend = getBackendOrigin();
  } catch (err) {
    const message =
      err instanceof BackendConfigError
        ? err.message
        : "API backend is not configured.";
    console.error("[proxy]", message);
    return Response.json({ error: message }, { status: 503 });
  }

  const segments = Array.isArray(pathSegments) ? pathSegments : [];
  const suffix = segments.map(encodeURIComponent).join("/");
  const incoming = new URL(req.url);
  const target = `${backend}${prefix}${suffix ? `/${suffix}` : ""}${incoming.search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) headers.set(key, value);
  });

  const init = {
    method: req.method,
    headers,
    redirect: "manual",
    cache: "no-store",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
    // Required by Node's fetch when streaming a request body.
    init.duplex = "half";
  }

  try {
    const upstream = await fetch(target, init);
    const outHeaders = new Headers();
    upstream.headers.forEach((value, key) => {
      // Multiple Set-Cookie values are collapsed by forEach — handle below.
      if (key.toLowerCase() === "set-cookie") return;
      if (!HOP_BY_HOP.has(key.toLowerCase())) outHeaders.set(key, value);
    });
    const cookies =
      typeof upstream.headers.getSetCookie === "function" ? upstream.headers.getSetCookie() : [];
    for (const cookie of cookies) outHeaders.append("set-cookie", cookie);

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: outHeaders,
    });
  } catch (err) {
    console.error(`[proxy] ${req.method} ${target} failed:`, err?.message || err);
    return Response.json(
      { error: "Could not reach the API server. Check BACKEND_ORIGIN and that the API is running." },
      { status: 503 }
    );
  }
}
