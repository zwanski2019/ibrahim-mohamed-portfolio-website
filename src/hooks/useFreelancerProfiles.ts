
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface FreelancerProfile {
  id: string;
  user_id: string;
  title: string;
  bio: string | null;
  hourly_rate: number | null;
  skills: string[];
  portfolio_url: string | null;
  availability: string;
  experience_years: number;
  completed_projects: number;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    location: string | null;
    rating: number | null;
    verified: boolean;
  };
}

export const useFreelancerProfiles = (filters?: {
  skills?: string[];
  minRate?: number;
  maxRate?: number;
  location?: string;
}) => {
  return useQuery({
    queryKey: ['freelancer-profiles', filters],
    queryFn: async () => {
      let query = supabase
        .from('freelancer_profiles')
        .select(`
          *,
          user:profiles!freelancer_profiles_user_id_fkey(
            id,
            full_name,
            avatar_url,
            location,
            rating,
            verified
          )
        `)
        .order('created_at', { ascending: false });

      if (filters?.minRate) {
        query = query.gte('hourly_rate', filters.minRate);
      }

      if (filters?.maxRate) {
        query = query.lte('hourly_rate', filters.maxRate);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching freelancer profiles:', error);
        throw error;
      }

      return (data || []) as FreelancerProfile[];
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateFreelancerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: {
      user_id: string;
      title: string;
      bio?: string;
      hourly_rate?: number;
      skills?: string[];
      portfolio_url?: string;
      availability?: string;
      experience_years?: number;
    }) => {
      const { data, error } = await supabase
        .from('freelancer_profiles')
        .insert([profileData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating freelancer profile:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freelancer-profiles'] });
    },
  });
};

export const useUpdateFreelancerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...profileData }: {
      id: string;
      title?: string;
      bio?: string;
      hourly_rate?: number;
      skills?: string[];
      portfolio_url?: string;
      availability?: string;
      experience_years?: number;
    }) => {
      const { data, error } = await supabase
        .from('freelancer_profiles')
        .update(profileData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating freelancer profile:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freelancer-profiles'] });
    },
  });
};
