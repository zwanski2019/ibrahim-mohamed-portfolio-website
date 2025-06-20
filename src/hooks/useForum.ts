
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ForumCategory, ForumThread, ForumReply } from '@/types/forum';
import { toast } from 'sonner';

export const useForumCategories = () => {
  return useQuery({
    queryKey: ['forum-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as ForumCategory[];
    },
  });
};

export const useForumThreads = (categoryId?: string, limit = 20) => {
  return useQuery({
    queryKey: ['forum-threads', categoryId, limit],
    queryFn: async () => {
      let query = supabase
        .from('forum_threads')
        .select(`
          *,
          author:profiles!forum_threads_author_id_fkey(id, full_name, avatar_url),
          category:forum_categories!forum_threads_category_id_fkey(*)
        `)
        .order('is_pinned', { ascending: false })
        .order('last_activity_at', { ascending: false })
        .limit(limit);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ForumThread[];
    },
  });
};

export const useForumThread = (slug: string) => {
  return useQuery({
    queryKey: ['forum-thread', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          author:profiles!forum_threads_author_id_fkey(id, full_name, avatar_url),
          category:forum_categories!forum_threads_category_id_fkey(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as ForumThread;
    },
  });
};

export const useForumReplies = (threadId: string) => {
  return useQuery({
    queryKey: ['forum-replies', threadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_replies')
        .select(`
          *,
          author:profiles!forum_replies_author_id_fkey(id, full_name, avatar_url)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ForumReply[];
    },
  });
};

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, content, categoryId, tags }: {
      title: string;
      content: string;
      categoryId: string;
      tags: string[];
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 100) + '-' + Date.now();

      const { data, error } = await supabase
        .from('forum_threads')
        .insert({
          title,
          content,
          slug,
          author_id: user.id,
          category_id: categoryId,
          tags,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-threads'] });
      queryClient.invalidateQueries({ queryKey: ['forum-categories'] });
      toast.success('Thread created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create thread: ' + error.message);
    },
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, threadId, parentId }: {
      content: string;
      threadId: string;
      parentId?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('forum_replies')
        .insert({
          content,
          thread_id: threadId,
          author_id: user.id,
          parent_id: parentId || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['forum-replies', variables.threadId] });
      queryClient.invalidateQueries({ queryKey: ['forum-threads'] });
      toast.success('Reply posted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to post reply: ' + error.message);
    },
  });
};

export const useToggleThreadLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (threadId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if already liked
      const { data: existingLike } = await supabase
        .from('forum_thread_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('thread_id', threadId)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('forum_thread_likes')
          .delete()
          .eq('id', existingLike.id);
        if (error) throw error;
        return { action: 'unliked' };
      } else {
        // Like
        const { error } = await supabase
          .from('forum_thread_likes')
          .insert({
            user_id: user.id,
            thread_id: threadId,
          });
        if (error) throw error;
        return { action: 'liked' };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-threads'] });
      queryClient.invalidateQueries({ queryKey: ['forum-thread'] });
    },
  });
};

export const useToggleReplyLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (replyId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if already liked
      const { data: existingLike } = await supabase
        .from('forum_reply_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('reply_id', replyId)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('forum_reply_likes')
          .delete()
          .eq('id', existingLike.id);
        if (error) throw error;
        return { action: 'unliked' };
      } else {
        // Like
        const { error } = await supabase
          .from('forum_reply_likes')
          .insert({
            user_id: user.id,
            reply_id: replyId,
          });
        if (error) throw error;
        return { action: 'liked' };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-replies'] });
    },
  });
};
