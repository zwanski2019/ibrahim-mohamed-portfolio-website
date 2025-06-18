
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useCommunity, Post } from '@/hooks/useCommunity';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Eye, 
  Calendar,
  Hash,
  Pin,
  MoreHorizontal,
  Play
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EnhancedPostCardProps {
  post: Post;
  onCommentClick?: () => void;
}

export const EnhancedPostCard: React.FC<EnhancedPostCardProps> = ({ post, onCommentClick }) => {
  const { user } = useAuth();
  const { togglePostLike } = useCommunity();
  const [isLiked, setIsLiked] = useState(false); // TODO: Check if user has liked this post
  const [likeCount, setLikeCount] = useState(post.like_count);

  const handleLike = async () => {
    if (!user) return;
    
    const success = await togglePostLike(post.id);
    if (success) {
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    }
  };

  const renderMediaContent = () => {
    if (post.image_urls && post.image_urls.length > 0) {
      return (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {post.image_urls.slice(0, 4).map((url, index) => (
            <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <img 
                src={url} 
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {post.image_urls.length > 4 && index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                  +{post.image_urls.length - 4} more
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (post.video_url) {
      return (
        <div className="mt-3 relative aspect-video bg-muted rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <Play className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            Video Content
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar_url || ''} />
              <AvatarFallback>
                {post.author.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author.full_name}</span>
                {post.is_pinned && (
                  <Pin className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div 
                  className="flex items-center gap-1"
                  style={{ color: post.channel.color }}
                >
                  {post.channel.icon && <span>{post.channel.icon}</span>}
                  <span>{post.channel.name}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {post.title && (
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
        )}
        
        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>

        {renderMediaContent()}

        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onCommentClick}
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comment_count}</span>
            </Button>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{post.view_count}</span>
            </div>
          </div>

          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
