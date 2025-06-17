
import { useEffect, useState } from 'react';
import { generateRSSXML, getBlogPostsForRSS, getProjectsForRSS, RSSFeed } from '@/utils/rssGenerator';

const RSS = () => {
  const [rssXML, setRssXML] = useState<string>('');

  useEffect(() => {
    const generateRSS = async () => {
      try {
        // Get blog posts and projects
        const [blogPosts, projects] = await Promise.all([
          getBlogPostsForRSS(),
          getProjectsForRSS()
        ]);

        // Combine and sort all items by date
        const allItems = [...blogPosts, ...projects].sort((a, b) => 
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        const feed: RSSFeed = {
          title: 'Zwanski Tech - Latest Updates',
          description: 'Stay updated with the latest blog posts, projects, and tech insights from Zwanski Tech. Professional web development, IT support, and custom solutions.',
          link: window.location.origin,
          items: allItems.slice(0, 20) // Limit to 20 most recent items
        };

        const xml = generateRSSXML(feed);
        setRssXML(xml);

        // Set proper content type for RSS
        document.querySelector('meta[name="content-type"]')?.setAttribute('content', 'application/rss+xml');
      } catch (error) {
        console.error('Error generating RSS feed:', error);
        setRssXML('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title><description>Error generating RSS feed</description></channel></rss>');
      }
    };

    generateRSS();
  }, []);

  // Return the RSS XML directly
  useEffect(() => {
    if (rssXML) {
      // Replace the entire document with RSS XML
      document.open();
      document.write(rssXML);
      document.close();
      
      // Set proper headers
      if (document.querySelector('meta[name="content-type"]')) {
        document.querySelector('meta[name="content-type"]')?.setAttribute('content', 'application/rss+xml; charset=utf-8');
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'content-type');
        meta.setAttribute('content', 'application/rss+xml; charset=utf-8');
        document.head.appendChild(meta);
      }
    }
  }, [rssXML]);

  return (
    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
      {rssXML || 'Generating RSS feed...'}
    </div>
  );
};

export default RSS;
