import jwt from "jsonwebtoken";

const FALLBACK = "dev-only-insecure-secret";
const SECRET = process.env.JWT_SECRET || FALLBACK;

// Booting production on the shared dev secret would let anyone mint a valid
// admin session, so fail loudly at startup instead of quietly staying open.
if (process.env.NODE_ENV === "production" && SECRET === FALLBACK) {
  throw new Error("JWT_SECRET must be set in production — refusing to start with the development secret.");
}

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
