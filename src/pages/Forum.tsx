
import { ForumHeader } from '@/components/forum/ForumHeader';
import { ForumCategoryCard } from '@/components/forum/ForumCategoryCard';
import { ForumThreadCard } from '@/components/forum/ForumThreadCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useForumCategories, useForumThreads } from '@/hooks/useForum';

export default function Forum() {
  const { data: categories, isLoading: categoriesLoading } = useForumCategories();
  const { data: threads, isLoading: threadsLoading } = useForumThreads();
  const { data: featuredThreads, isLoading: featuredLoading } = useForumThreads(undefined, 5);

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />
      
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Zwanski Forum</h1>
          <p className="text-xl text-muted-foreground">
            Connect with fellow tech enthusiasts, share knowledge, and grow together.
          </p>
        </div>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="recent">Recent Discussions</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Categories</CardTitle>
              </CardHeader>
              <CardContent>
                {categoriesLoading ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-32" />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories?.map((category) => (
                      <ForumCategoryCard key={category.id} category={category} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                {threadsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-32" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {threads?.map((thread) => (
                      <ForumThreadCard key={thread.id} thread={thread} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                {featuredLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-32" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {featuredThreads?.filter(thread => thread.is_featured || thread.is_pinned).map((thread) => (
                      <ForumThreadCard key={thread.id} thread={thread} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
