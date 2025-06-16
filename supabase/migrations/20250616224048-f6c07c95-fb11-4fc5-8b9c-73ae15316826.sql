
-- Create enum for project status
CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');

-- Create enum for blog post status  
CREATE TYPE post_status AS ENUM ('draft', 'published', 'scheduled');

-- Create enum for skill categories
CREATE TYPE skill_category AS ENUM ('frontend', 'backend', 'mobile', 'devops', 'design', 'other');

-- Projects table for portfolio showcase
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  detailed_description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  featured_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  demo_url TEXT,
  github_url TEXT,
  live_url TEXT,
  status project_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  metrics JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table for technical content
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  status post_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  reading_time INTEGER,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table for technical expertise
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  category skill_category NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 100),
  icon_url TEXT,
  description TEXT,
  years_experience DECIMAL(3,1),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience table for work history
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  current_job BOOLEAN DEFAULT false,
  location VARCHAR(255),
  company_url TEXT,
  logo_url TEXT,
  achievements TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table for client feedback
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  company VARCHAR(255),
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media library for file management
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_size BIGINT,
  alt_text TEXT,
  description TEXT,
  folder VARCHAR(255) DEFAULT 'uploads',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics table for visitor tracking
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path VARCHAR(500) NOT NULL,
  visitor_id VARCHAR(255),
  session_id VARCHAR(255),
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country VARCHAR(100),
  device_type VARCHAR(50),
  browser VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_analytics_page_path ON analytics(page_path);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Enable Row Level Security (fixed syntax)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio is public)
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Public can view experience"
  ON experience FOR SELECT
  USING (true);

CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Public can view media"
  ON media FOR SELECT
  USING (true);

-- Analytics is public for insertion but not reading
CREATE POLICY "Anyone can insert analytics"
  ON analytics FOR INSERT
  WITH CHECK (true);

-- Contact messages can be inserted by anyone
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Admin policies (authenticated users can manage all content)
CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage experience"
  ON experience FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage media"
  ON media FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view analytics"
  ON analytics FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert some sample data for the SOS Jobs project
INSERT INTO projects (
  title, 
  slug, 
  description, 
  detailed_description,
  tech_stack,
  category,
  demo_url,
  github_url,
  status,
  featured,
  sort_order,
  metrics
) VALUES (
  'SOS Jobs - Flutter Job Portal App',
  'sos-jobs-flutter-app',
  'A comprehensive job portal mobile application built with Flutter, connecting job seekers with employers seamlessly.',
  'SOS Jobs is a full-featured mobile application developed using Flutter that revolutionizes the job search experience. The app provides a comprehensive platform where job seekers can discover opportunities, apply for positions, and track their application status, while employers can post jobs, manage applications, and find the right candidates.',
  ARRAY['Flutter', 'Dart', 'Firebase', 'REST API', 'Material Design', 'Provider', 'Shared Preferences'],
  'Mobile Development',
  'https://your-demo-url.com',
  'https://github.com/yourusername/sos-jobs',
  'published',
  true,
  1,
  '{"downloads": 5000, "rating": 4.8, "users": 12000}'
);

-- Insert sample skills
INSERT INTO skills (name, category, proficiency, years_experience, sort_order) VALUES
('Flutter', 'mobile', 90, 3.0, 1),
('Dart', 'mobile', 85, 3.0, 2),
('React', 'frontend', 88, 4.0, 3),
('TypeScript', 'frontend', 82, 3.5, 4),
('Node.js', 'backend', 75, 2.5, 5),
('Firebase', 'backend', 80, 3.0, 6),
('Supabase', 'backend', 70, 1.5, 7),
('UI/UX Design', 'design', 85, 4.0, 8);
