
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { JobPost } from '@/types/marketplace';

export const useJobPosts = (filters?: {
  category?: string;
  location?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
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
            rating
          )
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.jobType) {
        query = query.eq('job_type', filters.jobType);
      }

      if (filters?.salaryMin) {
        query = query.gte('salary_min', filters.salaryMin);
      }

      if (filters?.salaryMax) {
        query = query.lte('salary_max', filters.salaryMax);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as JobPost[];
    },
  });
};

export const useCreateJobPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobData: Omit<JobPost, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('job_posts')
        .insert(jobData)
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

export const useUpdateJobPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<JobPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('job_posts')
        .update(updates)
        .eq('id', id)
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

export const useDeleteJobPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('job_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-posts'] });
    },
  });
};
