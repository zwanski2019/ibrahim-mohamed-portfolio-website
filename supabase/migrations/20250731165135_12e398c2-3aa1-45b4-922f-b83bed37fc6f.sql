-- Add subscription fields to profiles
ALTER TABLE public.profiles
  ADD COLUMN subscription_status VARCHAR(20),
  ADD COLUMN subscription_start_date TIMESTAMPTZ,
  ADD COLUMN subscription_end_date TIMESTAMPTZ;

-- Ensure RLS allows users to read their own subscription info
CREATE POLICY IF NOT EXISTS "Users can view their own subscription fields" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);
