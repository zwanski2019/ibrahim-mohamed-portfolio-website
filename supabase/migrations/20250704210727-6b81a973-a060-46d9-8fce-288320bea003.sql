-- Create admin access function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
$$;

-- Add admin policies for user management
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin());

-- Add admin policies for community management
CREATE POLICY "Admins can manage all posts" 
ON public.posts 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage all comments" 
ON public.comments 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage all channels" 
ON public.channels 
FOR ALL 
USING (public.is_admin());

-- Add admin policies for analytics
CREATE POLICY "Admins can view analytics" 
ON public.analytics 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages 
FOR ALL 
USING (public.is_admin());