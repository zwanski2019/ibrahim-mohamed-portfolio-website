-- Remove CAPTCHA-related database functions and clean up
DROP FUNCTION IF EXISTS public.get_hcaptcha_secret() CASCADE;

-- Remove CAPTCHA-related tables if they exist
DROP TABLE IF EXISTS public.hcaptcha_sites CASCADE;
DROP TABLE IF EXISTS public.turnstile_logs CASCADE;

-- Clean up any CAPTCHA-related security events
DELETE FROM public.security_events 
WHERE event_type IN (
  'turnstile_verification',
  'hcaptcha_verification', 
  'captcha_verification_failed',
  'captcha_timeout'
);

-- Remove any CAPTCHA-related rate limits
DELETE FROM public.rate_limits 
WHERE action IN (
  'turnstile_verify',
  'hcaptcha_verify',
  'captcha_verification'
);