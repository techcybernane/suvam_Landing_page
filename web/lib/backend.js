/**
 * Resolve the Express API origin used by Server Components and the runtime
 * /api + /uploads proxies.
 *
 * In production this MUST be the public HTTPS URL of the deployed API
 * (Render/Railway/Fly/VPS) — never localhost. Vercel serverless cannot reach
 * the developer's machine.
 */
export function getBackendOrigin() {
  const raw = (process.env.BACKEND_ORIGIN || "").trim().replace(/\/+$/, "");
  const isProd = process.env.NODE_ENV === "production";

  if (!raw) {
    if (isProd) {
      throw new BackendConfigError(
        "BACKEND_ORIGIN is not set. On Vercel, add BACKEND_ORIGIN=https://<your-api-host> (no trailing slash) and redeploy."
      );
    }
    return "http://localhost:4000";
  }

  if (isProd && /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?$/i.test(raw)) {
    throw new BackendConfigError(
      `BACKEND_ORIGIN points at ${raw}, which is unreachable from production. Set it to your deployed API URL.`
    );
  }

  return raw;
}

export class BackendConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "BackendConfigError";
    this.code = "BACKEND_CONFIG";
  }
}

export class BackendUnavailableError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "BackendUnavailableError";
    this.code = "BACKEND_UNAVAILABLE";
    this.cause = cause;
  }
}

export class BackendHttpError extends Error {
  constructor(status, message) {
    super(message || `Request failed: ${status}`);
    this.name = "BackendHttpError";
    this.code = "BACKEND_HTTP";
    this.status = status;
  }
}
