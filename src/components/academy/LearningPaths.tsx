
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { DifficultyFilterButtons } from './DifficultyFilter';
import { LearningPathCard } from './LearningPathCard';
import { LearningPathsSkeleton } from './LearningPathsSkeleton';
import { LearningPathsEmptyState } from './LearningPathsEmptyState';
import { LearningPath, DifficultyFilter } from './types/learningPath';

export const LearningPaths: React.FC = () => {
  const { user } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');

  const { data: learningPaths, isLoading } = useQuery({
    queryKey: ['learning-paths', selectedDifficulty],
    queryFn: async () => {
      let query = supabase
        .from('learning_paths')
        .select(`
          *,
          learning_path_courses(
            order_index,
            courses:course_id(
              id,
              title,
              thumbnail_url,
              duration_hours,
              instructor_name
            )
          )
        `)
        .eq('is_public', true);

      if (selectedDifficulty !== 'all') {
        query = query.eq('difficulty', selectedDifficulty);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data as LearningPath[];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LearningPathsSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Learning Paths</h2>
          <p className="text-muted-foreground">Structured learning journeys to master new skills</p>
        </div>
        
        <DifficultyFilterButtons 
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningPaths?.map((path) => (
          <LearningPathCard key={path.id} path={path} />
        ))}
      </div>

      {learningPaths?.length === 0 && (
        <LearningPathsEmptyState onViewAll={() => setSelectedDifficulty('all')} />
      )}
    </div>
  );
};
