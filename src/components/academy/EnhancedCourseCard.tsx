
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useAcademy } from '@/hooks/useAcademy';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  Bookmark,
  BookmarkCheck,
  Award,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  external_url: string;
  platform: string;
  instructor_name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  language: string;
  tags: string[];
  rating: number;
  total_ratings: number;
  enrollment_count: number;
  is_featured: boolean;
  categories: {
    name: string;
    icon: string;
  } | null;
}

interface EnhancedCourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  isBookmarked?: boolean;
  progress?: number;
  viewMode?: 'grid' | 'list';
}

export const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({
  course,
  isEnrolled = false,
  isBookmarked = false,
  progress = 0,
  viewMode = 'grid'
}) => {
  const { user } = useAuth();
  const { enrollInCourse, bookmarkCourse } = useAcademy();
  const [loading, setLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please sign in to enroll in courses');
      return;
    }
    
    setLoading(true);
    try {
      await enrollInCourse.mutateAsync(course.id);
    } catch (error) {
      console.error('Enrollment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please sign in to bookmark courses');
      return;
    }

    setBookmarkLoading(true);
    try {
      await bookmarkCourse.mutateAsync({
        courseId: course.id,
        isBookmarked
      });
    } catch (error) {
      console.error('Bookmark error:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openCourse = () => {
    window.open(course.external_url, '_blank');
  };

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-32 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
              {course.thumbnail_url ? (
                <img 
                  src={course.thumbnail_url} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              {course.is_featured && (
                <Badge className="absolute top-1 left-1 text-xs">Featured</Badge>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBookmark}
                    disabled={bookmarkLoading}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span>{course.instructor_name}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span>({course.total_ratings})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration_hours}h</span>
                </div>
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
              </div>

              {isEnrolled && progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {course.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {isEnrolled ? (
                    <Button onClick={openCourse} size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleEnroll} 
                      disabled={loading}
                      size="sm"
                    >
                      {loading ? 'Enrolling...' : 'Enroll'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative">
        <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
          {course.thumbnail_url ? (
            <img 
              src={course.thumbnail_url} 
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="absolute top-2 left-2 flex gap-2">
          {course.is_featured && (
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleBookmark}
          disabled={bookmarkLoading}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-blue-600" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>

      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>

          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {course.instructor_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{course.instructor_name}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span>({course.total_ratings})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.enrollment_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration_hours}h</span>
            </div>
          </div>

          {isEnrolled && progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {progress === 100 && (
                <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                  <Award className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {isEnrolled ? (
            <Button onClick={openCourse} className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          ) : (
            <Button 
              onClick={handleEnroll} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Enrolling...' : 'Enroll Now'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
