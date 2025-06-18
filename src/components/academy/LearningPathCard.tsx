
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Play } from 'lucide-react';
import { LearningPath } from './types/learningPath';

interface LearningPathCardProps {
  path: LearningPath;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const LearningPathCard: React.FC<LearningPathCardProps> = ({ path }) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
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
  );
};
