
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useCommunity } from '@/hooks/useCommunity';
import { EnhancedPostCreator } from '@/components/community/EnhancedPostCreator';
import { EnhancedPostCard } from '@/components/community/EnhancedPostCard';
import { CommunitySearch } from '@/components/community/CommunitySearch';
import { PostReactions } from '@/components/community/PostReactions';
import { Plus, Hash, TrendingUp, Users, MessageSquare } from 'lucide-react';

const Community = () => {
  const { isAuthenticated } = useAuth();
  const { 
    channels, 
    posts, 
    loading, 
    fetchChannels, 
    fetchPosts 
  } = useCommunity();
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    fetchChannels();
    fetchPosts();
  }, []);

  const handleChannelChange = (channelId: string) => {
    setSelectedChannel(channelId);
    fetchPosts(channelId);
  };

  const handlePostCreated = () => {
    setShowCreatePost(false);
    fetchPosts(selectedChannel);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Channels</span>
                  <Badge variant="secondary">{channels.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Posts</span>
                  <Badge variant="secondary">
                    {channels.reduce((sum, channel) => sum + channel.post_count, 0)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Members</span>
                  <Badge variant="secondary">
                    {channels.reduce((sum, channel) => sum + channel.member_count, 0)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedChannel === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleChannelChange('all')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  All Posts
                </Button>
                
                {channels.map((channel) => (
                  <Button
                    key={channel.id}
                    variant={selectedChannel === channel.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => handleChannelChange(channel.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {channel.icon && <span>{channel.icon}</span>}
                        <span>{channel.name}</span>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {channel.post_count}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['webdev', 'react', 'javascript', 'career', 'tutorial'].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Community</h1>
              {isAuthenticated && (
                <Button onClick={() => setShowCreatePost(!showCreatePost)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              )}
            </div>

            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {showCreatePost && (
                  <EnhancedPostCreator onPostCreated={handlePostCreated} />
                )}

                {loading ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-muted-foreground">Loading posts...</p>
                    </CardContent>
                  </Card>
                ) : posts.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">No posts yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Be the first to start a conversation in this channel!
                      </p>
                      {isAuthenticated && (
                        <Button onClick={() => setShowCreatePost(true)}>
                          Create First Post
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <div key={post.id} className="space-y-4">
                        <EnhancedPostCard post={post} />
                        <div className="ml-4">
                          <PostReactions postId={post.id} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="search">
                <CommunitySearch />
              </TabsContent>

              <TabsContent value="trending">
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Trending Content</h3>
                    <p className="text-muted-foreground">
                      Discover the most popular posts and discussions
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
