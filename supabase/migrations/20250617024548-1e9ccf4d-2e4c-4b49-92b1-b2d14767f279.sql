
-- Create enum types for the academy
CREATE TYPE public.course_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE public.lesson_type AS ENUM ('video', 'article', 'interactive', 'quiz');
CREATE TYPE public.progress_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create courses table for free educational content
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  external_url TEXT NOT NULL, -- Link to YouTube, Coursera, etc.
  platform VARCHAR(100), -- 'youtube', 'coursera', 'edx', etc.
  instructor_name VARCHAR(255),
  instructor_id UUID REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.categories(id),
  difficulty public.course_difficulty DEFAULT 'beginner',
  duration_hours INTEGER,
  language VARCHAR(10) DEFAULT 'en',
  tags TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  enrollment_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lessons table for course content
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  lesson_type public.lesson_type DEFAULT 'video',
  external_url TEXT NOT NULL,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT true,
  transcript TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user progress tracking
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  status public.progress_status DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create course enrollments
CREATE TABLE public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  certificate_issued BOOLEAN DEFAULT false,
  UNIQUE(user_id, course_id)
);

-- Create bookmarks/favorites
CREATE TABLE public.course_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create learning paths/playlists
CREATE TABLE public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES public.profiles(id),
  is_public BOOLEAN DEFAULT true,
  thumbnail_url TEXT,
  difficulty public.course_difficulty DEFAULT 'beginner',
  estimated_hours INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create learning path courses (many-to-many)
CREATE TABLE public.learning_path_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  UNIQUE(learning_path_id, course_id)
);

-- Create user notes
CREATE TABLE public.lesson_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  timestamp_seconds INTEGER, -- For video notes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create course discussions/forums
CREATE TABLE public.course_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.course_discussions(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_discussions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses (public read, authenticated create/update)
CREATE POLICY "Anyone can view active courses" ON public.courses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can create courses" ON public.courses
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Course creators can update their courses" ON public.courses
  FOR UPDATE TO authenticated 
  USING (instructor_id = auth.uid());

-- RLS Policies for lessons (public read)
CREATE POLICY "Anyone can view lessons" ON public.lessons
  FOR SELECT USING (true);

CREATE POLICY "Course instructors can manage lessons" ON public.lessons
  FOR ALL TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM public.courses 
    WHERE courses.id = lessons.course_id 
    AND courses.instructor_id = auth.uid()
  ));

-- RLS Policies for user progress (users can only see their own)
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR ALL TO authenticated USING (user_id = auth.uid());

-- RLS Policies for enrollments
CREATE POLICY "Users can view their own enrollments" ON public.course_enrollments
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can create their own enrollments" ON public.course_enrollments
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- RLS Policies for bookmarks
CREATE POLICY "Users can manage their own bookmarks" ON public.course_bookmarks
  FOR ALL TO authenticated USING (user_id = auth.uid());

-- RLS Policies for learning paths
CREATE POLICY "Anyone can view public learning paths" ON public.learning_paths
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can create learning paths" ON public.learning_paths
  FOR INSERT TO authenticated WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Users can update their own learning paths" ON public.learning_paths
  FOR UPDATE TO authenticated USING (creator_id = auth.uid());

-- RLS Policies for learning path courses
CREATE POLICY "Anyone can view learning path courses" ON public.learning_path_courses
  FOR SELECT USING (true);

CREATE POLICY "Learning path creators can manage courses" ON public.learning_path_courses
  FOR ALL TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM public.learning_paths 
    WHERE learning_paths.id = learning_path_courses.learning_path_id 
    AND learning_paths.creator_id = auth.uid()
  ));

-- RLS Policies for notes
CREATE POLICY "Users can manage their own notes" ON public.lesson_notes
  FOR ALL TO authenticated USING (user_id = auth.uid());

-- RLS Policies for discussions
CREATE POLICY "Anyone can view discussions" ON public.course_discussions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create discussions" ON public.course_discussions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own discussions" ON public.course_discussions
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Insert sample free course categories
INSERT INTO public.categories (name, name_ar, name_fr, icon, sort_order) VALUES
('Programming', 'البرمجة', 'Programmation', 'Code', 1),
('Web Development', 'تطوير الويب', 'Développement Web', 'Globe', 2),
('Data Science', 'علم البيانات', 'Science des Données', 'BarChart3', 3),
('Mathematics', 'الرياضيات', 'Mathématiques', 'Calculator', 4),
('Science', 'العلوم', 'Sciences', 'Beaker', 5),
('Languages', 'اللغات', 'Langues', 'Languages', 6),
('Business', 'الأعمال', 'Affaires', 'Briefcase', 7),
('Design', 'التصميم', 'Design', 'Palette', 8),
('Music', 'الموسيقى', 'Musique', 'Music', 9),
('Photography', 'التصوير', 'Photographie', 'Camera', 10);

-- Insert sample free courses from popular platforms
INSERT INTO public.courses (title, slug, description, external_url, platform, instructor_name, category_id, difficulty, duration_hours, language, tags) VALUES
('CS50: Introduction to Computer Science', 'cs50-intro-computer-science', 'Harvard University''s introduction to computer science and programming', 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x', 'edx', 'David J. Malan', (SELECT id FROM categories WHERE name = 'Programming'), 'beginner', 60, 'en', ARRAY['harvard', 'computer-science', 'programming']),
('freeCodeCamp Full Stack Development', 'freecodecamp-full-stack', 'Complete full-stack web development curriculum', 'https://www.freecodecamp.org/learn', 'freecodecamp', 'freeCodeCamp Team', (SELECT id FROM categories WHERE name = 'Web Development'), 'beginner', 300, 'en', ARRAY['html', 'css', 'javascript', 'react', 'nodejs']),
('Khan Academy Calculus', 'khan-academy-calculus', 'Complete calculus course from Khan Academy', 'https://www.khanacademy.org/math/calculus-1', 'khan-academy', 'Sal Khan', (SELECT id FROM categories WHERE name = 'Mathematics'), 'intermediate', 40, 'en', ARRAY['calculus', 'mathematics', 'derivatives', 'integrals']),
('Machine Learning Course by Andrew Ng', 'ml-andrew-ng', 'Stanford''s famous machine learning course', 'https://www.coursera.org/learn/machine-learning', 'coursera', 'Andrew Ng', (SELECT id FROM categories WHERE name = 'Data Science'), 'intermediate', 55, 'en', ARRAY['machine-learning', 'ai', 'stanford', 'algorithms']),
('Crash Course World History', 'crash-course-world-history', 'Engaging world history lessons', 'https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9', 'youtube', 'John Green', (SELECT id FROM categories WHERE name = 'Science'), 'beginner', 20, 'en', ARRAY['history', 'education', 'crash-course']),
('3Blue1Brown Linear Algebra', '3blue1brown-linear-algebra', 'Visual introduction to linear algebra', 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', 'youtube', 'Grant Sanderson', (SELECT id FROM categories WHERE name = 'Mathematics'), 'intermediate', 15, 'en', ARRAY['linear-algebra', 'mathematics', 'visualization']),
('Duolingo Spanish Course', 'duolingo-spanish', 'Learn Spanish for free with Duolingo', 'https://www.duolingo.com/course/es/en/Learn-Spanish', 'duolingo', 'Duolingo Team', (SELECT id FROM categories WHERE name = 'Languages'), 'beginner', 100, 'en', ARRAY['spanish', 'language-learning']),
('MIT OpenCourseWare Physics', 'mit-physics-8-01', 'Classical Mechanics from MIT', 'https://ocw.mit.edu/courses/physics/8-01sc-classical-mechanics-fall-2016/', 'mit-ocw', 'Walter Lewin', (SELECT id FROM categories WHERE name = 'Science'), 'advanced', 45, 'en', ARRAY['physics', 'mechanics', 'mit']),
('Adobe Photoshop Basics', 'photoshop-basics-youtube', 'Free Photoshop tutorial series', 'https://www.youtube.com/playlist?list=PLYfCBK8IplO4E2sXtdKMVpKJZRBEoMvpn', 'youtube', 'Photoshop Training Channel', (SELECT id FROM categories WHERE name = 'Design'), 'beginner', 12, 'en', ARRAY['photoshop', 'design', 'photo-editing']),
('Guitar Lessons for Beginners', 'guitar-lessons-beginner', 'Learn guitar from scratch', 'https://www.youtube.com/playlist?list=PLlczpwSXEOyaHpz-hOa9lzLw0g1sA2Mxh', 'youtube', 'JustinGuitar', (SELECT id FROM categories WHERE name = 'Music'), 'beginner', 30, 'en', ARRAY['guitar', 'music', 'instruments']);

-- Create indexes for better performance
CREATE INDEX idx_courses_category ON public.courses(category_id);
CREATE INDEX idx_courses_difficulty ON public.courses(difficulty);
CREATE INDEX idx_courses_language ON public.courses(language);
CREATE INDEX idx_courses_featured ON public.courses(is_featured);
CREATE INDEX idx_lessons_course ON public.lessons(course_id);
CREATE INDEX idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_course ON public.user_progress(course_id);
CREATE INDEX idx_course_enrollments_user ON public.course_enrollments(user_id);
CREATE INDEX idx_course_discussions_course ON public.course_discussions(course_id);
