import { supabase } from '@/integrations/supabase/client';

const BLOGGER_API_URL = 'https://www.googleapis.com/blogger/v3';
const BLOG_ID: string | undefined = import.meta.env.VITE_BLOGGER_BLOG_ID;
const API_KEY: string | undefined = import.meta.env.VITE_BLOGGER_API_KEY;

function missingConfig() {
  return !API_KEY || !BLOG_ID;
}

async function invokeProxy<T>(path: string, body?: Record<string, any>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(`blogger-proxy/${path}`, {
    body,
  });
  if (error) {
    console.error('Edge function error:', error);
    throw new Error(error.message || 'Blogger proxy error');
  }
  return data as T;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
  author: {
    displayName: string;
    image?: {
      url: string;
    };
  };
  images?: {
    url: string;
  }[];
  labels?: string[];
}

export interface BloggerResponse {
  items: BlogPost[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export const bloggerApi = {
  async getPosts(pageToken?: string, maxResults: number = 12): Promise<BloggerResponse> {
    try {
      if (missingConfig()) {
        const body: Record<string, any> = { maxResults };
        if (pageToken) body.pageToken = pageToken;
        return await invokeProxy<BloggerResponse>('posts', body);
      }

      const params = new URLSearchParams({
        key: API_KEY!,
        maxResults: maxResults.toString(),
        orderBy: 'published',
        fetchImages: 'true',
        fetchBodies: 'true',
      });

      if (pageToken) {
        params.append('pageToken', pageToken);
      }

      const response = await fetch(`${BLOGGER_API_URL}/blogs/${BLOG_ID}/posts?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        items: data.items || [],
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPageToken,
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  async getPost(postId: string): Promise<BlogPost | null> {
    try {
      if (missingConfig()) {
        return await invokeProxy<BlogPost>(`posts/${postId}`);
      }

      const response = await fetch(
        `${BLOGGER_API_URL}/blogs/${BLOG_ID}/posts/${postId}?key=${API_KEY}&fetchImages=true&fetchBodies=true`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  },

  async searchPosts(query: string, maxResults: number = 12): Promise<BloggerResponse> {
    try {
      if (missingConfig()) {
        return await invokeProxy<BloggerResponse>('search', { query, maxResults });
      }

      const params = new URLSearchParams({
        key: API_KEY!,
        q: query,
        maxResults: maxResults.toString(),
        orderBy: 'published',
        fetchImages: 'true',
        fetchBodies: 'true',
      });

      const response = await fetch(`${BLOGGER_API_URL}/blogs/${BLOG_ID}/posts/search?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        items: data.items || [],
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPageToken,
      };
    } catch (error) {
      console.error('Error searching blog posts:', error);
      throw error;
    }
  },

  extractImageFromContent(content: string): string | null {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  },

  createExcerpt(content: string, maxLength: number = 200): string {
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) {
      return textContent;
    }
    
    return textContent.slice(0, maxLength).trim() + '...';
  }
};
