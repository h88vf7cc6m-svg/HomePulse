# HomePulse — Setup Guide

A home maintenance tracking PWA built with React, Vite, and Supabase.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy `.env.local` (already present) and fill in your Supabase project values:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

You can find these under Supabase → Project Settings → API.

## 3. Create the database schema

Open the Supabase dashboard → **SQL Editor** → paste the contents of
[`supabase.sql`](./supabase.sql) → click **Run**.

This creates the `profiles`, `tasks`, and `vendors` tables along with
Row Level Security policies that scope every row to `auth.uid()`.

## 4. Enable email authentication

In Supabase → **Authentication** → **Providers**, make sure **Email** is
enabled. (Optionally disable "Confirm email" while testing locally.)

## 5. Run the app locally

```bash
npm run dev
```

Visit the printed local URL (defaults to `http://localhost:5173`).

## 6. Deploy to Vercel

```bash
vercel deploy
```

## 7. Add environment variables in Vercel

In the Vercel dashboard → your project → **Settings** → **Environment
Variables**, add the same two variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 8. Deploy to production

```bash
vercel --prod
```

---

### Notes

- `vercel.json` includes a SPA rewrite so client-side routing (React Router)
  works correctly on refresh/deep links.
- The app is installable as a PWA (via `vite-plugin-pwa`) and caches
  Supabase API responses with a network-first strategy for limited offline
  support.
- Replace the placeholder icons in `public/icons/` with your own branded
  192×192 and 512×512 PNGs before shipping to production.
