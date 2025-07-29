
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

export const useAcademy = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const enrollInCourse = useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error("Please log in to enroll");
      
      const { error } = await supabase
        .from('course_enrollments')
        .insert([{
          user_id: user.id,
          course_id: courseId
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Enrolled Successfully!",
        description: "You can now start learning this course",
      });
      queryClient.invalidateQueries({ queryKey: ['user-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['academy-courses'] });
    }
  });

  const bookmarkCourse = useMutation({
    mutationFn: async ({ courseId, isBookmarked }: { courseId: string; isBookmarked: boolean }) => {
      if (!user) throw new Error("Please log in to bookmark");
      
      if (isBookmarked) {
        const { error } = await supabase
          .from('course_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', courseId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('course_bookmarks')
          .insert([{
            user_id: user.id,
            course_id: courseId
          }]);
        if (error) throw error;
      }
    },
    onSuccess: (_, { isBookmarked }) => {
      toast({
        title: isBookmarked ? "Bookmark Removed" : "Bookmarked!",
        description: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      });
      queryClient.invalidateQueries({ queryKey: ['user-bookmarks'] });
    }
  });

  const updateProgress = useMutation({
    mutationFn: async ({
      lessonId,
      courseId,
      status,
      progressPercentage,
      timeSpent
    }: {
      lessonId: string;
      courseId: string;
      status: 'not_started' | 'in_progress' | 'completed';
      progressPercentage: number;
      timeSpent: number;
    }) => {
      if (!user) throw new Error("Please log in to track progress");
      
      const { error } = await supabase
        .from('user_progress')
        .upsert([{
          user_id: user.id,
          lesson_id: lessonId,
          course_id: courseId,
          status,
          progress_percentage: progressPercentage,
          time_spent_minutes: timeSpent,
          completed_at: status === 'completed' ? new Date().toISOString() : null
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    }
  });

  return {
    enrollInCourse,
    bookmarkCourse,
    updateProgress
  };
};

export const useCourses = (filters?: {
  category?: string;
  search?: string;
  difficulty?: string;
}) => {
  return useQuery({
    queryKey: ['academy-courses', filters],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select(`
          *,
          categories:category_id(name, icon)
        `)
        .eq('is_active', true);

      if (filters?.category && filters.category !== "all") {
        query = query.eq('category_id', filters.category);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.difficulty && filters.difficulty !== "all") {
        query = query.eq('difficulty', filters.difficulty as "beginner" | "intermediate" | "advanced");
      }

      query = query.order('is_featured', { ascending: false })
                   .order('enrollment_count', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
};

export const useUserEnrollments = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-enrollments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          courses:course_id(
            title,
            thumbnail_url,
            duration_hours,
            instructor_name,
            external_url
          )
        `)
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });
};
