-- The Looped Mind — Supabase schema
-- Run this once in your Supabase project: Dashboard > SQL Editor > New query > paste > Run.

create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text not null default 'general',
  created_at  timestamptz not null default now()
);

-- One row per email, case-insensitive (prevents duplicate signups).
create unique index if not exists subscribers_email_idx
  on public.subscribers (lower(email));

-- Lock the table down, then allow only anonymous INSERTs (signups).
-- No one can read the list through the public API; you view it in the
-- Supabase dashboard under Table Editor > subscribers.
alter table public.subscribers enable row level security;

drop policy if exists "Allow anonymous signups" on public.subscribers;
create policy "Allow anonymous signups"
  on public.subscribers
  for insert
  to anon
  with check (true);


-- ============================================================
-- Stories submitted from the "Tell Me Your Story" page
-- (/share-your-story). Run this block the same way: paste into
-- Supabase SQL Editor and Run.
-- ============================================================
create table if not exists public.stories (
  id            uuid primary key default gen_random_uuid(),
  name          text,
  email         text,
  loop_start    text,
  building_now  text,
  next_idea     text,
  story         text,
  consent       boolean not null default false,
  created_at    timestamptz not null default now()
);

alter table public.stories enable row level security;

drop policy if exists "Allow anonymous story submissions" on public.stories;
create policy "Allow anonymous story submissions"
  on public.stories
  for insert
  to anon
  with check (true);
