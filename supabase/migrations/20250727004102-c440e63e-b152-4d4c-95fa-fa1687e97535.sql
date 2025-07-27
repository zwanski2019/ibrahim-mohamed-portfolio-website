-- Create turnstile_logs table for security monitoring
CREATE TABLE public.turnstile_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  errors TEXT[],
  hostname TEXT,
  challenge_ts TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on turnstile_logs
ALTER TABLE public.turnstile_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for turnstile_logs
CREATE POLICY "Admins can view turnstile logs" 
ON public.turnstile_logs 
FOR SELECT 
USING (is_admin());

CREATE POLICY "System can insert turnstile logs" 
ON public.turnstile_logs 
FOR INSERT 
WITH CHECK (true);

-- Create security_events table for enhanced monitoring
CREATE TABLE public.security_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on security_events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for security_events
CREATE POLICY "Admins can view security events" 
ON public.security_events 
FOR SELECT 
USING (is_admin());

CREATE POLICY "System can insert security events" 
ON public.security_events 
FOR INSERT 
WITH CHECK (true);

-- Create rate_limits table for rate limiting
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- IP address or user ID
  action TEXT NOT NULL, -- contact_form, auth_attempt, etc.
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 hour'),
  UNIQUE(identifier, action, window_start)
);

-- Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for rate_limits
CREATE POLICY "System can manage rate limits" 
ON public.rate_limits 
FOR ALL 
USING (true);

-- Enhanced admin validation function
CREATE OR REPLACE FUNCTION public.is_admin_enhanced()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  user_is_admin BOOLEAN := false;
  jwt_role TEXT;
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  
  -- Check database profile
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
    AND is_verified = true
  ) INTO user_is_admin;
  
  -- Check JWT claims for additional validation
  jwt_role := (auth.jwt() ->> 'role');
  
  -- Log admin access attempts
  INSERT INTO public.security_events (user_id, event_type, event_data)
  VALUES (
    auth.uid(),
    'admin_access_check',
    jsonb_build_object(
      'database_admin', user_is_admin,
      'jwt_role', jwt_role,
      'timestamp', now()
    )
  );
  
  RETURN user_is_admin;
END;
$$;

-- Rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_action TEXT,
  p_max_requests INTEGER DEFAULT 10,
  p_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Calculate window start
  window_start := date_trunc('hour', now()) + 
    (EXTRACT(minute FROM now())::INTEGER / p_window_minutes) * 
    (p_window_minutes * interval '1 minute');
  
  -- Get current count for this window
  SELECT COALESCE(count, 0) INTO current_count
  FROM public.rate_limits
  WHERE identifier = p_identifier
    AND action = p_action
    AND window_start = window_start;
  
  -- Check if limit exceeded
  IF current_count >= p_max_requests THEN
    -- Log rate limit violation
    INSERT INTO public.security_events (event_type, event_data)
    VALUES (
      'rate_limit_exceeded',
      jsonb_build_object(
        'identifier', p_identifier,
        'action', p_action,
        'count', current_count,
        'limit', p_max_requests
      )
    );
    RETURN false;
  END IF;
  
  -- Update or insert rate limit record
  INSERT INTO public.rate_limits (identifier, action, count, window_start, expires_at)
  VALUES (
    p_identifier,
    p_action,
    1,
    window_start,
    window_start + (p_window_minutes * interval '1 minute')
  )
  ON CONFLICT (identifier, action, window_start)
  DO UPDATE SET count = rate_limits.count + 1;
  
  RETURN true;
END;
$$;

-- Input validation function
CREATE OR REPLACE FUNCTION public.validate_contact_input(
  p_name TEXT,
  p_email TEXT,
  p_message TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  errors JSONB := '[]'::JSONB;
BEGIN
  -- Validate name
  IF p_name IS NULL OR length(trim(p_name)) < 2 THEN
    errors := errors || '["Name must be at least 2 characters"]'::JSONB;
  END IF;
  
  IF length(p_name) > 100 THEN
    errors := errors || '["Name must be less than 100 characters"]'::JSONB;
  END IF;
  
  -- Validate email
  IF p_email IS NULL OR p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    errors := errors || '["Please enter a valid email address"]'::JSONB;
  END IF;
  
  -- Validate message
  IF p_message IS NULL OR length(trim(p_message)) < 10 THEN
    errors := errors || '["Message must be at least 10 characters"]'::JSONB;
  END IF;
  
  IF length(p_message) > 5000 THEN
    errors := errors || '["Message must be less than 5000 characters"]'::JSONB;
  END IF;
  
  -- Check for suspicious content
  IF p_message ~* '(script|javascript|<iframe|<object|<embed)' THEN
    errors := errors || '["Message contains potentially harmful content"]'::JSONB;
  END IF;
  
  RETURN jsonb_build_object('valid', jsonb_array_length(errors) = 0, 'errors', errors);
END;
$$;