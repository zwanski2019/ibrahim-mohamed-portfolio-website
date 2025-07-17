import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'blog' | 'job' | 'course' | 'tool';
  category?: string;
  snippet?: string;
  relevance?: number;
}

// Static content index
const staticContent: SearchResult[] = [
  {
    id: 'home',
    title: 'Home - Zwanski Tech',
    description: 'Professional web development, IT support, and cybersecurity services',
    url: '/',
    type: 'page',
    category: 'main'
  },
  {
    id: 'services',
    title: 'Services - Web Development & IT Support',
    description: 'Custom web development, device repair, cybersecurity solutions',
    url: '/services',
    type: 'page',
    category: 'main'
  },
  {
    id: 'about',
    title: 'About - Mohamed Ibrahim Zwanski',
    description: 'Learn about our mission to empower migrants and underserved communities',
    url: '/about',
    type: 'page',
    category: 'main'
  },
  {
    id: 'academy',
    title: 'Zwanski Academy - Free Education',
    description: 'Free courses on cybersecurity, web development, and digital skills',
    url: '/academy',
    type: 'page',
    category: 'education'
  },
  {
    id: 'jobs',
    title: 'Job Board - Find Remote Work',
    description: 'Freelance and remote job opportunities for developers and IT professionals',
    url: '/jobs',
    type: 'page',
    category: 'career'
  },
  {
    id: 'freelancers',
    title: 'Freelancers - Hire Talent',
    description: 'Connect with skilled freelancers for your projects',
    url: '/freelancers',
    type: 'page',
    category: 'career'
  },
  {
    id: 'blog',
    title: 'Tech Blog - Latest Insights',
    description: 'Articles on technology, development, and digital innovation',
    url: '/blog',
    type: 'page',
    category: 'content'
  },
  {
    id: 'tools',
    title: 'Free Tools - Developer Resources',
    description: 'IMEI checker and other useful development tools',
    url: '/tools',
    type: 'page',
    category: 'tools'
  },
  {
    id: 'imei-check',
    title: 'IMEI Checker Tool',
    description: 'Check device IMEI status and blacklist information',
    url: '/imei-check',
    type: 'tool',
    category: 'tools'
  },
  {
    id: 'chat',
    title: 'Community Chat',
    description: 'Join our community discussions and get real-time help',
    url: '/chat',
    type: 'page',
    category: 'community'
  },
  {
    id: 'support',
    title: 'Support Center',
    description: 'Get help and support for our services',
    url: '/support',
    type: 'page',
    category: 'help'
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description: 'Common questions and answers about our services',
    url: '/faq',
    type: 'page',
    category: 'help'
  }
];

export const useGlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    
    try {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      
      // Search static content
      const staticResults = searchStaticContent(normalizedQuery);
      
      // Search dynamic content from Supabase
      const dynamicResults = await searchDynamicContent(normalizedQuery);
      
      // Combine and rank results
      const allResults = [...staticResults, ...dynamicResults];
      const rankedResults = rankResults(allResults, normalizedQuery);
      
      setResults(rankedResults.slice(0, 10)); // Limit to top 10 results
      generateSuggestions(normalizedQuery);
      
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const searchStaticContent = (query: string): SearchResult[] => {
    return staticContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const descMatch = item.description.toLowerCase().includes(query);
      const typeMatch = item.type.toLowerCase().includes(query);
      const categoryMatch = item.category?.toLowerCase().includes(query);
      
      return titleMatch || descMatch || typeMatch || categoryMatch;
    }).map(item => ({
      ...item,
      relevance: calculateRelevance(item, query)
    }));
  };

  const searchDynamicContent = async (query: string): Promise<SearchResult[]> => {
    const results: SearchResult[] = [];

    try {
      // Search blog posts
      const { data: blogPosts } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, slug')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(5);

      if (blogPosts) {
        blogPosts.forEach(post => {
          results.push({
            id: post.id,
            title: post.title,
            description: post.excerpt || 'Blog post',
            url: `/blog/${post.slug}`,
            type: 'blog',
            category: 'content',
            relevance: calculateRelevance({ title: post.title, description: post.excerpt || '' }, query)
          });
        });
      }

      // Search job posts
      const { data: jobPosts } = await supabase
        .from('job_posts')
        .select('id, title, description, category')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(5);

      if (jobPosts) {
        jobPosts.forEach(job => {
          results.push({
            id: job.id,
            title: job.title,
            description: job.description.substring(0, 150) + '...',
            url: `/jobs/${job.id}`,
            type: 'job',
            category: job.category,
            relevance: calculateRelevance({ title: job.title, description: job.description }, query)
          });
        });
      }

      // Search courses
      const { data: courses } = await supabase
        .from('courses')
        .select('id, title, description, slug')
        .eq('is_active', true)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5);

      if (courses) {
        courses.forEach(course => {
          results.push({
            id: course.id,
            title: course.title,
            description: course.description || 'Course',
            url: `/academy/course/${course.slug}`,
            type: 'course',
            category: 'education',
            relevance: calculateRelevance({ title: course.title, description: course.description || '' }, query)
          });
        });
      }

    } catch (error) {
      console.error('Dynamic search error:', error);
    }

    return results;
  };

  const calculateRelevance = (item: { title: string; description: string }, query: string): number => {
    const titleWeight = 3;
    const descWeight = 1;
    
    const titleMatches = (item.title.toLowerCase().match(new RegExp(query, 'g')) || []).length;
    const descMatches = (item.description.toLowerCase().match(new RegExp(query, 'g')) || []).length;
    
    const titleStartsWithQuery = item.title.toLowerCase().startsWith(query) ? 5 : 0;
    
    return (titleMatches * titleWeight) + (descMatches * descWeight) + titleStartsWithQuery;
  };

  const rankResults = (results: SearchResult[], query: string): SearchResult[] => {
    return results.sort((a, b) => {
      // Sort by relevance first, then by type priority
      const typePriority = { page: 3, tool: 2, course: 1, blog: 1, job: 0 };
      
      if (b.relevance !== a.relevance) {
        return (b.relevance || 0) - (a.relevance || 0);
      }
      
      return (typePriority[b.type] || 0) - (typePriority[a.type] || 0);
    });
  };

  const generateSuggestions = (query: string) => {
    const commonSuggestions = [
      'web development',
      'cybersecurity',
      'device repair',
      'freelance jobs',
      'academy courses',
      'IMEI checker',
      'blog posts',
      'IT support'
    ];

    const filtered = commonSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase()) &&
      suggestion.toLowerCase() !== query.toLowerCase()
    );

    setSuggestions(filtered.slice(0, 5));
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
  };

  const filterResults = useMemo(() => {
    return (type?: string) => {
      if (!type) return results;
      return results.filter(result => result.type === type);
    };
  }, [results]);

  return {
    query,
    setQuery,
    results,
    loading,
    suggestions,
    clearSearch,
    filterResults,
    performSearch
  };
};