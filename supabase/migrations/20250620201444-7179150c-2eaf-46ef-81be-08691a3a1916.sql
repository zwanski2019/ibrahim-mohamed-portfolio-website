
-- Create enum types for forum functionality
CREATE TYPE forum_user_role AS ENUM ('admin', 'moderator', 'trusted_user', 'member');
CREATE TYPE thread_status AS ENUM ('open', 'closed', 'locked', 'archived');
CREATE TYPE moderation_action AS ENUM ('warning', 'temp_ban', 'permanent_ban', 'content_removal');

-- Create forum categories table
CREATE TABLE forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  parent_id UUID REFERENCES forum_categories(id),
  icon VARCHAR(100),
  color VARCHAR(7) DEFAULT '#3B82F6',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  thread_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum threads table
CREATE TABLE forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  category_id UUID REFERENCES forum_categories(id) NOT NULL,
  status thread_status DEFAULT 'open',
  is_pinned BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum replies table
CREATE TABLE forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES forum_replies(id),
  is_edited BOOLEAN DEFAULT false,
  edit_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create thread likes table
CREATE TABLE forum_thread_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, thread_id)
);

-- Create reply likes table
CREATE TABLE forum_reply_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, reply_id)
);

-- Create thread bookmarks table
CREATE TABLE forum_thread_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, thread_id)
);

-- Create user forum preferences table
CREATE TABLE forum_user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL UNIQUE,
  forum_role forum_user_role DEFAULT 'member',
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  signature TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create moderation logs table
CREATE TABLE forum_moderation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  moderator_id UUID REFERENCES profiles(id) NOT NULL,
  target_user_id UUID REFERENCES profiles(id),
  target_thread_id UUID REFERENCES forum_threads(id),
  target_reply_id UUID REFERENCES forum_replies(id),
  action moderation_action NOT NULL,
  reason TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX idx_forum_threads_author ON forum_threads(author_id);
CREATE INDEX idx_forum_threads_activity ON forum_threads(last_activity_at DESC);
CREATE INDEX idx_forum_threads_status ON forum_threads(status);
CREATE INDEX idx_forum_replies_thread ON forum_replies(thread_id);
CREATE INDEX idx_forum_replies_author ON forum_replies(author_id);
CREATE INDEX idx_forum_replies_parent ON forum_replies(parent_id);

-- Enable RLS for all forum tables
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_thread_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_reply_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_thread_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_moderation_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forum_categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone"
  ON forum_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can manage categories"
  ON forum_categories FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role = 'admin'
    )
  );

-- RLS Policies for forum_threads
CREATE POLICY "Threads are viewable by everyone"
  ON forum_threads FOR SELECT
  USING (true);

CREATE POLICY "Users can create threads"
  ON forum_threads FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors and moderators can update threads"
  ON forum_threads FOR UPDATE
  USING (
    auth.uid() = author_id OR
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Authors and moderators can delete threads"
  ON forum_threads FOR DELETE
  USING (
    auth.uid() = author_id OR
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role IN ('admin', 'moderator')
    )
  );

-- RLS Policies for forum_replies
CREATE POLICY "Replies are viewable by everyone"
  ON forum_replies FOR SELECT
  USING (true);

CREATE POLICY "Users can create replies"
  ON forum_replies FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors and moderators can update replies"
  ON forum_replies FOR UPDATE
  USING (
    auth.uid() = author_id OR
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Authors and moderators can delete replies"
  ON forum_replies FOR DELETE
  USING (
    auth.uid() = author_id OR
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role IN ('admin', 'moderator')
    )
  );

-- RLS Policies for likes and bookmarks
CREATE POLICY "Users can view all likes"
  ON forum_thread_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own thread likes"
  ON forum_thread_likes FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all reply likes"
  ON forum_reply_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own reply likes"
  ON forum_reply_likes FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own bookmarks"
  ON forum_thread_bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for user preferences
CREATE POLICY "Users can view and manage their own preferences"
  ON forum_user_preferences FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all preferences"
  ON forum_user_preferences FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role = 'admin'
    )
  );

-- RLS Policies for moderation logs
CREATE POLICY "Moderators can view moderation logs"
  ON forum_moderation_logs FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Moderators can create moderation logs"
  ON forum_moderation_logs FOR INSERT
  WITH CHECK (
    auth.uid() = moderator_id AND
    auth.uid() IN (
      SELECT user_id FROM forum_user_preferences 
      WHERE forum_role IN ('admin', 'moderator')
    )
  );

-- Functions to update counts
CREATE OR REPLACE FUNCTION update_thread_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update category thread count
    UPDATE forum_categories 
    SET thread_count = thread_count + 1,
        updated_at = NOW()
    WHERE id = NEW.category_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Update category thread count
    UPDATE forum_categories 
    SET thread_count = thread_count - 1,
        updated_at = NOW()
    WHERE id = OLD.category_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_reply_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update thread reply count and last activity
    UPDATE forum_threads 
    SET reply_count = reply_count + 1,
        last_activity_at = NOW(),
        updated_at = NOW()
    WHERE id = NEW.thread_id;
    
    -- Update category post count
    UPDATE forum_categories 
    SET post_count = post_count + 1,
        updated_at = NOW()
    WHERE id = (SELECT category_id FROM forum_threads WHERE id = NEW.thread_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Update thread reply count
    UPDATE forum_threads 
    SET reply_count = reply_count - 1,
        updated_at = NOW()
    WHERE id = OLD.thread_id;
    
    -- Update category post count
    UPDATE forum_categories 
    SET post_count = post_count - 1,
        updated_at = NOW()
    WHERE id = (SELECT category_id FROM forum_threads WHERE id = OLD.thread_id);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_like_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'forum_thread_likes' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE forum_threads SET like_count = like_count + 1 WHERE id = NEW.thread_id;
      RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE forum_threads SET like_count = like_count - 1 WHERE id = OLD.thread_id;
      RETURN OLD;
    END IF;
  ELSIF TG_TABLE_NAME = 'forum_reply_likes' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE forum_replies SET like_count = like_count + 1 WHERE id = NEW.reply_id;
      RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE forum_replies SET like_count = like_count - 1 WHERE id = OLD.reply_id;
      RETURN OLD;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER forum_thread_count_trigger
  AFTER INSERT OR DELETE ON forum_threads
  FOR EACH ROW EXECUTE FUNCTION update_thread_counts();

CREATE TRIGGER forum_reply_count_trigger
  AFTER INSERT OR DELETE ON forum_replies
  FOR EACH ROW EXECUTE FUNCTION update_reply_counts();

CREATE TRIGGER forum_thread_like_count_trigger
  AFTER INSERT OR DELETE ON forum_thread_likes
  FOR EACH ROW EXECUTE FUNCTION update_like_counts();

CREATE TRIGGER forum_reply_like_count_trigger
  AFTER INSERT OR DELETE ON forum_reply_likes
  FOR EACH ROW EXECUTE FUNCTION update_like_counts();

-- Function to create user preferences on profile creation
CREATE OR REPLACE FUNCTION create_forum_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO forum_user_preferences (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_forum_preferences_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION create_forum_user_preferences();

-- Insert initial forum categories
INSERT INTO forum_categories (name, description, slug, icon, color, sort_order) VALUES
('General Discussion', 'General tech discussions and community chat', 'general', '💬', '#3B82F6', 1),
('Web Development', 'Frontend, backend, and full-stack development discussions', 'web-development', '🌐', '#10B981', 2),
('Cybersecurity', 'Security topics, best practices, and threat discussions', 'cybersecurity', '🔒', '#EF4444', 3),
('Device Repair', 'Hardware troubleshooting and repair guides', 'device-repair', '🔧', '#F59E0B', 4),
('Programming Languages', 'Language-specific discussions and help', 'programming-languages', '💻', '#8B5CF6', 5),
('Career & Jobs', 'Career advice, job opportunities, and professional development', 'career-jobs', '💼', '#06B6D4', 6),
('Tutorials & Guides', 'Step-by-step tutorials and educational content', 'tutorials-guides', '📚', '#84CC16', 7),
('Off-Topic', 'Non-tech discussions and community building', 'off-topic', '🎭', '#EC4899', 8);
