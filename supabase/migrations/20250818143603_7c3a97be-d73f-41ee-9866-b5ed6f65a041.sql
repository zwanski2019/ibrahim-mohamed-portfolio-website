-- Fix profiles table schema to resolve type conflicts
-- Remove duplicate subscription_status fields and standardize the schema

DROP TABLE IF EXISTS profiles CASCADE;

-- Create clean profiles table with consistent schema
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  verified BOOLEAN DEFAULT false,
  user_type TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since we're removing auth)
CREATE POLICY "Profiles are publicly readable" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();