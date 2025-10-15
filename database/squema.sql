-- users table
-- Clerk uses string IDs like "user_xxxxx", not UUIDs
CREATE TABLE users (
    id TEXT PRIMARY KEY,  -- Changed from UUID to TEXT for Clerk IDs
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'ultimate')),
    credits_remaining INTEGER DEFAULT 1,
    credits_total INTEGER DEFAULT 1,
    purchased_at TIMESTAMP,
    stripe_customer_id TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- resumes table
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,  -- Changed to TEXT to match users.id
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('targeted', 'general')),
    job_description TEXT,
    ats_score INTEGER,
    keywords_matched INTEGER,
    keywords_total INTEGER,
    template_id TEXT DEFAULT 'modern',
    content JSONB NOT NULL,
    parent_resume_id UUID REFERENCES resumes(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- resume_versions (opcional)
CREATE TABLE resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content JSONB NOT NULL,
    ats_score INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- cover_letters (opcional)
CREATE TABLE cover_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,  -- Changed to TEXT to match users.id
    resume_id UUID REFERENCES resumes(id),
    job_description TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- indexes
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_type ON resumes(type);
CREATE INDEX idx_resumes_updated_at ON resumes(updated_at DESC);
CREATE INDEX idx_resume_versions_resume_id ON resume_versions(resume_id);