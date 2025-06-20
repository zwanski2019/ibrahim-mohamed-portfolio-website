
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Eye, Pin } from 'lucide-react';
import { ForumThread } from '@/types/forum';
import { formatDistanceToNow } from 'date-fns';
import { useToggleThreadLike } from '@/hooks/useForum';
import { useAuth } from '@/hooks/useAuth';

interface ForumThreadCardProps {
  thread: ForumThread;
}

export const ForumThreadCard = ({ thread }: ForumThreadCardProps) => {
  const { user } = useAuth();
  const toggleLike = useToggleThreadLike();

  const handleLike = () => {
    if (!user) return;
    toggleLike.mutate(thread.id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={thread.author?.avatar_url || ''} />
            <AvatarFallback>{thread.author?.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {thread.is_pinned && (
                    <Pin className="h-4 w-4 text-primary" />
                  )}
                  <Link 
                    to={`/forum/thread/${thread.slug}`}
                    className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
                  >
                    {thread.title}
                  </Link>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>by {thread.author?.full_name}</span>
                  <span>•</span>
                  <span>in {thread.category?.name}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}</span>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {thread.content}
                </p>
                
                {thread.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {thread.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{thread.view_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{thread.reply_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{thread.like_count}</span>
                </div>
              </div>
              
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  disabled={toggleLike.isPending}
                  className="flex items-center gap-1"
                >
                  <Heart className="h-4 w-4" />
                  Like
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
