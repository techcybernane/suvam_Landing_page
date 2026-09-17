import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";
import faqsRoutes from "./routes/faqs.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { UPLOAD_DIR } from "./middleware/upload.js";
import { ensureSeeded } from "./seed/seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Origins allowed to make credentialed browser requests. Vercel's /api proxy
// forwards the visitor's Origin header to this API, so the production domain has
// to be on the list even though the request is technically same-origin in the
// browser. These built-in defaults mean a standard deploy works with no extra
// config; CLIENT_ORIGIN (comma-separated) *adds* any further origins.
const DEFAULT_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://cybernanet.com",
  "https://www.cybernanet.com",
];
const ALLOWED_ORIGINS = [
  ...DEFAULT_ORIGINS,
  ...(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
];

// Vercel preview deployments get a random *.vercel.app subdomain; allow them so
// the admin works on preview builds too. Auth still requires valid credentials.
const isPreviewOrigin = (origin) => /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin/server-to-server requests arrive without an Origin header.
      if (!origin || ALLOWED_ORIGINS.includes(origin) || isPreviewOrigin(origin)) {
        return cb(null, true);
      }
      cb(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(UPLOAD_DIR));

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Liveness probe for the hosting platform's health check.
app.get("/api/health", (req, res) =>
  res.json({ ok: true, uptime: process.uptime(), env: process.env.NODE_ENV || "development" })
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

ensureSeeded();

const PORT = process.env.PORT || 4000;
// Bind on all interfaces: container platforms route to the container IP, not
// to loopback.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`CybernaNet API listening on port ${PORT}`);
});
