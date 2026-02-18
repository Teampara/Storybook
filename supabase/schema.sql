create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  child_name text not null,
  input jsonb not null,
  pages jsonb not null,
  visual_dna text,
  seed bigint,
  amount integer default 0,
  is_paid boolean default false,
  pdf_url text,
  created_at timestamptz default now()
);
