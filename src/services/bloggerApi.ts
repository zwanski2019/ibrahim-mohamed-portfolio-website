import { supabase } from '@/integrations/supabase/client';

const BLOGGER_API_URL = 'https://www.googleapis.com/blogger/v3';
const BLOG_ID: string | undefined = import.meta.env.VITE_BLOGGER_BLOG_ID;
const API_KEY: string | undefined = import.meta.env.VITE_BLOGGER_API_KEY;
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://ceihcnfngpmrtqunhaey.supabase.co';

const useProxy = !BLOG_ID || !API_KEY;

async function proxyFetch<T>(
  path: string,
  paramsOrBody: Record<string, any>,
  method: 'GET' | 'POST' = 'GET'
): Promise<T> {
  const url = new URL(`${SUPABASE_URL}/functions/v1/blogger-proxy${path}`);
  let options: RequestInit = { method };

  if (method === 'GET') {
    Object.entries(paramsOrBody).forEach(([k, v]) => {
      if (v != null) url.searchParams.append(k, String(v));
    });
  } else {
    options.body = JSON.stringify(paramsOrBody);
    options.headers = { 'Content-Type': 'application/json' };
  }

  const res = await fetch(url.toString(), options);
  if (!res.ok) {
    throw new Error(`Proxy error! status: ${res.status}`);
  }
  return await res.json();
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
    image?: { url: string };
  };
  images?: { url: string }[];
  labels?: string[];
}

export interface BloggerResponse {
  items: BlogPost[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export const bloggerApi = {
  async getPosts(pageToken?: string, maxResults: number = 12): Promise<BloggerResponse> {
    if (useProxy) {
      return proxyFetch<BloggerResponse>(
        '/posts',
        { pageToken, maxResults },
        'GET'
      );
    }

    const params = new URLSearchParams({
      key: API_KEY!,
      maxResults: String(maxResults),
      orderBy: 'published',
      fetchImages: 'true',
      fetchBodies: 'true',
      ...(pageToken ? { pageToken } : {}),
    });

    const response = await fetch(
      `${BLOGGER_API_URL}/blogs/${BLOG_ID}/posts?${params}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      items: data.items || [],
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
    };
  },

  async getPost(postId: string): Promise<BlogPost | null> {
    if (useProxy) {
      return proxyFetch<BlogPost>(`/posts/${postId}`, {}, 'GET');
    }

    const response = await fetch(
      `${BLOGGER_API_URL}/blogs/${BLOG_ID}/posts/${postId}?` +
        new URLSearchParams({
          key: API_KEY!,
          fetchImages: 'true',
          fetchBodies: 'true',
        })
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return (await response.json()) as BlogPost;
  },

  async searchPosts(query: string, maxResults: number = 12): Promise<BloggerResponse> {
    if (useProxy) {
      return proxyFetch<BloggerResponse>(
        '/search',
        { q: query, maxResults },
        'GET'
      );
    }

    const params = new URLSearchParams({
      key: API_KEY!,
      q: query,
      maxResults: String(maxResults),
      orderBy: 'published',
      fetchImages: 'true',
      fetchBodies: 'true',
    });

    const response = await fetch(
      `${BLOGGER_API_URL}/blogs/${BLOG_ID}/posts/search?${params}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      items: data.items || [],
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
    };
  },

  extractImageFromContent(content: string): string | null {
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  },

  createExcerpt(content: string, maxLength: number = 200): string {
    const text = content.replace(/<[^>]*>/g, '');
    return text.length <= maxLength ? text : text.slice(0, maxLength).trim() + '...';
  },
};
