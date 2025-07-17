import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAlgoliaSearch } from './useAlgoliaSearch';
import { AlgoliaSearchResult } from '@/services/algoliaSearchService';

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
  const [useAlgolia, setUseAlgolia] = useState(true); // Toggle for Algolia vs Supabase search
  
  // Algolia search integration
  const algolia = useAlgoliaSearch();

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

  // Convert Algolia results to SearchResult format
  const convertAlgoliaResults = useCallback((algoliaResults: AlgoliaSearchResult[]): SearchResult[] => {
    return algoliaResults.map(result => ({
      id: result.objectID,
      title: result.title,
      description: result.description,
      url: result.url,
      type: result.type as 'page' | 'blog' | 'job' | 'course' | 'tool',
      category: result.category || '',
      snippet: result._snippetResult?.content?.value || result.description,
      relevance: 1, // Algolia handles relevance internally
    }));
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSuggestions([]);
      algolia.clearResults();
      return;
    }

    setLoading(true);
    
    try {
      if (useAlgolia) {
        // Use Algolia search for enhanced search experience
        await algolia.search(searchQuery);
        const algoliaResults = convertAlgoliaResults(algolia.results);
        
        // If Algolia has good results, use them; otherwise fallback to Supabase
        if (algoliaResults.length > 0) {
          setResults(algoliaResults);
          // Get Algolia suggestions
          await algolia.getSuggestions(searchQuery);
          setSuggestions(algolia.suggestions);
        } else {
          // Fallback to original search
          const normalizedQuery = searchQuery.toLowerCase().trim();
          const staticResults = searchStaticContent(normalizedQuery);
          const dynamicResults = await searchDynamicContent(normalizedQuery);
          const allResults = [...staticResults, ...dynamicResults];
          const rankedResults = rankResults(allResults, normalizedQuery);
          setResults(rankedResults.slice(0, 10));
          generateSuggestions(normalizedQuery);
        }
      } else {
        // Use original Supabase search
        const normalizedQuery = searchQuery.toLowerCase().trim();
        const staticResults = searchStaticContent(normalizedQuery);
        const dynamicResults = await searchDynamicContent(normalizedQuery);
        const allResults = [...staticResults, ...dynamicResults];
        const rankedResults = rankResults(allResults, normalizedQuery);
        setResults(rankedResults.slice(0, 10));
        generateSuggestions(normalizedQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to Supabase search on error
      if (useAlgolia) {
        const normalizedQuery = searchQuery.toLowerCase().trim();
        const staticResults = searchStaticContent(normalizedQuery);
        const dynamicResults = await searchDynamicContent(normalizedQuery);
        const allResults = [...staticResults, ...dynamicResults];
        const rankedResults = rankResults(allResults, normalizedQuery);
        setResults(rankedResults.slice(0, 10));
        generateSuggestions(normalizedQuery);
      }
    } finally {
      setLoading(false);
    }
  }, [useAlgolia, algolia, convertAlgoliaResults]);

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

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
    algolia.clearResults();
  }, [algolia]);

  const filterResults = useMemo(() => {
    return (type?: string) => {
      if (!type) return results;
      return results.filter(result => result.type === type);
    };
  }, [results]);

  // Track clicks for analytics
  const trackClick = useCallback((resultId: string, position: number) => {
    if (useAlgolia) {
      algolia.trackClick(resultId, position, query);
    }
  }, [useAlgolia, algolia, query]);

  return {
    query,
    setQuery,
    results,
    loading: loading || algolia.loading,
    suggestions,
    clearSearch,
    filterResults,
    performSearch,
    trackClick,
    useAlgolia,
    setUseAlgolia,
    // Algolia-specific metrics
    totalHits: algolia.totalHits,
    processingTime: algolia.processingTime,
  };
};