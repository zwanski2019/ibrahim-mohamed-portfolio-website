
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Hash, User, Filter, X } from 'lucide-react';
import { useCommunity } from '@/hooks/useCommunity';

interface CommunitySearchProps {
  onResultsChange?: (results: any[]) => void;
}

export const CommunitySearch: React.FC<CommunitySearchProps> = ({ onResultsChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'posts' | 'users' | 'channels'>('posts');
  const [filters, setFilters] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { fetchPosts, channels } = useCommunity();

  const popularTags = ['webdev', 'react', 'javascript', 'tutorial', 'beginners', 'career'];
  const trendingTopics = ['AI/ML', 'Web3', 'Mobile Dev', 'DevOps', 'Design'];

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      setResults([]);
      onResultsChange?.([]);
    }
  }, [searchQuery, searchType, filters]);

  const performSearch = async () => {
    setLoading(true);
    
    try {
      if (searchType === 'posts') {
        const posts = await fetchPosts(undefined, searchQuery);
        setResults(posts || []);
        onResultsChange?.(posts || []);
      } else if (searchType === 'channels') {
        const filteredChannels = channels.filter(channel =>
          channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          channel.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredChannels);
        onResultsChange?.(filteredChannels);
      }
      // TODO: Implement user search when user search API is available
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters(prev => [...prev, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAll = () => {
    setSearchQuery('');
    setFilters([]);
    setResults([]);
    onResultsChange?.([]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, users, or channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={clearAll}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={searchType} onValueChange={(value) => setSearchType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
            </TabsList>
          </Tabs>

          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {filters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Hash className="h-4 w-4" />
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-1">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => addFilter(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Trending Topics</h4>
              <div className="flex flex-wrap gap-1">
                {trendingTopics.map((topic) => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => addFilter(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Searching...</p>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({results.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.slice(0, 10).map((result, index) => (
                <div key={index} className="border-b border-border pb-3 last:border-b-0">
                  {searchType === 'posts' && (
                    <div>
                      <h4 className="font-medium">{result.title || 'Untitled Post'}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {result.content}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>by {result.author?.full_name}</span>
                        <span>•</span>
                        <span>in {result.channel?.name}</span>
                      </div>
                    </div>
                  )}
                  
                  {searchType === 'channels' && (
                    <div className="flex items-center gap-3">
                      {result.icon && <span className="text-xl">{result.icon}</span>}
                      <div>
                        <h4 className="font-medium">{result.name}</h4>
                        <p className="text-sm text-muted-foreground">{result.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {result.member_count} members • {result.post_count} posts
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
