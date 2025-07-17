import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobPost } from '@/types/marketplace';
import { Profile } from '@/types/profile';

export const usePendingJobs = () => {
  return useQuery({
    queryKey: ['admin-pending-jobs'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('job_posts')
          .select(`
            *,
            employer:profiles!job_posts_employer_id_fkey(
              id,
              full_name,
              avatar_url,
              email,
              verified,
              rating,
              phone
            )
          `)
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching pending jobs:', error);
          throw new Error(`Failed to fetch pending jobs: ${error.message}`);
        }

        return (data || []).map(job => ({
          ...job,
          employer: job.employer || {
            id: job.employer_id,
            full_name: 'Unknown Employer',
            avatar_url: null,
            email: null,
            verified: false,
            rating: null,
            phone: null
          }
        })) as (JobPost & { employer: Profile })[];
      } catch (error) {
        console.error('Pending jobs query error:', error);
        throw error;
      }
    },
    retry: 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useApproveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const { data, error } = await supabase
        .from('job_posts')
        .update({ status: 'published' })
        .eq('id', jobId)
        .select()
        .single();
      
      if (error) {
        console.error('Error approving job:', error);
        throw new Error(`Failed to approve job: ${error.message}`);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job-posts'] });
    },
  });
};

export const useRejectJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const { data, error } = await supabase
        .from('job_posts')
        .update({ status: 'rejected' })
        .eq('id', jobId)
        .select()
        .single();
      
      if (error) {
        console.error('Error rejecting job:', error);
        throw new Error(`Failed to reject job: ${error.message}`);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-jobs'] });
    },
  });
};

export const useAllJobs = () => {
  return useQuery({
    queryKey: ['admin-all-jobs'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('job_posts')
          .select(`
            *,
            employer:profiles!job_posts_employer_id_fkey(
              id,
              full_name,
              avatar_url,
              email,
              verified,
              rating,
              phone
            ),
            applications(count)
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching all jobs:', error);
          throw new Error(`Failed to fetch all jobs: ${error.message}`);
        }

        return (data || []).map(job => ({
          ...job,
          applications: job.applications || [],
          employer: job.employer || {
            id: job.employer_id,
            full_name: 'Unknown Employer',
            avatar_url: null,
            email: null,
            verified: false,
            rating: null,
            phone: null
          }
        })) as (JobPost & { 
          employer: Profile;
          applications: { count: number }[];
        })[];
      } catch (error) {
        console.error('All jobs query error:', error);
        throw error;
      }
    },
    retry: 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};