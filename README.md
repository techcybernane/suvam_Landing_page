# Vertexa Technologies — Website & Admin CMS

A premium landing page (MERN-style stack, no MongoDB — content is stored as JSON files
on disk so there's nothing extra to install) with a full admin panel for managing every
piece of content, leads, and email settings without touching code.

## Stack

- `server/` — Express REST API. Auth (JWT in an httpOnly cookie), content storage
  (JSON files under `server/data/`, created automatically), media uploads
  (`server/uploads/`), lead capture + email notifications (Nodemailer).
- `web/` — **the app**. Next.js (App Router). Bilingual public site at `/` (English)
  and `/fr` (French), admin console at `/admin`.
- `client/` — the original React + Vite app. **Superseded by `web/` and no longer
  maintained**; kept only for reference.

## Getting started

**1. Install dependencies**

```bash
cd server && npm install
cd ../web && npm install
```

**2. Configure the server**

```bash
cd server
cp .env.example .env
```

Edit `.env` if you want to change the admin login or wire up real email delivery. By
default the admin account is `admin@vertexa.io` / `ChangeMe123!` — **change this**
before deploying anywhere public. If you leave the `SMTP_*` variables blank, emails are
printed to the server console instead of sent — handy for local testing.

**3. Run both apps** (two terminals, from the repo root)

```bash
# terminal 1 — API
cd server && npm run dev     # http://localhost:4000

# terminal 2 — site + admin
cd web && npm run dev        # http://localhost:3000
```

Then open:

| | |
| --- | --- |
| English site | http://localhost:3000 |
| French site | http://localhost:3000/fr |
| Admin console | http://localhost:3000/admin/login |

The site needs the API running — `web/next.config.js` proxies `/api` and `/uploads`
to port 4000.

To run the production build locally instead (what Vercel serves):

```bash
cd web && npm run build && npm start
```

## What the admin can do (no code required)

- **Page Sections** — edit every section of the landing page (hero, features, pricing,
  testimonials, the 3-step CTA banner, contact info), reorder them, and hide/show any
  section.
- **Media Library** — upload, copy the URL of, and delete images.
- **FAQs** — add, edit, reorder, enable/disable questions.
- **Leads** — every contact-form submission lands here: searchable, filterable by
  status, sortable, with status tracking (New → Contacted → In Progress → Converted →
  Closed).
- **Email & Lead Settings** — change which email addresses receive new leads, and edit
  the automatic confirmation email sent to whoever submits the form.
- **Site & SEO** — brand name, navigation links, footer, page title & meta description.

## Data storage

Content lives in plain JSON files under `server/data/` (git-ignored) and uploaded
images under `server/uploads/`. There's no database server to install or manage. If you
outgrow this later, everything reads/writes through `server/src/data/collections.js` —
that's the one place you'd swap in a real database.

## Production notes

- Set a long random `JWT_SECRET` and a strong `ADMIN_PASSWORD` before deploying.
- Configure real `SMTP_*` credentials so leads actually get emailed.
- Build the client with `npm run build` in `client/` and serve the `dist/` folder from
  your host of choice (or have the Express server serve it statically).

## Deployment

The two halves of this project deploy to **different hosts**, and that is deliberate.

| Part | Host | Why |
| --- | --- | --- |
| `web/` — Next.js site + admin UI | **Vercel** | Standard Next app, fully supported. |
| `server/` — Express API | **Render / Railway / Fly / any VPS** | It writes to disk. Vercel cannot host it. |

### Why the API cannot go on Vercel

The API is not a stateless service. It writes to the filesystem on every:

- admin content save (`content.json`)
- FAQ edit (`faqs.json`)
- contact-form or popup submission (`leads.json`)
- media upload (`uploads/`)
- first boot (`users.json`, `settings.json`)

Vercel functions run on a read-only filesystem apart from `/tmp`, which is
per-instance and discarded between invocations. Deployed there, every one of the
above would appear to succeed and then vanish. It needs a host with a
**persistent volume**, and `DATA_DIR` must point at that volume — the
application directory itself is wiped on each deploy.

(Moving the API onto Vercel is possible, but it means replacing the JSON store
with a managed database and object storage. That is a separate piece of work.)

### 1. Deploy the API first

The frontend needs its URL, so start here.

**Render** — `render.yaml` at the repo root describes the service, a 1 GB disk
mounted at `/var/data`, and the health check. Create a Blueprint from the repo,
then set in the dashboard:

```
CLIENT_ORIGIN    https://<your-vercel-domain>
ADMIN_EMAIL      your real admin address
ADMIN_PASSWORD   a strong password  # used once, to seed the first account
```

`JWT_SECRET` is generated automatically; `DATA_DIR=/var/data` is already set.
Note the `starter` plan is specified because Render's free tier has no
persistent disk.

**Anywhere else** — `server/Dockerfile` builds a portable image. Mount a volume
at `/var/data` and pass the same environment variables (see
`server/.env.example`).

Confirm it is up: `curl https://<api-domain>/api/health`

### 2. Deploy the frontend to Vercel

Import the repo, then **set Root Directory to `web`** — this is the one setting
that cannot live in `vercel.json`, and the build fails without it.

Add one environment variable:

```
BACKEND_ORIGIN   https://<api-domain>     # no trailing slash
```

`web/vercel.json` handles the rest (framework, region `cdg1` for francophone
Africa, security headers, `noindex` on `/admin`).

`web/next.config.js` proxies `/api` and `/uploads` through to the API, so the
browser only ever talks to the Vercel domain. That is what keeps the httpOnly
auth cookie same-site — do not point the admin UI straight at the API domain.

### 3. After the first deploy

- Sign in at `/admin` and **change the seeded admin password**.
- Set `CLIENT_ORIGIN` on the API to the real Vercel domain.
- Content, both locales, seeds itself on first boot from
  `server/src/seed/defaults.js` + `translations.fr.json`; from then on it is
  edited through the admin panel and lives on the volume.

### Production safeguards

- The API **refuses to start** in production if `JWT_SECRET` is unset, rather
  than falling back to the shared development secret.
- `CLIENT_ORIGIN` accepts a comma-separated allow-list (production + previews).
- `GET /api/health` is a liveness probe for the platform.
