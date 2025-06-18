
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export interface Channel {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  post_count: number;
  member_count: number;
}

export interface Post {
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

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  like_count: number;
  parent_id: string | null;
  author: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
}

export const useCommunity = () => {
  const { user, isAuthenticated } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch channels
  const fetchChannels = async () => {
    try {
      const { data, error } = await supabase
        .from("channels")
        .select("*")
        .order("name");

      if (error) throw error;
      setChannels(data || []);
      return data;
    } catch (error) {
      console.error("Error fetching channels:", error);
      toast.error("Failed to load channels");
      return [];
    }
  };

  // Fetch posts
  const fetchPosts = async (channelId?: string, searchQuery?: string) => {
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

      if (channelId && channelId !== "all") {
        query = query.eq("channel_id", channelId);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Create post
  const createPost = async (postData: {
    title?: string;
    content: string;
    channel_id: string;
    image_urls?: string[];
    video_url?: string;
  }) => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to create posts");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          ...postData,
          author_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      toast.success("Post created successfully!");
      return data;
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
      return null;
    }
  };

  // Like/unlike post
  const togglePostLike = async (postId: string) => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to like posts");
      return false;
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

      return true;
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like");
      return false;
    }
  };

  // Fetch comments for a post
  const fetchComments = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          author:profiles!comments_author_id_fkey(id, full_name, avatar_url)
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setComments(data || []);
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
      return [];
    }
  };

  // Create comment
  const createComment = async (commentData: {
    post_id: string;
    content: string;
    parent_id?: string;
  }) => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to comment");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          ...commentData,
          author_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      toast.success("Comment added successfully!");
      return data;
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error("Failed to add comment");
      return null;
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!isAuthenticated) return;

    const postsSubscription = supabase
      .channel('posts_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'posts' }, 
        (payload) => {
          console.log('Posts change received!', payload);
          // Refetch posts to get updated data
          fetchPosts();
        }
      )
      .subscribe();

    const likesSubscription = supabase
      .channel('likes_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'likes' }, 
        (payload) => {
          console.log('Likes change received!', payload);
          // Refetch posts to get updated like counts
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsSubscription);
      supabase.removeChannel(likesSubscription);
    };
  }, [isAuthenticated]);

  return {
    channels,
    posts,
    comments,
    loading,
    fetchChannels,
    fetchPosts,
    createPost,
    togglePostLike,
    fetchComments,
    createComment,
  };
};
