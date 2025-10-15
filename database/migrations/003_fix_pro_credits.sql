-- Migration: Fix Pro and Ultimate user credits
-- Description: Updates existing Pro and Ultimate users to have the correct number of credits

-- Update Pro users to have 10 credits instead of 1
UPDATE users
SET
  credits_remaining = 10,
  credits_total = 10
WHERE plan = 'pro' AND credits_remaining < 10;

-- Update Ultimate users to have 999 credits (representing unlimited)
UPDATE users
SET
  credits_remaining = 999,
  credits_total = 999
WHERE plan = 'ultimate';

-- Log the changes
DO $$
DECLARE
  pro_updated INTEGER;
  ultimate_updated INTEGER;
BEGIN
  -- Count Pro users updated
  SELECT COUNT(*) INTO pro_updated
  FROM users
  WHERE plan = 'pro';

  -- Count Ultimate users updated
  SELECT COUNT(*) INTO ultimate_updated
  FROM users
  WHERE plan = 'ultimate';

  RAISE NOTICE 'Updated % Pro users to 10 credits', pro_updated;
  RAISE NOTICE 'Updated % Ultimate users to 999 credits (unlimited)', ultimate_updated;
END $$;
