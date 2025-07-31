-- Add pricing and content fields to courses
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS price_basic DECIMAL(10,2);
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS price_premium DECIMAL(10,2);
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS content_url TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS premium_content_url TEXT;
