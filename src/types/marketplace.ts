
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  user_type: 'employer' | 'worker';
  location: string | null;
  avatar_url: string | null;
  rating: number | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobPost {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_type: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'fixed';
  requirements: string[];
  benefits: string[];
  job_type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  urgency: 'low' | 'medium' | 'high';
  status: 'draft' | 'published' | 'closed' | 'filled';
  expires_at: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  worker_id: string;
  cover_letter: string | null;
  proposed_rate: number | null;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  job_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  job_id: string;
  employer_id: string;
  worker_id: string;
  amount: number;
  currency: string;
  stripe_payment_intent_id: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_ar: string;
  name_fr: string;
  icon: string;
  sort_order: number;
  active: boolean;
}
