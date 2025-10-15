-- Migration: Add plan expiration for ULTIMATE plan
-- Description: Adds expires_at column to track when ULTIMATE plan expires (90 days)

-- Add expires_at column (nullable because PRO never expires)
ALTER TABLE users ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP DEFAULT NULL;

-- Add comment to column
COMMENT ON COLUMN users.expires_at IS 'When the plan expires (only for ULTIMATE plan - 90 days from purchase). NULL = never expires.';

-- Create index for efficient expiration checks
CREATE INDEX IF NOT EXISTS idx_users_expires_at ON users(expires_at) WHERE expires_at IS NOT NULL;

-- Update existing ULTIMATE users if any (set to 90 days from purchased_at)
UPDATE users
SET expires_at = purchased_at + INTERVAL '90 days'
WHERE plan = 'ultimate' AND purchased_at IS NOT NULL AND expires_at IS NULL;

-- Log the changes
DO $$
DECLARE
  ultimate_updated INTEGER;
BEGIN
  SELECT COUNT(*) INTO ultimate_updated
  FROM users
  WHERE plan = 'ultimate' AND expires_at IS NOT NULL;

  RAISE NOTICE 'Set expiration for % ULTIMATE users', ultimate_updated;
END $$;
