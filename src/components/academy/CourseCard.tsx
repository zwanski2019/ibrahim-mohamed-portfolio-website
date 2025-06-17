import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck,
  Play
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  external_url: string;
  platform: string;
  instructor_name: string;
  instructor_id: string | null;
  category_id: string | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  language: string;
  tags: string[];
  rating: number;
  total_ratings: number;
  enrollment_count: number;
  is_featured: boolean;
  is_active: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
  categories: {
    name: string;
    icon: string;
  } | null;
  course_enrollments: any[];
}

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  viewMode: "grid" | "list";
}

const CourseCard = ({ course, isEnrolled, viewMode }: CourseCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please log in to enroll");
      
      const { error } = await supabase
        .from('course_enrollments')
        .insert([{
          user_id: user.id,
          course_id: course.id
        }]);
      
      if (error) throw error;

      // Update enrollment count
      await supabase
        .from('courses')
        .update({ enrollment_count: course.enrollment_count + 1 })
        .eq('id', course.id);
    },
    onSuccess: () => {
      toast({
        title: "Enrolled Successfully!",
        description: `You've enrolled in ${course.title}`,
      });
      queryClient.invalidateQueries({ queryKey: ['user-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['academy-courses'] });
    },
    onError: (error: any) => {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please log in to bookmark");
      
      if (isBookmarked) {
        const { error } = await supabase
          .from('course_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', course.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('course_bookmarks')
          .insert([{
            user_id: user.id,
            course_id: course.id
          }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
      toast({
        title: isBookmarked ? "Bookmark Removed" : "Bookmarked!",
        description: `${course.title} ${isBookmarked ? "removed from" : "added to"} your bookmarks`,
      });
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

  const getPlatformColor = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'youtube': return 'bg-red-100 text-red-800';
      case 'coursera': return 'bg-blue-100 text-blue-800';
      case 'edx': return 'bg-purple-100 text-purple-800';
      case 'khan-academy': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === "list") {
    return (
      <Card className="flex flex-row p-4 hover:shadow-lg transition-shadow">
        <div className="w-32 h-20 bg-muted rounded-lg flex-shrink-0 mr-4 flex items-center justify-center">
          {course.thumbnail_url ? (
            <img 
              src={course.thumbnail_url} 
              alt={course.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {course.enrollment_count}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration_hours}h
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {course.rating || 'N/A'}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
                <Badge className={getPlatformColor(course.platform)}>
                  {course.platform}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => bookmarkMutation.mutate()}
                disabled={!user}
              >
                {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              
              {isEnrolled ? (
                <Button size="sm" asChild>
                  <a href={course.external_url} target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </a>
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => enrollMutation.mutate()}
                  disabled={!user || enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? "Enrolling..." : "Enroll Free"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardHeader className="p-0 relative">
        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
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
        
        {course.is_featured && (
          <Badge className="absolute top-2 left-2 bg-primary">
            Featured
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur"
          onClick={() => bookmarkMutation.mutate()}
          disabled={!user}
        >
          {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
          <Badge className={getPlatformColor(course.platform)}>
            {course.platform}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {course.description}
        </p>
        
        <div className="text-sm text-muted-foreground mb-3">
          By {course.instructor_name}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course.enrollment_count}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.duration_hours}h
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {course.rating || 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        {isEnrolled ? (
          <Button className="w-full" asChild>
            <a href={course.external_url} target="_blank" rel="noopener noreferrer">
              <Play className="h-4 w-4 mr-2" />
              Continue Learning
            </a>
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => enrollMutation.mutate()}
            disabled={!user || enrollMutation.isPending}
          >
            {enrollMutation.isPending ? "Enrolling..." : "Enroll Free"}
          </Button>
        )}
        
        <Button variant="outline" size="sm" asChild>
          <a href={course.external_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
