-- Create admin access policies and functions
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

-- Create admin stats view
CREATE OR REPLACE VIEW public.admin_stats AS
SELECT 
  (SELECT COUNT(*) FROM public.profiles) as total_users,
  (SELECT COUNT(*) FROM public.profiles WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_users_30d,
  (SELECT COUNT(*) FROM public.posts) as total_posts,
  (SELECT COUNT(*) FROM public.posts WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_posts_30d,
  (SELECT COUNT(*) FROM public.comments) as total_comments,
  (SELECT COUNT(*) FROM public.channels) as total_channels,
  (SELECT COUNT(*) FROM public.contact_messages WHERE read = false) as unread_messages;

-- Add policy for admin stats view
CREATE POLICY "Admins can view admin stats" 
ON public.admin_stats 
FOR SELECT 
USING (public.is_admin());