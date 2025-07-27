
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobPost } from '@/types/marketplace';
import { Profile } from '@/types/profile';

export const useJobPosts = (filters?: {
  category?: string;
  location?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['job-posts', filters],
    queryFn: async () => {
      try {
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
        
        if (error) {
          console.error('Error fetching jobs:', error);
          throw new Error(`Failed to fetch jobs: ${error.message}`);
        }

        // Transform the data to handle the count properly
        return (data || []).map(job => ({
          ...job,
          applications: job.applications || [],
          employer: job.employer || {
            id: job.employer_id,
            full_name: 'Unknown Employer',
            avatar_url: null,
            rating: null,
            verified: false
          }
        })) as (JobPost & { 
          employer: Profile;
          applications: { count: number }[];
        })[];
      } catch (error) {
        console.error('Job posts query error:', error);
        throw error;
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
      employer_id?: string;
      contact_name?: string;
      contact_email?: string;
      benefits?: string[];
      requirements?: string[];
      salary_max?: number;
      expires_at?: string;
      urgency?: 'low' | 'medium' | 'high';
      latitude?: number;
      longitude?: number;
    }) => {
      // Validate required fields
      if (!jobData.title || !jobData.description) {
        throw new Error('Title and description are required');
      }

      if (!jobData.employer_id) {
        if (!jobData.contact_name || !jobData.contact_email) {
          throw new Error('Contact name and email are required for guest posts');
        }
      }

      // Set the job status to pending for moderation
      const jobPostData = {
        ...jobData,
        status: 'pending' as const,
      };

      const { data, error } = await supabase
        .from('job_posts')
        .insert([jobPostData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating job post:', error);
        throw new Error(`Failed to create job post: ${error.message}`);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-posts'] });
    },
    onError: (error) => {
      console.error('Job post creation failed:', error);
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
      
      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }
      return data || [];
    },
    enabled: !!jobId,
  });
};

export const useApplyToJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationData: {
      job_id: string;
      worker_id: string;
      cover_letter?: string;
      proposed_rate?: number;
    }) => {
      const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();
      
      if (error) {
        console.error('Error applying to job:', error);
        throw error;
      }
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job-applications', variables.job_id] });
      queryClient.invalidateQueries({ queryKey: ['job-posts'] });
    },
  });
};
