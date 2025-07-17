import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { cn } from '@/lib/utils';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('relevance');
  
  const { 
    query, 
    setQuery, 
    results, 
    loading, 
    filterResults 
  } = useGlobalSearch();

  const initialQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery, query, setQuery]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setSearchParams({ q: newQuery });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      page: 'bg-primary/10 text-primary border-primary/20',
      blog: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
      job: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
      course: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
      tool: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20'
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground border-muted';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      page: 'Page',
      blog: 'Blog Post',
      job: 'Job',
      course: 'Course',
      tool: 'Tool'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeCounts = () => {
    const counts = results.reduce((acc, result) => {
      acc[result.type] = (acc[result.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return counts;
  };

  const typeCounts = getTypeCounts();

  const renderResultCard = (result: any, index: number) => (
    <Card 
      key={result.id} 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
      onClick={() => navigate(result.url)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">
                {result.title}
              </h3>
              <Badge className={cn("text-xs", getTypeColor(result.type))}>
                {getTypeLabel(result.type)}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3 line-clamp-2">
              {result.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <span className="truncate">{result.url}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderResultList = (result: any, index: number) => (
    <div 
      key={result.id}
      className="p-4 border-b last:border-b-0 cursor-pointer transition-colors hover:bg-muted/50"
      onClick={() => navigate(result.url)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-base line-clamp-1">
              {result.title}
            </h3>
            <Badge className={cn("text-xs", getTypeColor(result.type))}>
              {getTypeLabel(result.type)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {result.description}
          </p>
          <span className="text-xs text-primary truncate">{result.url}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Search Results</h1>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search anything..."
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Results Summary */}
          {query && (
            <div className="mt-4 text-muted-foreground">
              {loading ? (
                'Searching...'
              ) : (
                `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
              )}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </h3>
                  
                  {/* View Mode */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">View</label>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="flex-1"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="flex-1"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Sort by</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="type">Type</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Content Type</label>
                    <div className="space-y-2">
                      {Object.entries(typeCounts).map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between">
                          <Badge className={cn("text-xs", getTypeColor(type))}>
                            {getTypeLabel(type)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">All ({results.length})</TabsTrigger>
                  <TabsTrigger value="page">Pages ({typeCounts.page || 0})</TabsTrigger>
                  <TabsTrigger value="blog">Blog ({typeCounts.blog || 0})</TabsTrigger>
                  <TabsTrigger value="job">Jobs ({typeCounts.job || 0})</TabsTrigger>
                  <TabsTrigger value="course">Courses ({typeCounts.course || 0})</TabsTrigger>
                  <TabsTrigger value="tool">Tools ({typeCounts.tool || 0})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  {viewMode === 'grid' ? (
                    <div className="grid gap-6">
                      {results.map(renderResultCard)}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-0">
                        {results.map(renderResultList)}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {['page', 'blog', 'job', 'course', 'tool'].map(type => (
                  <TabsContent key={type} value={type} className="mt-6">
                    {(() => {
                      const filteredResults = filterResults(type);
                      if (filteredResults.length === 0) {
                        return (
                          <div className="text-center py-12 text-muted-foreground">
                            No {type} results found for "{query}"
                          </div>
                        );
                      }
                      
                      return viewMode === 'grid' ? (
                        <div className="grid gap-6">
                          {filteredResults.map(renderResultCard)}
                        </div>
                      ) : (
                        <Card>
                          <CardContent className="p-0">
                            {filteredResults.map(renderResultList)}
                          </CardContent>
                        </Card>
                      );
                    })()}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              Try searching with different keywords or check your spelling.
            </p>
            <Button onClick={() => handleSearch('')}>
              Clear search
            </Button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Searching...</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}