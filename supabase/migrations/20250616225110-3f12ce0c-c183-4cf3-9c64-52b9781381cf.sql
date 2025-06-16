
-- Create enum types for the job marketplace
CREATE TYPE user_type AS ENUM ('employer', 'worker');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'freelance');
CREATE TYPE salary_type AS ENUM ('hourly', 'daily', 'weekly', 'monthly', 'fixed');
CREATE TYPE urgency_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE job_status AS ENUM ('draft', 'published', 'closed', 'filled');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  user_type user_type NOT NULL,
  location VARCHAR(255),
  avatar_url TEXT,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100),
  name_fr VARCHAR(100),
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true
);

-- Job posts table
CREATE TABLE job_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID REFERENCES profiles(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  salary_type salary_type NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  job_type job_type NOT NULL,
  urgency urgency_level DEFAULT 'medium',
  status job_status DEFAULT 'draft',
  expires_at TIMESTAMPTZ,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES job_posts(id) ON DELETE CASCADE NOT NULL,
  worker_id UUID REFERENCES profiles(id) NOT NULL,
  cover_letter TEXT,
  proposed_rate DECIMAL(10,2),
  status application_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, worker_id)
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID REFERENCES profiles(id) NOT NULL,
  reviewee_id UUID REFERENCES profiles(id) NOT NULL,
  job_id UUID REFERENCES job_posts(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table for chat
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  receiver_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES job_posts(id) NOT NULL,
  employer_id UUID REFERENCES profiles(id) NOT NULL,
  worker_id UUID REFERENCES profiles(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TND',
  stripe_payment_intent_id VARCHAR(255),
  status payment_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_job_posts_employer ON job_posts(employer_id);
CREATE INDEX idx_job_posts_category ON job_posts(category);
CREATE INDEX idx_job_posts_location ON job_posts(location);
CREATE INDEX idx_job_posts_status ON job_posts(status);
CREATE INDEX idx_job_posts_created_at ON job_posts(created_at);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_worker ON applications(worker_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for job_posts
CREATE POLICY "Job posts are viewable by everyone"
  ON job_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Employers can manage their job posts"
  ON job_posts FOR ALL
  USING (auth.uid() = employer_id);

-- RLS Policies for applications
CREATE POLICY "Users can view applications for their jobs or their own applications"
  ON applications FOR SELECT
  USING (
    auth.uid() = worker_id OR 
    auth.uid() IN (SELECT employer_id FROM job_posts WHERE id = applications.job_id)
  );

CREATE POLICY "Workers can create applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = worker_id);

CREATE POLICY "Users can update their own applications or employers can update applications for their jobs"
  ON applications FOR UPDATE
  USING (
    auth.uid() = worker_id OR 
    auth.uid() IN (SELECT employer_id FROM job_posts WHERE id = applications.job_id)
  );

-- RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- RLS Policies for messages
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (auth.uid() = employer_id OR auth.uid() = worker_id);

-- RLS Policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (active = true);

-- Insert sample categories
INSERT INTO categories (name, name_ar, name_fr, icon, sort_order) VALUES
('Construction', 'البناء', 'Construction', '🏗️', 1),
('Cleaning', 'التنظيف', 'Nettoyage', '🧹', 2),
('Delivery', 'التوصيل', 'Livraison', '🚚', 3),
('Handyman', 'أعمال يدوية', 'Bricolage', '🔧', 4),
('Gardening', 'البستنة', 'Jardinage', '🌱', 5),
('Tutoring', 'التدريس', 'Tutorat', '📚', 6),
('IT Support', 'دعم تقني', 'Support IT', '💻', 7),
('Translation', 'الترجمة', 'Traduction', '🌐', 8);
