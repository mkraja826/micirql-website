-- Review in a non-production Supabase project before applying to production.
-- This matches src/supabaseClient.js and exposes anonymous INSERT only.

create extension if not exists pgcrypto;

create table if not exists public.public_site_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  email text check (email is null or char_length(email) <= 320),
  phone text not null check (char_length(btrim(phone)) between 1 and 40),
  company text check (company is null or char_length(company) <= 160),
  interest text not null check (char_length(btrim(interest)) between 1 and 120),
  message text not null check (char_length(btrim(message)) between 1 and 3000),
  source text not null default 'micirql.com' check (source = 'micirql.com'),
  page_url text check (page_url is null or char_length(page_url) <= 2048),
  referrer text check (referrer is null or char_length(referrer) <= 2048),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.public_site_leads enable row level security;

revoke all on table public.public_site_leads from anon, authenticated;
grant insert on table public.public_site_leads to anon;

drop policy if exists "Anonymous visitors can submit new public-site leads"
  on public.public_site_leads;

create policy "Anonymous visitors can submit new public-site leads"
  on public.public_site_leads
  for insert
  to anon
  with check (
    status = 'new'
    and source = 'micirql.com'
    and char_length(btrim(name)) between 1 and 120
    and char_length(btrim(phone)) between 1 and 40
    and char_length(btrim(message)) between 1 and 3000
  );

-- No anon/authenticated SELECT, UPDATE, or DELETE grant or policy is created.
-- Dashboard owners and explicitly configured server-side roles manage lead follow-up.
