-- Sut bo'limi bazasi: Supabase > SQL Editor ga to'liq joylab, "Run" bosing.

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  barcode     text not null,
  name        text not null,
  image       text,
  shelf_days  integer,
  created_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create unique index if not exists products_user_barcode_uq
  on public.products(user_id, barcode) where deleted_at is null;

create table if not exists public.batches (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  product_id   uuid not null references public.products(id) on delete cascade,
  prod_date    date,
  expiry_date  date not null,
  qty          integer,
  created_at   timestamptz not null default now(),
  deleted_at   timestamptz
);
create index if not exists batches_created_idx on public.batches(user_id, created_at);
create index if not exists batches_deleted_idx on public.batches(user_id, deleted_at);

create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  text        text not null,
  done        boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title       text not null,
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.task_checks (
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  task_id     uuid not null references public.tasks(id) on delete cascade,
  day         date not null,
  created_at  timestamptz not null default now(),
  primary key (task_id, day)
);

create table if not exists public.settings (
  user_id     uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  warn_days   integer not null default 3
);

-- Xavfsizlik: har kim faqat o'z ma'lumotini ko'radi
alter table public.products    enable row level security;
alter table public.batches     enable row level security;
alter table public.notes       enable row level security;
alter table public.tasks       enable row level security;
alter table public.task_checks enable row level security;
alter table public.settings    enable row level security;

drop policy if exists own_rows on public.products;
drop policy if exists own_rows on public.batches;
drop policy if exists own_rows on public.notes;
drop policy if exists own_rows on public.tasks;
drop policy if exists own_rows on public.task_checks;
drop policy if exists own_rows on public.settings;

create policy own_rows on public.products    for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.batches     for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.notes       for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.tasks       for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.task_checks for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.settings    for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update, delete on public.products, public.batches, public.notes,
  public.tasks, public.task_checks, public.settings to authenticated;
