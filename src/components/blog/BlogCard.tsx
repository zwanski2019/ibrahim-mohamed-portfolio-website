import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ExternalLink, User } from 'lucide-react';
import { BlogPost, bloggerApi } from '@/services/bloggerApi';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post.images?.[0]?.url || bloggerApi.extractImageFromContent(post.content);
  const excerpt = bloggerApi.createExcerpt(post.content, 150);
  const publishedDate = new Date(post.published);

  const handleReadMore = () => {
    window.open(post.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      {featuredImage && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <User className="h-4 w-4" />
          <span>{post.author.displayName}</span>
          <span>•</span>
          <CalendarDays className="h-4 w-4" />
          <span>{formatDistanceToNow(publishedDate, { addSuffix: true })}</span>
        </div>
        
        <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
          {excerpt}
        </p>
        
        {post.labels && post.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.labels.slice(0, 3).map((label) => (
              <Badge key={label} variant="secondary" className="text-xs">
                {label}
              </Badge>
            ))}
            {post.labels.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.labels.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <Button 
          onClick={handleReadMore}
          className="w-full mt-auto"
          variant="default"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}