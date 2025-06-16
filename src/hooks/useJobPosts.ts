
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobPost } from '@/types/marketplace';

export const useJobPosts = (filters?: {
  category?: string;
  location?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['job-posts', filters],
    queryFn: async () => {
      let query = supabase
        .from('job_posts')
        .select(`
          *,
          employer:profiles!job_posts_employer_id_fkey(
            id,
            full_name,
            avatar_url,
            rating,
            verified
          ),
          applications(count)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as (JobPost & { 
        employer: any;
        applications: { count: number }[];
      })[];
    },
  });
};

export const useCreateJobPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData: {
      title: string;
      description: string;
      category: string;
      location: string;
      job_type: 'full-time' | 'part-time' | 'contract' | 'freelance';
      salary_type: 'hourly' | 'fixed' | 'monthly';
      salary_min: number;
      employer_id: string;
      benefits?: string[];
      requirements?: string[];
      salary_max?: number;
      expires_at?: string;
      urgency?: 'low' | 'medium' | 'high';
    }) => {
      const { data, error } = await supabase
        .from('job_posts')
        .insert([jobData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-posts'] });
    },
  });
};

export const useJobApplications = (jobId: string) => {
  return useQuery({
    queryKey: ['job-applications', jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          worker:profiles!applications_worker_id_fkey(
            id,
            full_name,
            avatar_url,
            rating,
            verified
          )
        `)
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!jobId,
  });
};
