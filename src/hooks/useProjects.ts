
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/database';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .eq('featured', true)
          .order('sort_order', { ascending: true })
          .limit(6);
        
        if (error) {
          console.warn('Failed to load projects:', error);
          return [];
        }
        return data as Project[] || [];
      } catch (error) {
        console.warn('Failed to load projects:', error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once
  });
};

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data as Project;
    },
    enabled: !!slug,
  });
};
