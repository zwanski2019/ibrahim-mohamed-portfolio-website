
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Target,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

export const ProgressTracker: React.FC = () => {
  const { user } = useAuth();

  const { data: progressStats } = useQuery({
    queryKey: ['progress-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get overall progress statistics
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          courses:course_id(
            title,
            duration_hours,
            thumbnail_url
          )
        `)
        .eq('user_id', user.id);

      if (enrollmentsError) throw enrollmentsError;

      // Get detailed progress for each course
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      // Get user achievements
      const { data: achievements, error: achievementsError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (achievementsError) throw achievementsError;

      return {
        enrollments: enrollments || [],
        userProgress: userProgress || [],
        achievements: achievements || []
      };
    },
    enabled: !!user
  });

  const { data: weeklyActivity } = useQuery({
    queryKey: ['weekly-activity', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .gte('updated_at', oneWeekAgo.toISOString())
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please sign in to view your progress.</p>
      </div>
    );
  }

  if (!progressStats) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalEnrollments = progressStats.enrollments.length;
  const completedCourses = progressStats.enrollments.filter(e => e.completed_at).length;
  const totalHours = progressStats.enrollments.reduce(
    (acc, e) => acc + (e.courses?.duration_hours || 0), 0
  );
  const completionRate = totalEnrollments > 0 ? Math.round((completedCourses / totalEnrollments) * 100) : 0;

  const recentAchievements = progressStats.achievements.slice(0, 3);
  const thisWeekActivity = weeklyActivity?.length || 0;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enrolled</p>
                <p className="text-2xl font-bold">{totalEnrollments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Learning Hours</p>
                <p className="text-2xl font-bold">{totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Courses Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Current Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressStats.enrollments
            .filter(e => !e.completed_at)
            .slice(0, 5)
            .map((enrollment) => {
              const courseProgress = progressStats.userProgress.filter(
                p => p.course_id === enrollment.course_id
              );
              const avgProgress = courseProgress.length > 0
                ? Math.round(
                    courseProgress.reduce((acc, p) => acc + p.progress_percentage, 0) / courseProgress.length
                  )
                : 0;

              return (
                <div key={enrollment.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-muted rounded overflow-hidden">
                        {enrollment.courses?.thumbnail_url ? (
                          <img 
                            src={enrollment.courses.thumbnail_url} 
                            alt={enrollment.courses.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{enrollment.courses?.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.courses?.duration_hours}h total
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{avgProgress}%</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(enrollment.enrolled_at), 'MMM d')}
                      </p>
                    </div>
                  </div>
                  <Progress value={avgProgress} className="h-2" />
                </div>
              );
            })}

          {progressStats.enrollments.filter(e => !e.completed_at).length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No courses in progress</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(achievement.earned_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-primary mb-2">{thisWeekActivity}</div>
            <p className="text-muted-foreground">Learning sessions completed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
