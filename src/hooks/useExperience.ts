
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types/database';

export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Experience[];
    },
  });
};
