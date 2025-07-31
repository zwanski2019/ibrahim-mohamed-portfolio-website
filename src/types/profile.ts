export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  rating: number | null;
  verified: boolean;
  subscription_status?: 'free' | 'basic' | 'premium';
  user_type?: 'admin' | 'user';
  created_at?: string;
  updated_at?: string;
}