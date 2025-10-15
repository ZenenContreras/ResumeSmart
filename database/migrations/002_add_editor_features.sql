-- Migration: Add editor features support
-- Description: Adds support for template selection, font size, and editor state

-- Add new columns to resumes table
ALTER TABLE resumes
ADD COLUMN IF NOT EXISTS font_size INTEGER DEFAULT 11,
ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS editor_state JSONB DEFAULT '{}'::jsonb;

-- Update template_id to support new templates
-- Existing values: 'modern'
-- New values: 'harvard-ats', 'purple-executive', 'blue-corporate'

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_template ON resumes(user_id, template_id);
CREATE INDEX IF NOT EXISTS idx_resumes_updated_at ON resumes(updated_at DESC);

-- Default sections structure for new resumes
-- This will be used in the application code
COMMENT ON COLUMN resumes.sections IS 'Array of section objects: [{id, type, title, visible, order}]';

-- Example sections structure:
-- [
--   {"id": "summary", "type": "summary", "title": "Summary", "visible": true, "order": 1},
--   {"id": "experience", "type": "experience", "title": "Experience", "visible": true, "order": 2},
--   {"id": "education", "type": "education", "title": "Education", "visible": true, "order": 3},
--   {"id": "skills", "type": "skills", "title": "Skills", "visible": true, "order": 4},
--   {"id": "certifications", "type": "certifications", "title": "Certifications", "visible": true, "order": 5}
-- ]

-- Update existing resumes with default sections if they don't have any
UPDATE resumes
SET sections = '[
  {"id": "summary", "type": "summary", "title": "Summary", "visible": true, "order": 1},
  {"id": "experience", "type": "experience", "title": "Experience", "visible": true, "order": 2},
  {"id": "education", "type": "education", "title": "Education", "visible": true, "order": 3},
  {"id": "skills", "type": "skills", "title": "Skills", "visible": true, "order": 4},
  {"id": "certifications", "type": "certifications", "title": "Certifications", "visible": true, "order": 5}
]'::jsonb
WHERE sections = '[]'::jsonb OR sections IS NULL;
