
import { useParams } from 'react-router-dom';
import { ForumHeader } from '@/components/forum/ForumHeader';
import { ForumThreadCard } from '@/components/forum/ForumThreadCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useForumCategories, useForumThreads } from '@/hooks/useForum';

export default function ForumCategory() {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories } = useForumCategories();
  const category = categories?.find(cat => cat.slug === slug);
  const { data: threads, isLoading: threadsLoading } = useForumThreads(category?.id);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
              <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />
      
      <div className="container mx-auto py-8">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div 
                className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-3xl"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                {category.icon}
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{category.name}</CardTitle>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    {category.thread_count} threads
                  </Badge>
                  <Badge variant="secondary">
                    {category.post_count} posts
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            {threadsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : threads && threads.length > 0 ? (
              <div className="space-y-4">
                {threads.map((thread) => (
                  <ForumThreadCard key={thread.id} thread={thread} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No discussions yet in this category.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
