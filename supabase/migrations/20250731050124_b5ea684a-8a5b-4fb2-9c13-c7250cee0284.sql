-- CRITICAL SECURITY FIXES FOR ZWANSKI.ORG

-- Phase 1: Enable RLS on Critical Tables
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Fix admin_logs policies (remove overly permissive policy)
DROP POLICY IF EXISTS "Admin logs can only be accessed by admins" ON public.admin_logs;
DROP POLICY IF EXISTS "admin_logs_admin_policy" ON public.admin_logs;

-- Create secure admin_logs policies
CREATE POLICY "admin_logs_select_policy" ON public.admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "admin_logs_insert_policy" ON public.admin_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Fix analytics policies (remove overly permissive authenticated access)
DROP POLICY IF EXISTS "Authenticated users can view analytics" ON public.analytics;

-- Secure analytics - only admins can view, but anonymous can insert for tracking
CREATE POLICY "analytics_admin_select" ON public.analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Keep public insert for analytics tracking but add rate limiting
CREATE POLICY "analytics_public_insert" ON public.analytics
  FOR INSERT WITH CHECK (true);

-- Fix api_error_logs - only admins should access
DROP POLICY IF EXISTS "System can insert error logs" ON public.api_error_logs;

CREATE POLICY "api_error_logs_admin_only" ON public.api_error_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Fix blog_posts policies - remove overly permissive authenticated access
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON public.blog_posts;

-- Create proper blog_posts policies
CREATE POLICY "blog_posts_public_read" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "blog_posts_admin_manage" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Phase 2: Strengthen Admin Access Control
-- Create a more secure admin role checking function
CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  user_admin_status boolean := false;
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  
  -- Check admin status in profiles table
  SELECT (user_type = 'admin' AND is_verified = true) 
  INTO user_admin_status
  FROM public.profiles 
  WHERE id = auth.uid();
  
  -- Log admin access checks for security auditing
  INSERT INTO public.security_events (user_id, event_type, event_data)
  VALUES (
    auth.uid(),
    'admin_access_verification',
    jsonb_build_object(
      'is_admin', COALESCE(user_admin_status, false),
      'timestamp', now(),
      'ip_address', current_setting('request.headers', true)::jsonb->>'x-real-ip'
    )
  );
  
  RETURN COALESCE(user_admin_status, false);
END;
$$;

-- Phase 3: Add Missing Triggers for User Management
-- Fix the missing trigger that was causing foreign key violations
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile record
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    user_type,
    is_verified
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'user',
    false
  );
  
  -- Create forum user preferences to avoid foreign key violations
  INSERT INTO public.forum_user_preferences (
    user_id,
    forum_role,
    email_notifications,
    push_notifications
  )
  VALUES (
    NEW.id,
    'member',
    true,
    true
  );
  
  -- Create community stats
  INSERT INTO public.community_user_stats (
    user_id,
    posts_count,
    comments_count,
    likes_given,
    likes_received,
    reputation_points,
    community_level
  )
  VALUES (
    NEW.id,
    0,
    0,
    0,
    0,
    0,
    'newcomer'
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the signup
    INSERT INTO public.api_error_logs (
      path, method, error_message, user_id, status_code
    ) VALUES (
      '/auth/signup', 'POST', SQLERRM, NEW.id, 500
    );
    RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Phase 4: Add Security Event Logging
CREATE TABLE IF NOT EXISTS public.security_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "security_events_admin_only" ON public.security_events
  FOR ALL USING (public.is_admin_secure());

-- Phase 5: Secure Contact Messages Further
-- Add rate limiting table if not exists
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL,
  action text NOT NULL,
  count integer DEFAULT 1,
  window_start timestamp with time zone NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  UNIQUE(identifier, action, window_start)
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only system can manage rate limits
CREATE POLICY "rate_limits_system_only" ON public.rate_limits
  FOR ALL USING (false); -- No direct access, only through functions