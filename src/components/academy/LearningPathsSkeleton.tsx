
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const LearningPathsSkeleton: React.FC = () => {
  return (
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
  );
};
