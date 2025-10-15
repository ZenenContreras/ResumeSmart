-- Add comprehensive sections support to resumes table
-- This migration adds support for certifications, languages, projects, publications, and volunteer work

-- Add new columns for additional sections
ALTER TABLE resumes
ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS languages JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS projects JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS publications JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS volunteer JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS awards JSONB DEFAULT '[]'::jsonb;

-- Add template_id if it doesn't exist (for tracking which template to use)
ALTER TABLE resumes
ADD COLUMN IF NOT EXISTS template_id VARCHAR(50) DEFAULT 'harvard-ats';

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_resumes_template_id ON resumes(template_id);

-- Add comment describing the new fields
COMMENT ON COLUMN resumes.certifications IS 'Array of certification objects: [{name, issuer, date, expiryDate, credentialId, credentialUrl}]';
COMMENT ON COLUMN resumes.languages IS 'Array of language objects: [{language, proficiency}] where proficiency is: Native, Fluent, Professional, Intermediate, Basic';
COMMENT ON COLUMN resumes.projects IS 'Array of project objects: [{name, description, technologies, url, startDate, endDate, highlights[]}]';
COMMENT ON COLUMN resumes.publications IS 'Array of publication objects: [{title, publisher, date, url, authors, description}]';
COMMENT ON COLUMN resumes.volunteer IS 'Array of volunteer objects: [{organization, role, startDate, endDate, description, highlights[]}]';
COMMENT ON COLUMN resumes.awards IS 'Array of award objects: [{title, issuer, date, description}]';
