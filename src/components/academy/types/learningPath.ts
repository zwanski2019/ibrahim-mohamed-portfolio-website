
export interface LearningPath {
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

export type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
