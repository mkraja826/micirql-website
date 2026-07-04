-- Run this in the Veil Supabase project's SQL Editor.
-- This resets only the website_requests table, not the whole database.

create extension if not exists pgcrypto;

drop table if exists public.website_requests cascade;

create table public.website_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text not null,
  company text,
  service text not null,
  message text not null,
  source text not null default 'micirql-website',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.website_requests enable row level security;

create policy "Anyone can submit website requests"
  on public.website_requests
  for insert
  to anon
  with check (true);

-- Reading requests should be done from Supabase dashboard/admin only.
-- No public select policy is created for safety.
