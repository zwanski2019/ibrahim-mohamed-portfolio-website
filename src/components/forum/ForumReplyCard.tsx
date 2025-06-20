
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Reply } from 'lucide-react';
import { ForumReply } from '@/types/forum';
import { formatDistanceToNow } from 'date-fns';
import { useToggleReplyLike } from '@/hooks/useForum';
import { useAuth } from '@/hooks/useAuth';

interface ForumReplyCardProps {
  reply: ForumReply;
  onReply?: (replyId: string) => void;
}

export const ForumReplyCard = ({ reply, onReply }: ForumReplyCardProps) => {
  const { user } = useAuth();
  const toggleLike = useToggleReplyLike();

  const handleLike = () => {
    if (!user) return;
    toggleLike.mutate(reply.id);
  };

  const handleReply = () => {
    if (onReply) {
      onReply(reply.id);
    }
  };

  return (
    <Card className="ml-0 mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={reply.author?.avatar_url || ''} />
            <AvatarFallback>{reply.author?.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{reply.author?.full_name}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
              </span>
              {reply.is_edited && (
                <span className="text-xs text-muted-foreground">(edited)</span>
              )}
            </div>
            
            <div className="prose prose-sm max-w-none mb-3">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {reply.content}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    disabled={toggleLike.isPending}
                    className="flex items-center gap-1 text-xs"
                  >
                    <Heart className="h-3 w-3" />
                    {reply.like_count > 0 && <span>{reply.like_count}</span>}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReply}
                    className="flex items-center gap-1 text-xs"
                  >
                    <Reply className="h-3 w-3" />
                    Reply
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
