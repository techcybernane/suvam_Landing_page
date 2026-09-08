# Vertexa Technologies — Website & Admin CMS

A premium landing page (MERN-style stack, no MongoDB — content is stored as JSON files
on disk so there's nothing extra to install) with a full admin panel for managing every
piece of content, leads, and email settings without touching code.

## Stack

- `server/` — Express REST API. Auth (JWT in an httpOnly cookie), content storage
  (JSON files under `server/data/`, created automatically), media uploads
  (`server/uploads/`), lead capture + email notifications (Nodemailer).
- `client/` — React (Vite) app. Public landing page at `/`, admin console at `/admin`.

## Getting started

**1. Install dependencies**

```bash
cd server && npm install
cd ../client && npm install
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

**3. Run both apps** (two terminals)

```bash
cd server && npm run dev     # http://localhost:4000
cd client && npm run dev     # http://localhost:5173
```

Visit `http://localhost:5173` for the site, `http://localhost:5173/admin/login` to sign in.

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
