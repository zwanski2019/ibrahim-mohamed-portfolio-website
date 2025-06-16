
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  detailed_description: string | null;
  tech_stack: string[];
  category: string | null;
  featured_image_url: string | null;
  gallery_images: string[];
  demo_url: string | null;
  github_url: string | null;
  live_url: string | null;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  sort_order: number;
  metrics: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  published_at: string | null;
  reading_time: number | null;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'design' | 'other';
  proficiency: number;
  icon_url: string | null;
  description: string | null;
  years_experience: number | null;
  sort_order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  current_job: boolean;
  location: string | null;
  company_url: string | null;
  logo_url: string | null;
  achievements: string[];
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  avatar_url: string | null;
  content: string;
  rating: number;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  created_at: string;
}
