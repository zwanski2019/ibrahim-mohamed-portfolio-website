import { algoliasearch } from 'algoliasearch';

export interface AlgoliaSearchResult {
  objectID: string;
  title: string;
  description: string;
  url: string;
  type: string;
  category?: string;
  keywords?: string[];
  content?: string;
  image?: string;
  _highlightResult?: Record<string, any>;
  _snippetResult?: Record<string, any>;
}

export interface AlgoliaSearchOptions {
  query: string;
  filters?: string;
  facetFilters?: string[][];
  attributesToRetrieve?: string[];
  attributesToHighlight?: string[];
  attributesToSnippet?: string[];
  hitsPerPage?: number;
  page?: number;
}

export interface AlgoliaSearchResponse {
  hits: AlgoliaSearchResult[];
  nbHits: number;
  page: number;
  nbPages: number;
  processingTimeMS: number;
  exhaustiveNbHits: boolean;
  facets?: Record<string, Record<string, number>>;
}

class AlgoliaSearchService {
  private client: ReturnType<typeof algoliasearch>;
  private indexName: string;

  constructor() {
    this.client = algoliasearch('J2PPV6YTDA', 'cf60e39e702e9cc887d9a4b447982783');
    this.indexName = 'zwanski_org_j2ppv6ytda_pages';
  }

  async search(options: AlgoliaSearchOptions): Promise<AlgoliaSearchResponse> {
    try {
      const response = await this.client.searchSingleIndex({
        indexName: this.indexName,
        searchParams: {
          query: options.query,
          filters: options.filters,
          facetFilters: options.facetFilters,
          attributesToRetrieve: options.attributesToRetrieve || [
            'title',
            'description',
            'url',
            'type',
            'category',
            'keywords',
            'image'
          ],
          attributesToHighlight: options.attributesToHighlight || [
            'title',
            'description',
            'content'
          ],
          attributesToSnippet: options.attributesToSnippet || ['content:20'],
          hitsPerPage: options.hitsPerPage || 20,
          page: options.page || 0,
          typoTolerance: true,
          removeWordsIfNoResults: 'allOptional' as const,
          highlightPreTag: '<mark class="bg-primary/20 text-primary rounded px-1">',
          highlightPostTag: '</mark>',
          snippetEllipsisText: '...',
        },
      });
      
      return {
        hits: response.hits.map(hit => ({
          objectID: hit.objectID,
          title: (hit as any).title || '',
          description: (hit as any).description || '',
          url: (hit as any).url || '',
          type: (hit as any).type || '',
          category: (hit as any).category,
          keywords: (hit as any).keywords,
          content: (hit as any).content,
          image: (hit as any).image,
          _highlightResult: hit._highlightResult,
          _snippetResult: hit._snippetResult,
        })),
        nbHits: response.nbHits,
        page: response.page,
        nbPages: response.nbPages,
        processingTimeMS: response.processingTimeMS,
        exhaustiveNbHits: response.exhaustiveNbHits,
        facets: response.facets,
      };
    } catch (error) {
      console.error('Algolia search error:', error);
      // Return empty results on error instead of throwing
      return {
        hits: [],
        nbHits: 0,
        page: 0,
        nbPages: 0,
        processingTimeMS: 0,
        exhaustiveNbHits: true,
      };
    }
  }

  async searchSuggestions(query: string): Promise<string[]> {
    try {
      if (query.length < 2) return [];
      
      const response = await this.search({
        query,
        hitsPerPage: 5,
        attributesToRetrieve: ['title'],
      });

      return response.hits
        .map(hit => hit.title)
        .filter((title, index, arr) => arr.indexOf(title) === index)
        .slice(0, 5);
    } catch (error) {
      console.error('Algolia suggestions error:', error);
      return [];
    }
  }

  async searchWithFacets(
    query: string,
    selectedFacets: Record<string, string[]> = {}
  ): Promise<AlgoliaSearchResponse> {
    const facetFilters: string[][] = [];
    
    Object.entries(selectedFacets).forEach(([facet, values]) => {
      if (values.length > 0) {
        facetFilters.push(values.map(value => `${facet}:${value}`));
      }
    });

    return this.search({
      query,
      facetFilters,
      attributesToRetrieve: [
        'title',
        'description',
        'url',
        'type',
        'category',
        'keywords',
        'image'
      ],
    });
  }

  // Analytics tracking
  trackSearch(query: string, resultCount: number) {
    console.log('Search tracked:', { query, resultCount, timestamp: new Date() });
  }

  trackClick(objectID: string, position: number, query: string) {
    console.log('Click tracked:', { objectID, position, query, timestamp: new Date() });
  }
}

export const algoliaSearchService = new AlgoliaSearchService();
export default algoliaSearchService;