
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Trophy, 
  Users, 
  MessageSquare,
  Heart,
  Award,
  Link as LinkIcon,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';

interface CommunityProfileProps {
  userId?: string;
}

export const CommunityProfile: React.FC<CommunityProfileProps> = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock data - in real implementation, fetch based on userId
  const profileUser = currentUser; // For now, show current user's profile
  
  if (!profileUser?.profile) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Profile not found</p>
        </CardContent>
      </Card>
    );
  }

  const mockStats = {
    posts: 42,
    followers: 128,
    following: 89,
    likes: 256,
    reputation: 450,
    level: 'Advanced Contributor'
  };

  const mockAchievements = [
    { id: 1, title: 'First Post', icon: '🎉', earned: '2024-01-15' },
    { id: 2, title: 'Community Helper', icon: '🤝', earned: '2024-02-20' },
    { id: 3, title: 'Popular Creator', icon: '⭐', earned: '2024-03-10' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profileUser.profile.avatar_url || ''} />
                <AvatarFallback className="text-2xl">
                  {profileUser.profile.full_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {userId && userId !== currentUser?.id && (
                <Button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  variant={isFollowing ? "outline" : "default"}
                  className="w-full md:w-auto"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{profileUser.profile.full_name}</h1>
                  <p className="text-muted-foreground">@{profileUser.email.split('@')[0]}</p>
                  <Badge variant="secondary" className="mt-2">
                    {mockStats.level}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0 text-center">
                  <div>
                    <div className="font-bold">{mockStats.posts}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="font-bold">{mockStats.followers}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold">{mockStats.following}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>

              {profileUser.profile.bio && (
                <p className="mb-4">{profileUser.profile.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {profileUser.profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileUser.profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(profileUser.profile.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{mockStats.reputation} reputation</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {profileUser.profile.github_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileUser.profile.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      GitHub
                    </a>
                  </Button>
                )}
                {profileUser.profile.linkedin_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileUser.profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {profileUser.profile.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileUser.profile.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Posts Created
                    </span>
                    <Badge variant="secondary">{mockStats.posts}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Likes Received
                    </span>
                    <Badge variant="secondary">{mockStats.likes}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Community Connections
                    </span>
                    <Badge variant="secondary">{mockStats.followers + mockStats.following}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAchievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Earned {new Date(achievement.earned).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">User posts will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Earned {new Date(achievement.earned).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">Recent activity will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
