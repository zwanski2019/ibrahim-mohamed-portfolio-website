
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PostReactionsProps {
  postId: string;
  onReactionChange?: () => void;
}

interface Reaction {
  type: string;
  emoji: string;
  label: string;
}

const REACTIONS: Reaction[] = [
  { type: 'like', emoji: '👍', label: 'Like' },
  { type: 'love', emoji: '❤️', label: 'Love' },
  { type: 'laugh', emoji: '😂', label: 'Laugh' },
  { type: 'wow', emoji: '😮', label: 'Wow' },
  { type: 'sad', emoji: '😢', label: 'Sad' },
  { type: 'angry', emoji: '😠', label: 'Angry' },
];

export const PostReactions: React.FC<PostReactionsProps> = ({ postId, onReactionChange }) => {
  const { user } = useAuth();
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReactions();
    if (user) {
      fetchUserReaction();
    }
  }, [postId, user]);

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('post_reactions')
        .select('reaction_type')
        .eq('post_id', postId);

      if (error) throw error;

      const reactionCounts: Record<string, number> = {};
      data?.forEach((reaction) => {
        reactionCounts[reaction.reaction_type] = (reactionCounts[reaction.reaction_type] || 0) + 1;
      });

      setReactions(reactionCounts);
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  const fetchUserReaction = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('post_reactions')
        .select('reaction_type')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      setUserReaction(data?.reaction_type || null);
    } catch (error) {
      console.error('Error fetching user reaction:', error);
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!user) {
      toast.error('Please sign in to react to posts');
      return;
    }

    setLoading(true);

    try {
      if (userReaction === reactionType) {
        // Remove reaction
        const { error } = await supabase
          .from('post_reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .eq('reaction_type', reactionType);

        if (error) throw error;
        
        setUserReaction(null);
        setReactions(prev => ({
          ...prev,
          [reactionType]: Math.max((prev[reactionType] || 0) - 1, 0)
        }));
      } else {
        // Add or update reaction
        const { error } = await supabase
          .from('post_reactions')
          .upsert({
            post_id: postId,
            user_id: user.id,
            reaction_type: reactionType
          });

        if (error) throw error;

        // Update counts
        setReactions(prev => {
          const newReactions = { ...prev };
          
          // Decrease old reaction count
          if (userReaction) {
            newReactions[userReaction] = Math.max((newReactions[userReaction] || 0) - 1, 0);
          }
          
          // Increase new reaction count
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          
          return newReactions;
        });

        setUserReaction(reactionType);
      }

      onReactionChange?.();
    } catch (error) {
      console.error('Error handling reaction:', error);
      toast.error('Failed to update reaction');
    } finally {
      setLoading(false);
    }
  };

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 hover:bg-accent"
            disabled={loading}
          >
            {userReaction ? (
              <>
                <span>{REACTIONS.find(r => r.type === userReaction)?.emoji}</span>
                <span>{reactions[userReaction] || 0}</span>
              </>
            ) : (
              <>
                <span>👍</span>
                <span>{totalReactions}</span>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="flex gap-1">
            {REACTIONS.map((reaction) => (
              <Button
                key={reaction.type}
                variant="ghost"
                size="sm"
                className={`text-xl hover:scale-110 transition-transform ${
                  userReaction === reaction.type ? 'bg-accent' : ''
                }`}
                onClick={() => handleReaction(reaction.type)}
                disabled={loading}
                title={reaction.label}
              >
                {reaction.emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Show reaction breakdown if there are reactions */}
      {totalReactions > 0 && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {Object.entries(reactions)
            .filter(([_, count]) => count > 0)
            .map(([type, count]) => (
              <div key={type} className="flex items-center gap-1">
                <span>{REACTIONS.find(r => r.type === type)?.emoji}</span>
                <span>{count}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
