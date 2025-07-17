-- Backfill existing job posts with geocoded coordinates
-- This will help populate coordinates for existing jobs without location data

UPDATE job_posts 
SET 
  latitude = CASE 
    WHEN location ILIKE '%tunis%' THEN 36.8065
    WHEN location ILIKE '%sfax%' THEN 34.7406  
    WHEN location ILIKE '%sousse%' THEN 35.8256
    WHEN location ILIKE '%gabes%' THEN 33.8815
    WHEN location ILIKE '%bizerte%' THEN 37.2744
    WHEN location ILIKE '%gafsa%' THEN 34.425
    WHEN location ILIKE '%monastir%' THEN 35.7772
    WHEN location ILIKE '%ben arous%' THEN 36.7539
    ELSE 34.0  -- Default to center of Tunisia
  END,
  longitude = CASE 
    WHEN location ILIKE '%tunis%' THEN 10.1815
    WHEN location ILIKE '%sfax%' THEN 10.7603
    WHEN location ILIKE '%sousse%' THEN 10.6369
    WHEN location ILIKE '%gabes%' THEN 10.0982
    WHEN location ILIKE '%bizerte%' THEN 9.8739
    WHEN location ILIKE '%gafsa%' THEN 8.784
    WHEN location ILIKE '%monastir%' THEN 10.826
    WHEN location ILIKE '%ben arous%' THEN 10.2278
    ELSE 9.0  -- Default to center of Tunisia
  END
WHERE latitude IS NULL OR longitude IS NULL;