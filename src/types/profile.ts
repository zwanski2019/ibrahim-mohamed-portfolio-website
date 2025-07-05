export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  rating: number | null;
  verified: boolean;
  user_type?: 'admin' | 'user';
  created_at?: string;
  updated_at?: string;
}