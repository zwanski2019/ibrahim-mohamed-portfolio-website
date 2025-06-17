
import { supabase } from '@/integrations/supabase/client';

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
  category?: string;
  author?: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  items: RSSItem[];
}

export const generateRSSXML = (feed: RSSFeed): string => {
  const rssItems = feed.items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid>${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      ${item.category ? `<category>${item.category}</category>` : ''}
      ${item.author ? `<author>${item.author}</author>` : ''}
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${feed.title}]]></title>
    <description><![CDATA[${feed.description}]]></description>
    <link>${feed.link}</link>
    <atom:link href="${feed.link}/rss" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Zwanski Tech RSS Generator</generator>
    ${rssItems}
  </channel>
</rss>`;
};

export const getBlogPostsForRSS = async (): Promise<RSSItem[]> => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return posts?.map(post => ({
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 200) + '...' || '',
      link: `${window.location.origin}/blog/${post.slug}`,
      guid: `${window.location.origin}/blog/${post.slug}`,
      pubDate: new Date(post.published_at || post.created_at).toUTCString(),
      category: post.tags?.[0] || undefined,
      author: 'Zwanski Tech'
    })) || [];
  } catch (error) {
    console.error('Error fetching blog posts for RSS:', error);
    return [];
  }
};

export const getProjectsForRSS = async (): Promise<RSSItem[]> => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    return projects?.map(project => ({
      title: project.title,
      description: project.description || '',
      link: `${window.location.origin}/projects/${project.slug}`,
      guid: `${window.location.origin}/projects/${project.slug}`,
      pubDate: new Date(project.updated_at || project.created_at).toUTCString(),
      category: project.category || undefined,
      author: 'Zwanski Tech'
    })) || [];
  } catch (error) {
    console.error('Error fetching projects for RSS:', error);
    return [];
  }
};
