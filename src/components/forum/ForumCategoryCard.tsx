
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ForumCategory } from '@/types/forum';
import { formatDistanceToNow } from 'date-fns';

interface ForumCategoryCardProps {
  category: ForumCategory;
}

export const ForumCategoryCard = ({ category }: ForumCategoryCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <Link 
          to={`/forum/category/${category.slug}`}
          className="flex items-start gap-3 group"
        >
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${category.color}20`, color: category.color }}
          >
            {category.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {category.description}
            </p>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{category.thread_count} threads</span>
            <span>{category.post_count} posts</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {formatDistanceToNow(new Date(category.updated_at), { addSuffix: true })}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
