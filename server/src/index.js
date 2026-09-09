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

// Comma-separated allow-list so one deployment can serve the local dev origin,
// the Vercel production domain and its preview domains.
const ALLOWED_ORIGINS = (process.env.CLIENT_ORIGIN || "http://localhost:3000,http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin/server-to-server requests arrive without an Origin header.
      // In practice the browser never calls this API cross-origin: Next proxies
      // /api through its own domain (see web/next.config.js), which is what
      // keeps the httpOnly auth cookie same-site.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
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
