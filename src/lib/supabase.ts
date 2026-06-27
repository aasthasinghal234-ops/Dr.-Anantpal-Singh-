import { createClient } from "@supabase/supabase-js";

// Retrieve the Supabase URL and Anon Key with fallback to user's provided credentials
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || "https://rcoatfhzyrwvgvdawabk.supabase.co";
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || "sb_publishable_CTrFBNBoIuI-BFQijHCgNg_9AKoTHst";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SQL command template to help user set up the table in their Supabase console
export const SUPABASE_SQL_SETUP = `
-- Run this SQL in your Supabase SQL Editor to create the bookings table:

create table bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  email text not null,
  service text not null,
  date date not null,
  slot text not null,
  message text,
  status text default 'pending'
);

-- Enable Row Level Security (RLS)
alter table bookings enable row level security;

-- Create a policy that allows anyone to insert bookings
create policy "Allow public inserts" on bookings for insert with check (true);

-- Create a policy that allows reading bookings (for admin or public view if needed)
create policy "Allow public select" on bookings for select using (true);
`;
