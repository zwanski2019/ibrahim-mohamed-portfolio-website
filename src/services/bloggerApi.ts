const BLOGGER_API_URL = 'https://www.googleapis.com/blogger/v3';
const BLOG_ID = '2094023803732877329'; // You can update this with your actual Blogger blog ID
const API_KEY = 'AIzaSyCqVn8xG2WL5j5c7r0GpYa0m9Qv-j6U_xQ'; // You'll need to get a Blogger API key

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
      const params = new URLSearchParams({
        key: API_KEY,
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
      return { items: [] };
    }
  },

  async getPost(postId: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(
        `${BLOGGER_API_URL}/blogs/${BLOG_ID}/posts/${postId}?key=${API_KEY}&fetchImages=true&fetchBodies=true`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  async searchPosts(query: string, maxResults: number = 12): Promise<BloggerResponse> {
    try {
      const params = new URLSearchParams({
        key: API_KEY,
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
      return { items: [] };
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