create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 7 and 40),
  vehicle text not null default '' check (char_length(vehicle) <= 200),
  location text not null check (char_length(location) between 3 and 2000),
  service text not null check (service in ('Battery Jumpstart','Tyre Replacement','Towing Support','Engine Diagnostic','Fuel Support','Key Assistance','Other')),
  notes text not null default '' check (char_length(notes) <= 2000),
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);
create index if not exists bookings_owner_created on public.bookings(user_id, created_at desc);
alter table public.bookings enable row level security;
alter table public.bookings force row level security;
revoke all on public.bookings from anon, authenticated;
grant select on public.bookings to authenticated;
grant insert (id, user_id, name, email, phone, vehicle, location, service, notes) on public.bookings to authenticated;
drop policy if exists bookings_read_own on public.bookings;
create policy bookings_read_own on public.bookings for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists bookings_insert_own on public.bookings;
create policy bookings_insert_own on public.bookings for insert to authenticated
  with check ((select auth.uid()) = user_id and email = (select auth.jwt() ->> 'email') and status = 'pending');

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null default '' check (char_length(phone) <= 40),
  subject text not null check (subject in ('support','mechanic','fleet','partnership')),
  message text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
alter table public.inquiries force row level security;
revoke all on public.inquiries from anon, authenticated;
grant insert (name, email, phone, subject, message) on public.inquiries to anon, authenticated;
drop policy if exists inquiries_submit on public.inquiries;
create policy inquiries_submit on public.inquiries for insert to anon, authenticated with check (true);

create table if not exists public.rate_limits (
  key text primary key,
  count integer not null default 0 check (count >= 0),
  reset_at timestamptz not null
);
alter table public.rate_limits enable row level security;
alter table public.rate_limits no force row level security;
revoke all on public.rate_limits from anon, authenticated;

create or replace function public.take_rate_limit(p_key text, p_limit integer, p_window_ms integer)
returns table(allowed boolean, retry_after integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  safe_limit integer := greatest(1, least(coalesce(p_limit, 1), 120));
  safe_window_ms integer := greatest(1000, least(coalesce(p_window_ms, 60000), 3600000));
  now_at timestamptz := now();
  next_reset timestamptz := now_at + ((safe_window_ms || ' milliseconds')::interval);
  current_count integer;
  current_reset timestamptz;
begin
  if p_key is null or length(p_key) < 8 or length(p_key) > 256 then
    allowed := false;
    retry_after := 60;
    return next;
  end if;

  insert into public.rate_limits as rl(key, count, reset_at)
  values (p_key, 1, next_reset)
  on conflict (key) do update
    set count = case when rl.reset_at <= now_at then 1 else rl.count + 1 end,
        reset_at = case when rl.reset_at <= now_at then next_reset else rl.reset_at end
  returning rl.count, rl.reset_at into current_count, current_reset;

  allowed := current_count <= safe_limit;
  retry_after := greatest(1, ceil(extract(epoch from (current_reset - now_at)))::integer);
  return next;
end;
$$;
revoke all on function public.take_rate_limit(text, integer, integer) from public;
grant execute on function public.take_rate_limit(text, integer, integer) to anon, authenticated;
