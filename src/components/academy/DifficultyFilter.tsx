
import React from 'react';
import { Button } from '@/components/ui/button';
import { DifficultyFilter } from './types/learningPath';

interface DifficultyFilterProps {
  selectedDifficulty: DifficultyFilter;
  onDifficultyChange: (difficulty: DifficultyFilter) => void;
}

export const DifficultyFilterButtons: React.FC<DifficultyFilterProps> = ({
  selectedDifficulty,
  onDifficultyChange
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
        onClick={() => onDifficultyChange('all')}
        size="sm"
      >
        All Levels
      </Button>
      <Button
        variant={selectedDifficulty === 'beginner' ? 'default' : 'outline'}
        onClick={() => onDifficultyChange('beginner')}
        size="sm"
      >
        Beginner
      </Button>
      <Button
        variant={selectedDifficulty === 'intermediate' ? 'default' : 'outline'}
        onClick={() => onDifficultyChange('intermediate')}
        size="sm"
      >
        Intermediate
      </Button>
      <Button
        variant={selectedDifficulty === 'advanced' ? 'default' : 'outline'}
        onClick={() => onDifficultyChange('advanced')}
        size="sm"
      >
        Advanced
      </Button>
    </div>
  );
};
