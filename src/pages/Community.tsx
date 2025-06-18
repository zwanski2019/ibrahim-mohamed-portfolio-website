
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2, Search, Plus, Hash, Users, TrendingUp, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Channel {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  post_count: number;
  member_count: number;
}

interface Post {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  view_count: number;
  image_urls: string[];
  video_url: string | null;
  is_pinned: boolean;
  author: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  channel: {
    id: string;
    name: string;
    icon: string | null;
    color: string;
  };
}

const Community = () => {
  const { user, isAuthenticated } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [postChannel, setPostChannel] = useState("");

  // Fetch channels
  useEffect(() => {
    fetchChannels();
  }, []);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, [selectedChannel]);

  const fetchChannels = async () => {
    try {
      const { data, error } = await supabase
        .from("channels")
        .select("*")
        .order("name");

      if (error) throw error;
      setChannels(data || []);
    } catch (error) {
      console.error("Error fetching channels:", error);
      toast.error("Failed to load channels");
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("posts")
        .select(`
          *,
          author:profiles!posts_author_id_fkey(id, full_name, avatar_url),
          channel:channels!posts_channel_id_fkey(id, name, icon, color)
        `)
        .order("created_at", { ascending: false });

      if (selectedChannel !== "all") {
        query = query.eq("channel_id", selectedChannel);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to create posts");
      return;
    }

    if (!newPostContent.trim()) {
      toast.error("Post content is required");
      return;
    }

    if (!postChannel) {
      toast.error("Please select a channel");
      return;
    }

    try {
      const { error } = await supabase
        .from("posts")
        .insert({
          title: newPostTitle.trim() || null,
          content: newPostContent.trim(),
          channel_id: postChannel,
          author_id: user.id,
        });

      if (error) throw error;

      toast.success("Post created successfully!");
      setNewPostTitle("");
      setNewPostContent("");
      setPostChannel("");
      setShowCreatePost(false);
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    }
  };

  const likePost = async (postId: string) => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to like posts");
      return;
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("post_id", postId)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", postId);
      } else {
        // Like
        await supabase
          .from("likes")
          .insert({
            user_id: user.id,
            post_id: postId,
            reaction_type: "like"
          });
      }

      fetchPosts();
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle>Join the Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sign in to participate in discussions and connect with fellow developers.
            </p>
            <Button onClick={() => window.location.href = "/auth?tab=signin"}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Community</h1>
              <p className="text-muted-foreground">Connect, learn, and grow together</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                  onKeyDown={(e) => e.key === "Enter" && fetchPosts()}
                />
              </div>
              <Button onClick={() => setShowCreatePost(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedChannel === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedChannel("all")}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  All Posts
                </Button>
                {channels.map((channel) => (
                  <Button
                    key={channel.id}
                    variant={selectedChannel === channel.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedChannel(channel.id)}
                  >
                    <span className="mr-2">{channel.icon}</span>
                    {channel.name}
                    <Badge variant="secondary" className="ml-auto">
                      {channel.post_count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Posts</span>
                  <span className="font-medium">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Channels</span>
                  <span className="font-medium">{channels.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Create Post Modal */}
            {showCreatePost && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Post title (optional)"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={postChannel}
                    onChange={(e) => setPostChannel(e.target.value)}
                    required
                  >
                    <option value="">Select a channel</option>
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.icon} {channel.name}
                      </option>
                    ))}
                  </select>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button onClick={createPost}>Post</Button>
                    <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts Feed */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-muted rounded-full" />
                        <div className="space-y-2">
                          <div className="w-32 h-4 bg-muted rounded" />
                          <div className="w-24 h-3 bg-muted rounded" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-3/4 h-4 bg-muted rounded" />
                        <div className="w-1/2 h-4 bg-muted rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to start a conversation in this channel!
                  </p>
                  <Button onClick={() => setShowCreatePost(true)}>
                    Create First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar_url || ""} />
                          <AvatarFallback>
                            {post.author.full_name?.split(" ").map(n => n[0]).join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{post.author.full_name}</span>
                            <Badge 
                              variant="secondary" 
                              style={{ backgroundColor: `${post.channel.color}20`, color: post.channel.color }}
                            >
                              {post.channel.icon} {post.channel.name}
                            </Badge>
                            {post.is_pinned && (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                Pinned
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>

                      {/* Post Content */}
                      {post.title && (
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      )}
                      <div className="prose prose-sm max-w-none mb-4">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                      </div>

                      {/* Post Images */}
                      {post.image_urls && post.image_urls.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {post.image_urls.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Post image ${index + 1}`}
                              className="rounded-lg object-cover w-full h-48"
                            />
                          ))}
                        </div>
                      )}

                      {/* Post Video */}
                      {post.video_url && (
                        <div className="mb-4">
                          <video
                            src={post.video_url}
                            controls
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-6 pt-4 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => likePost(post.id)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          {post.like_count}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-blue-500"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {post.comment_count}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-green-500"
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {post.view_count} views
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
