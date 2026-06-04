# The Looped Mind

> Built to Imagine. Wired to Repeat.

The marketing site for The Looped Mind — memoir, the loop framework, and the
trait packs. Built with **Next.js**, deploys on **Vercel**, captures emails
into **Supabase**.

---

## What's inside

```
app/
  layout.js              fonts + page metadata
  page.js                the whole site (hero, loop, memoir, traits, about, signup)
  globals.css            the design system (navy / cream / gold)
  api/subscribe/route.js the endpoint that saves an email to Supabase
lib/supabase.js          Supabase connection
supabase/schema.sql      the table + security rules to run once in Supabase
.env.local.example       the two keys you need to fill in
```

You only ever edit `app/page.js` to change words on the page. Everything in
the four section blocks (STAGES, TRAITS, the memoir text) lives near the top of
that file.

---

## Setup — do this once, in order

### 1. Supabase — make the email table

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste everything from `supabase/schema.sql` and click **Run**.
3. Go to **Project Settings → API** and copy two values:
   - **Project URL**
   - **anon public** key

### 2. GitHub — push the code

From this folder:

```bash
git init
git add .
git commit -m "The Looped Mind — initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/theloopedmind.git
git push -u origin main
```

(Create the empty repo on github.com first, then use its URL above.)

### 3. Vercel — deploy

1. Vercel dashboard → **Add New → Project** → import the `theloopedmind` repo.
2. Framework preset auto-detects as **Next.js**. Leave the defaults.
3. Before deploying, open **Environment Variables** and add the two from step 1:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon public key |

4. Click **Deploy**.

### 4. Domain — attach theloopedmind.com

You already own it through Vercel, so this is quick:

1. Project → **Settings → Domains**.
2. Add `theloopedmind.com` and `www.theloopedmind.com`.
3. Set `www.theloopedmind.com` as the primary (it's the one in the code).
   Vercel wires the DNS automatically since the domain is registered there.

Done. The site is live.

---

## Where the signups go

Every email lands in Supabase → **Table Editor → subscribers**, with a
`source` column (the homepage form tags itself `homepage`) and a timestamp.
The list is **not** publicly readable — only inserts are allowed, so no one
can pull your emails through the site. You read them in the dashboard, or
export to CSV from there.

To send to them later, connect Supabase to an email tool, or just export the
CSV into whatever you already use.

---

## Run it on your own computer (optional)

```bash
cp .env.local.example .env.local   # then paste your two keys into it
npm install
npm run dev                        # opens http://localhost:3000
```

---

## Editing the content

- **Headlines and body copy:** all in `app/page.js`.
- **The four loop stages:** the `STAGES` list at the top of `app/page.js`.
- **Trait packs:** the `TRAITS` list — flip `live: false` to `live: true` when a
  pack is ready, and the badge changes from "Coming soon" to "Available now".
- **Colors:** the `:root` block at the top of `app/globals.css`
  (`--navy`, `--cream`, `--gold`).

When you change anything, commit and push to GitHub — Vercel redeploys on its
own every time you push to `main`.
