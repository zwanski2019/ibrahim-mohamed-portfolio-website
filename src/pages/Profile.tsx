import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, MapPin } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  // Fetch user activity stats
  const { data: userStats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const [postsRes, commentsRes, enrollmentsRes, applicationsRes] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact', head: true }).eq('author_id', user.id),
        supabase.from('comments').select('id', { count: 'exact', head: true }).eq('author_id', user.id),
        supabase.from('course_enrollments').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('applications').select('id', { count: 'exact', head: true }).eq('worker_id', user.id)
      ]);

      return {
        posts: postsRes.count || 0,
        comments: commentsRes.count || 0,
        courses: enrollmentsRes.count || 0,
        applications: applicationsRes.count || 0
      };
    },
    enabled: !!user?.id
  });

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {user?.user_metadata?.user_type || 'User'}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Joined {new Date(user?.created_at || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <p className="text-muted-foreground">
                      {user?.user_metadata?.full_name || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <p className="text-muted-foreground">
                      {user?.user_metadata?.phone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Location</label>
                    <p className="text-muted-foreground">
                      {user?.user_metadata?.location || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="mr-4">Edit Profile</Button>
                  <Button variant="outline">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats?.posts || 0}</div>
                  <p className="text-sm text-muted-foreground">Posts Created</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats?.comments || 0}</div>
                  <p className="text-sm text-muted-foreground">Comments Made</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats?.courses || 0}</div>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats?.applications || 0}</div>
                  <p className="text-sm text-muted-foreground">Jobs Applied</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}