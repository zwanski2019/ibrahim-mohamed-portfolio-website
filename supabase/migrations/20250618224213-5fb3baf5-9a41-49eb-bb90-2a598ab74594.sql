
-- First, let's enhance the profiles table to support different user types and roles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_roles text[] DEFAULT ARRAY['student']::text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_completion_percentage integer DEFAULT 0;

-- Add academy-specific fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS academy_level text DEFAULT 'beginner';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learning_goals text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferred_learning_style text;

-- Add job seeker specific fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS resume_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS portfolio_items jsonb DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS job_preferences jsonb DEFAULT '{}'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'available';

-- Add freelancer specific fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hourly_rate_min numeric;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hourly_rate_max numeric;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS service_categories text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS years_experience integer DEFAULT 0;

-- Add employer specific fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_size text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hiring_budget_range text;

-- Create user_achievements table for tracking progress and certifications
CREATE TABLE IF NOT EXISTS user_achievements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_type text NOT NULL, -- 'course_completion', 'certification', 'skill_badge', 'community_milestone'
    title text NOT NULL,
    description text,
    icon_url text,
    earned_at timestamp with time zone DEFAULT now(),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now()
);

-- Create user_activity_log for tracking user engagement
CREATE TABLE IF NOT EXISTS user_activity_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    activity_type text NOT NULL, -- 'login', 'course_start', 'job_application', 'post_created', etc.
    activity_data jsonb DEFAULT '{}'::jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamp with time zone DEFAULT now()
);

-- Create community_user_stats for tracking community engagement
CREATE TABLE IF NOT EXISTS community_user_stats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    posts_count integer DEFAULT 0,
    comments_count integer DEFAULT 0,
    likes_given integer DEFAULT 0,
    likes_received integer DEFAULT 0,
    reputation_points integer DEFAULT 0,
    community_level text DEFAULT 'newcomer',
    last_active_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create user_connections for following/follower system
CREATE TABLE IF NOT EXISTS user_connections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    following_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    connection_type text DEFAULT 'follow', -- 'follow', 'block', 'mute'
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE(follower_id, following_id)
);

-- Create enhanced notifications table
CREATE TABLE IF NOT EXISTS enhanced_notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    type text NOT NULL, -- 'course_enrolled', 'job_matched', 'community_mention', 'new_follower', etc.
    title text NOT NULL,
    message text,
    action_url text,
    is_read boolean DEFAULT false,
    priority text DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    metadata jsonb DEFAULT '{}'::jsonb,
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);

-- Create storage bucket for user uploads (avatars, portfolio files, etc.)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-uploads', 'user-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for course materials
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-materials', 'course-materials', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for new tables
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public achievements" ON user_achievements
    FOR SELECT USING (true); -- Achievements are public for community recognition

-- RLS policies for community_user_stats
CREATE POLICY "Users can view their own stats" ON community_user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public stats" ON community_user_stats
    FOR SELECT USING (true); -- Stats are public for leaderboards

CREATE POLICY "Users can update their own stats" ON community_user_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for user_connections
CREATE POLICY "Users can view their connections" ON user_connections
    FOR SELECT USING (auth.uid() = follower_id OR auth.uid() = following_id);

CREATE POLICY "Users can create their own connections" ON user_connections
    FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own connections" ON user_connections
    FOR DELETE USING (auth.uid() = follower_id);

-- RLS policies for enhanced_notifications
CREATE POLICY "Users can view their own notifications" ON enhanced_notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON enhanced_notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Storage policies for user uploads
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'user-uploads' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view uploaded files"
ON storage.objects FOR SELECT USING (
    bucket_id = 'user-uploads'
);

CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE USING (
    bucket_id = 'user-uploads' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE USING (
    bucket_id = 'user-uploads' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_community_user_stats_user_id ON community_user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_connections_follower ON user_connections(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_connections_following ON user_connections(following_id);
CREATE INDEX IF NOT EXISTS idx_enhanced_notifications_user_id ON enhanced_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_enhanced_notifications_unread ON enhanced_notifications(user_id, is_read) WHERE is_read = false;

-- Create function to automatically create community stats when user profile is created
CREATE OR REPLACE FUNCTION create_community_stats_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO community_user_stats (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create community stats
DROP TRIGGER IF EXISTS trigger_create_community_stats ON profiles;
CREATE TRIGGER trigger_create_community_stats
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_community_stats_for_user();

-- Update existing posts table to support more content types
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS mention_user_ids uuid[] DEFAULT '{}';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS attachment_urls text[] DEFAULT '{}';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS post_type text DEFAULT 'text'; -- 'text', 'image', 'video', 'link', 'poll'

-- Update channels table for better categorization
ALTER TABLE channels ADD COLUMN IF NOT EXISTS category text DEFAULT 'general';
ALTER TABLE channels ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE channels ADD COLUMN IF NOT EXISTS rules text;
ALTER TABLE channels ADD COLUMN IF NOT EXISTS moderator_ids uuid[] DEFAULT '{}';

-- Create post_reactions table for multiple reaction types
CREATE TABLE IF NOT EXISTS post_reactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
    reaction_type text NOT NULL DEFAULT 'like', -- 'like', 'love', 'laugh', 'angry', 'sad', 'wow'
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE(user_id, post_id, reaction_type)
);

ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all reactions" ON post_reactions
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own reactions" ON post_reactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions" ON post_reactions
    FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime for all new tables
ALTER PUBLICATION supabase_realtime ADD TABLE user_achievements;
ALTER PUBLICATION supabase_realtime ADD TABLE community_user_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE user_connections;
ALTER PUBLICATION supabase_realtime ADD TABLE enhanced_notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE post_reactions;
