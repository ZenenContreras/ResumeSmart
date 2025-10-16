-- ResumeSmart Database Schema
-- Updated: 2025-10-16

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT NULL,
  plan TEXT NULL DEFAULT 'free'::TEXT,
  credits_remaining INTEGER NULL DEFAULT 1,
  credits_total INTEGER NULL DEFAULT 1,
  purchased_at TIMESTAMP WITHOUT TIME ZONE NULL,
  stripe_customer_id TEXT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITHOUT TIME ZONE NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_plan_check CHECK (
    plan = ANY (ARRAY['free'::TEXT, 'pro'::TEXT, 'ultimate'::TEXT])
  )
) TABLESPACE pg_default;

-- Index for expiration date queries
CREATE INDEX IF NOT EXISTS idx_users_expires_at
  ON public.users USING BTREE (expires_at)
  TABLESPACE pg_default
  WHERE expires_at IS NOT NULL;

-- =====================================================
-- RESUMES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id TEXT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  job_description TEXT NULL,
  ats_score INTEGER NULL,
  keywords_matched INTEGER NULL,
  keywords_total INTEGER NULL,
  template_id TEXT NULL DEFAULT 'modern'::TEXT,
  content JSONB NOT NULL,
  parent_resume_id UUID NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NOW(),
  font_size INTEGER NULL DEFAULT 11,
  sections JSONB NULL DEFAULT '[]'::JSONB,
  editor_state JSONB NULL DEFAULT '{}'::JSONB,
  certifications JSONB NULL DEFAULT '[]'::JSONB,
  languages JSONB NULL DEFAULT '[]'::JSONB,
  projects JSONB NULL DEFAULT '[]'::JSONB,
  publications JSONB NULL DEFAULT '[]'::JSONB,
  volunteer JSONB NULL DEFAULT '[]'::JSONB,
  awards JSONB NULL DEFAULT '[]'::JSONB,
  CONSTRAINT resumes_pkey PRIMARY KEY (id),
  CONSTRAINT resumes_parent_resume_id_fkey FOREIGN KEY (parent_resume_id)
    REFERENCES resumes (id),
  CONSTRAINT resumes_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT resumes_type_check CHECK (
    type = ANY (ARRAY['targeted'::TEXT, 'general'::TEXT])
  )
) TABLESPACE pg_default;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_resumes_updated_at
  ON public.resumes USING BTREE (updated_at DESC)
  TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_resumes_user_id
  ON public.resumes USING BTREE (user_id)
  TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_resumes_type
  ON public.resumes USING BTREE (type)
  TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_resumes_user_template
  ON public.resumes USING BTREE (user_id, template_id)
  TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_resumes_template_id
  ON public.resumes USING BTREE (template_id)
  TABLESPACE pg_default;

-- =====================================================
-- RESUME VERSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resume_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  resume_id UUID NULL,
  version_number INTEGER NOT NULL,
  content JSONB NOT NULL,
  ats_score INTEGER NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT resume_versions_pkey PRIMARY KEY (id),
  CONSTRAINT resume_versions_resume_id_fkey FOREIGN KEY (resume_id)
    REFERENCES resumes (id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_resume_versions_resume_id
  ON public.resume_versions USING BTREE (resume_id)
  TABLESPACE pg_default;

-- =====================================================
-- COVER LETTERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.cover_letters (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id TEXT NULL,
  resume_id UUID NULL,
  job_description TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT cover_letters_pkey PRIMARY KEY (id),
  CONSTRAINT cover_letters_resume_id_fkey FOREIGN KEY (resume_id)
    REFERENCES resumes (id),
  CONSTRAINT cover_letters_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cover_letters ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_select_own ON public.users
  FOR SELECT USING (auth.uid()::TEXT = id);

CREATE POLICY users_update_own ON public.users
  FOR UPDATE USING (auth.uid()::TEXT = id);

-- Resumes policies
CREATE POLICY resumes_select_own ON public.resumes
  FOR SELECT USING (auth.uid()::TEXT = user_id);

CREATE POLICY resumes_insert_own ON public.resumes
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id);

CREATE POLICY resumes_update_own ON public.resumes
  FOR UPDATE USING (auth.uid()::TEXT = user_id);

CREATE POLICY resumes_delete_own ON public.resumes
  FOR DELETE USING (auth.uid()::TEXT = user_id);

-- Resume versions policies
CREATE POLICY resume_versions_select ON public.resume_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.resumes
      WHERE resumes.id = resume_versions.resume_id
      AND resumes.user_id = auth.uid()::TEXT
    )
  );

-- Cover letters policies
CREATE POLICY cover_letters_select_own ON public.cover_letters
  FOR SELECT USING (auth.uid()::TEXT = user_id);

CREATE POLICY cover_letters_insert_own ON public.cover_letters
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id);

CREATE POLICY cover_letters_update_own ON public.cover_letters
  FOR UPDATE USING (auth.uid()::TEXT = user_id);

CREATE POLICY cover_letters_delete_own ON public.cover_letters
  FOR DELETE USING (auth.uid()::TEXT = user_id);

-- =====================================================
-- NOTES
-- =====================================================
-- 1. The 'id' in users table comes from Clerk authentication
-- 2. Email is unique to prevent duplicate accounts
-- 3. Credits system: free (1), pro (10), ultimate (unlimited during period)
-- 4. Foreign keys use CASCADE DELETE to clean up data when user is deleted
-- 5. RLS policies ensure users can only access their own data
-- 6. Indexes are created for common query patterns
