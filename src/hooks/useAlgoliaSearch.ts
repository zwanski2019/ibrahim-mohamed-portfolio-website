import { useState, useCallback } from 'react';
import { algoliaSearchService, AlgoliaSearchResult, AlgoliaSearchResponse } from '@/services/algoliaSearchService';

export const useAlgoliaSearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AlgoliaSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);

  const search = useCallback(async (query: string, options: { page?: number; filters?: Record<string, string[]> } = {}) => {
    if (!query.trim()) {
      setResults([]);
      setTotalHits(0);
      return;
    }

    setLoading(true);
    try {
      let response: AlgoliaSearchResponse;
      
      if (options.filters && Object.keys(options.filters).length > 0) {
        response = await algoliaSearchService.searchWithFacets(query, options.filters);
      } else {
        response = await algoliaSearchService.search({
          query,
          page: options.page || 0,
          hitsPerPage: 20,
        });
      }

      setResults(response.hits);
      setTotalHits(response.nbHits);
      setProcessingTime(response.processingTimeMS);

      // Track search
      algoliaSearchService.trackSearch(query, response.nbHits);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalHits(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const suggestionResults = await algoliaSearchService.searchSuggestions(query);
      setSuggestions(suggestionResults);
    } catch (error) {
      console.error('Suggestions error:', error);
      setSuggestions([]);
    }
  }, []);

  const trackClick = useCallback((objectID: string, position: number, query: string) => {
    algoliaSearchService.trackClick(objectID, position, query);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setSuggestions([]);
    setTotalHits(0);
    setProcessingTime(0);
  }, []);

  return {
    loading,
    results,
    suggestions,
    totalHits,
    processingTime,
    search,
    getSuggestions,
    trackClick,
    clearResults,
  };
};