import { useState, useEffect, useCallback } from 'react';
import { bloggerApi, BlogPost, BloggerResponse } from '@/services/bloggerApi';

export function useBlogger() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>();

  const fetchPosts = useCallback(async (pageToken?: string, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      }
      setError(null);

      const response: BloggerResponse = await bloggerApi.getPosts(pageToken);
      
      if (isLoadMore) {
        setPosts(prev => [...prev, ...response.items]);
      } else {
        setPosts(response.items);
      }
      
      setNextPageToken(response.nextPageToken);
      setPrevPageToken(response.prevPageToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPosts = useCallback(async (query: string) => {
    if (!query.trim()) {
      fetchPosts();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response: BloggerResponse = await bloggerApi.searchPosts(query);
      setPosts(response.items);
      setNextPageToken(response.nextPageToken);
      setPrevPageToken(response.prevPageToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search blog posts');
      console.error('Error searching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (nextPageToken && !loading) {
      fetchPosts(nextPageToken, true);
    }
  }, [nextPageToken, loading, fetchPosts]);

  const refreshPosts = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    nextPageToken,
    prevPageToken,
    searchPosts,
    loadMore,
    refreshPosts,
    hasMore: !!nextPageToken
  };
}

export function useBlogPost(postId: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const postData = await bloggerApi.getPost(postId);
        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
}