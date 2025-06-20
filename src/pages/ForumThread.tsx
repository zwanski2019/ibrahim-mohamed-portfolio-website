
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ForumHeader } from '@/components/forum/ForumHeader';
import { ForumReplyCard } from '@/components/forum/ForumReplyCard';
import { CreateReplyForm } from '@/components/forum/CreateReplyForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, MessageCircle, Eye, Bookmark } from 'lucide-react';
import { useForumThread, useForumReplies, useToggleThreadLike } from '@/hooks/useForum';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

export default function ForumThread() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { data: thread, isLoading: threadLoading } = useForumThread(slug!);
  const { data: replies, isLoading: repliesLoading } = useForumReplies(thread?.id || '');
  const toggleLike = useToggleThreadLike();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleLike = () => {
    if (!user || !thread) return;
    toggleLike.mutate(thread.id);
  };

  if (threadLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto py-8">
          <Skeleton className="h-64 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Thread Not Found</h1>
              <p className="text-muted-foreground">The discussion you're looking for doesn't exist.</p>
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
        {/* Thread Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarImage src={thread.author?.avatar_url || ''} />
                <AvatarFallback>{thread.author?.full_name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold mb-2">{thread.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>by {thread.author?.full_name}</span>
                  <span>•</span>
                  <span>in {thread.category?.name}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}</span>
                </div>
                
                {thread.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {thread.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none mb-6">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {thread.content}
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{thread.view_count} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{thread.reply_count} replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{thread.like_count} likes</span>
                </div>
              </div>
              
              {user && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    disabled={toggleLike.isPending}
                    className="flex items-center gap-1"
                  >
                    <Heart className="h-4 w-4" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Create Reply Form */}
        {user && (
          <CreateReplyForm 
            threadId={thread.id} 
            placeholder="Join the discussion..."
          />
        )}

        {/* Replies */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              {thread.reply_count} {thread.reply_count === 1 ? 'Reply' : 'Replies'}
            </h2>
          </CardHeader>
          <CardContent>
            {repliesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
            ) : replies && replies.length > 0 ? (
              <div className="space-y-0">
                {replies.map((reply) => (
                  <div key={reply.id}>
                    <ForumReplyCard 
                      reply={reply} 
                      onReply={(replyId) => setReplyingTo(replyId)}
                    />
                    {replyingTo === reply.id && (
                      <div className="ml-12 mb-4">
                        <CreateReplyForm
                          threadId={thread.id}
                          parentId={reply.id}
                          onCancel={() => setReplyingTo(null)}
                          placeholder={`Reply to ${reply.author?.full_name}...`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No replies yet. Be the first to join the discussion!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
