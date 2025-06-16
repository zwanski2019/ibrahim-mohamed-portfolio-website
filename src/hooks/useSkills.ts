
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skill } from '@/types/database';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Skill[];
    },
  });
};

export const useSkillsByCategory = () => {
  return useQuery({
    queryKey: ['skills-by-category'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      
      const skillsByCategory = (data as Skill[]).reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>);
      
      return skillsByCategory;
    },
  });
};
