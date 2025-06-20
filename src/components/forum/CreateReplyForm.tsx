
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReply } from '@/hooks/useForum';

interface CreateReplyFormProps {
  threadId: string;
  parentId?: string;
  onCancel?: () => void;
  placeholder?: string;
}

export const CreateReplyForm = ({ threadId, parentId, onCancel, placeholder = "Write your reply..." }: CreateReplyFormProps) => {
  const [content, setContent] = useState('');
  const createReply = useCreateReply();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    createReply.mutate(
      { content: content.trim(), threadId, parentId },
      {
        onSuccess: () => {
          setContent('');
          if (onCancel) onCancel();
        },
      }
    );
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={4}
            required
          />
          <div className="flex gap-2">
            <Button type="submit" disabled={createReply.isPending || !content.trim()}>
              {createReply.isPending ? 'Posting...' : 'Post Reply'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
