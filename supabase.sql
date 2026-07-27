-- HomePulse database schema with Row Level Security
-- Run this entire script in Supabase → SQL Editor

-- profiles
CREATE TABLE profiles (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  address      text,
  year_built   integer,
  sq_footage   integer,
  created_at   timestamptz DEFAULT now()
);

-- tasks
CREATE TABLE tasks (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title        text NOT NULL,
  category     text NOT NULL,
  frequency    text NOT NULL,   -- Monthly/Quarterly/Seasonal/Annual/One-time
  due_date     date NOT NULL,
  completed    boolean DEFAULT false,
  vendor_name  text,
  notes        text,
  created_at   timestamptz DEFAULT now()
);

-- vendors
CREATE TABLE vendors (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name         text NOT NULL,
  category     text NOT NULL,
  phone        text,
  email        text,
  rating       integer DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  notes        text,
  created_at   timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- profiles policies
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "profiles_delete_own" ON profiles
  FOR DELETE USING (auth.uid() = user_id);

-- tasks policies
CREATE POLICY "tasks_select_own" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "tasks_insert_own" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tasks_update_own" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "tasks_delete_own" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- vendors policies
CREATE POLICY "vendors_select_own" ON vendors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "vendors_insert_own" ON vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "vendors_update_own" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "vendors_delete_own" ON vendors
  FOR DELETE USING (auth.uid() = user_id);

-- Auto-create a profile row whenever a new auth user is created.
-- Runs with elevated privileges so it works even before email confirmation
-- (i.e. before the user has an authenticated session), bypassing RLS safely.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Migration: onboarding fields, account type, and documents
-- Safe to re-run — every statement below is idempotent.
-- ============================================================

-- Onboarding fields that the app has been writing to `profiles`
-- (added here so a fresh install matches the live schema).
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS owner_type text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS home_age text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS home_type text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS region text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_complete boolean DEFAULT false;

-- Account type: homeowner vs. small business owner
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS account_type text DEFAULT 'homeowner'
  CHECK (account_type IN ('homeowner', 'business'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS business_type text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS business_name text;

-- documents — per-category document/record uploads for both
-- homeowners and business owners (receipts, warranties, permits,
-- inspection reports, insurance policies, etc.)
CREATE TABLE IF NOT EXISTS documents (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category     text NOT NULL,
  title        text,
  file_name    text NOT NULL,
  file_path    text NOT NULL,
  file_size    bigint,
  mime_type    text,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "documents_select_own" ON documents;
CREATE POLICY "documents_select_own" ON documents
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "documents_insert_own" ON documents;
CREATE POLICY "documents_insert_own" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "documents_update_own" ON documents;
CREATE POLICY "documents_update_own" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "documents_delete_own" ON documents;
CREATE POLICY "documents_delete_own" ON documents
  FOR DELETE USING (auth.uid() = user_id);

-- Private storage bucket for uploaded files. Files are stored at
-- `${user_id}/${category}/${filename}` so the policies below can
-- scope access to the owning user via the first path segment.
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "documents_storage_select_own" ON storage.objects;
CREATE POLICY "documents_storage_select_own" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "documents_storage_insert_own" ON storage.objects;
CREATE POLICY "documents_storage_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "documents_storage_delete_own" ON storage.objects;
CREATE POLICY "documents_storage_delete_own" ON storage.objects
  FOR DELETE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================================
-- Migration: freemium plan (UI-only gating for now — no billing
-- provider wired up yet, so every account defaults to 'free').
-- ============================================================
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free'
  CHECK (plan IN ('free', 'paid'));
