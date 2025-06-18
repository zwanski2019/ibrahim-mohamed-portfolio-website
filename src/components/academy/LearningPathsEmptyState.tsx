
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { DifficultyFilter } from './types/learningPath';

interface LearningPathsEmptyStateProps {
  onViewAll: () => void;
}

export const LearningPathsEmptyState: React.FC<LearningPathsEmptyStateProps> = ({ onViewAll }) => {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Learning Paths Found</h3>
        <p className="text-muted-foreground mb-4">
          No learning paths match your current filters.
        </p>
        <Button onClick={onViewAll}>
          View All Paths
        </Button>
      </CardContent>
    </Card>
  );
};
