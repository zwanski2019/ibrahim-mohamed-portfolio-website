
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Clock, Users, Star, Play, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours: number;
  thumbnail_url: string | null;
  is_public: boolean;
  created_at: string;
  creator_id: string;
  learning_path_courses: Array<{
    order_index: number;
    courses: {
      id: string;
      title: string;
      thumbnail_url: string | null;
      duration_hours: number;
      instructor_name: string;
    };
  }>;
}

export const LearningPaths: React.FC = () => {
  const { user } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
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
        
        <div className="flex gap-2">
          <Button
            variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('all')}
            size="sm"
          >
            All Levels
          </Button>
          <Button
            variant={selectedDifficulty === 'beginner' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('beginner')}
            size="sm"
          >
            Beginner
          </Button>
          <Button
            variant={selectedDifficulty === 'intermediate' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('intermediate')}
            size="sm"
          >
            Intermediate
          </Button>
          <Button
            variant={selectedDifficulty === 'advanced' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('advanced')}
            size="sm"
          >
            Advanced
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningPaths?.map((path) => (
          <Card key={path.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 rounded-t-lg flex items-center justify-center">
                {path.thumbnail_url ? (
                  <img 
                    src={path.thumbnail_url} 
                    alt={path.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="text-white text-center">
                    <BookOpen className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm opacity-90">Learning Path</p>
                  </div>
                )}
              </div>
              <Badge 
                className={`absolute top-2 right-2 ${getDifficultyColor(path.difficulty)}`}
              >
                {path.difficulty}
              </Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{path.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{path.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{path.learning_path_courses?.length || 0} courses</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{path.estimated_hours}h</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium">Course Preview:</div>
                {path.learning_path_courses?.slice(0, 3).map((courseLink, index) => (
                  <div key={courseLink.courses.id} className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <span className="truncate">{courseLink.courses.title}</span>
                  </div>
                ))}
                {path.learning_path_courses?.length > 3 && (
                  <div className="text-sm text-muted-foreground pl-8">
                    +{path.learning_path_courses.length - 3} more courses
                  </div>
                )}
              </div>

              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Start Learning Path
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {learningPaths?.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Learning Paths Found</h3>
            <p className="text-muted-foreground mb-4">
              No learning paths match your current filters.
            </p>
            <Button onClick={() => setSelectedDifficulty('all')}>
              View All Paths
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
