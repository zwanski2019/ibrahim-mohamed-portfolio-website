-- Fix database security warnings by updating function search paths

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'worker'  -- Default user type, adjust as needed
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Update create_forum_user_preferences function  
CREATE OR REPLACE FUNCTION public.create_forum_user_preferences()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.forum_user_preferences (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Update hook_password_verification_attempt function
CREATE OR REPLACE FUNCTION public.hook_password_verification_attempt(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
  DECLARE
    last_failed_at timestamp;
  BEGIN
    if event->'valid' is true then
      -- password is valid, accept it
      return jsonb_build_object('decision', 'continue');
    end if;

    select last_failed_at into last_failed_at
      from public.password_failed_verification_attempts
      where
        user_id = (event->>'user_id')::uuid;

    if last_failed_at is not null and now() - last_failed_at < interval '10 seconds' then
      -- last attempt was done too quickly
      return jsonb_build_object(
        'error', jsonb_build_object(
          'http_code', 429,
          'message',   'Please wait a moment before trying again.'
        )
      );
    end if;

    -- record this failed attempt
    insert into public.password_failed_verification_attempts
      (
        user_id,
        last_failed_at
      )
      values
      (
        (event->>'user_id')::uuid,
        now()
      )
      on conflict (user_id) do update
        set last_failed_at = now();

    -- finally let Supabase Auth do the default behavior for a failed attempt
    return jsonb_build_object('decision', 'continue');
  END;
$$;