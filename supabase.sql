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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
