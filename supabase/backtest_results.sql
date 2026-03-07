create table backtest_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  request jsonb not null,
  result jsonb not null,
  created_at timestamptz default now() not null
);

-- RLS: 본인 데이터만 접근
alter table backtest_results enable row level security;

create policy "Users can insert own data"
  on backtest_results for insert
  with check (auth.uid() = user_id);

create policy "Users can select own data"
  on backtest_results for select
  using (auth.uid() = user_id);

create policy "Users can delete own data"
  on backtest_results for delete
  using (auth.uid() = user_id);
