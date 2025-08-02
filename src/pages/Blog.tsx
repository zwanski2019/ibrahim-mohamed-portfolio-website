import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { BlogCard } from '@/components/blog/BlogCard';
import { useBlogger } from '@/hooks/useBlogger';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Blog() {
  const { posts, loading, error, searchPosts, loadMore, refreshPosts, hasMore } = useBlogger();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      await searchPosts(searchQuery);
    } catch (err) {
      toast.error('Failed to search posts');
    } finally {
      setIsSearching(false);
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshPosts();
      toast.success('Blog posts refreshed');
    } catch (err) {
      toast.error('Failed to refresh posts');
    }
  };

  return (
    <BlogLayout>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Zwanski Tech Blog
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest insights, tutorials, and technology trends from our experts
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="blog-search" className="sr-only">
                  Search blog posts
                </Label>
                <Input
                  id="blog-search"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </form>
            
            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <Card className="mb-8 border-destructive">
              <CardContent className="flex items-center gap-3 p-6">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                  <h3 className="font-medium text-destructive">Failed to load blog posts</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
                <Button variant="outline" onClick={handleRefresh} className="ml-auto">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {loading && posts.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-96">
                  <div className="h-48 bg-muted animate-pulse rounded-t-lg" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Blog Posts Grid */}
          {posts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center">
                  <Button 
                    onClick={loadMore} 
                    disabled={loading}
                    variant="outline"
                    size="lg"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    Load More Posts
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && !error && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try adjusting your search terms.' : 'Check back later for new content.'}
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    refreshPosts();
                  }}>
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </main>

        <Footer />
      </div>
    </BlogLayout>
  );
}