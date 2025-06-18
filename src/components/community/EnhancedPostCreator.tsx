
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useCommunity } from '@/hooks/useCommunity';
import { Image, Video, Link as LinkIcon, Hash, X, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedPostCreatorProps {
  onPostCreated?: () => void;
}

export const EnhancedPostCreator: React.FC<EnhancedPostCreatorProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const { createPost, channels } = useCommunity();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    channel_id: '',
    post_type: 'text',
    image_urls: [] as string[],
    video_url: '',
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !postData.content.trim() || !postData.channel_id) return;

    setLoading(true);
    
    const result = await createPost({
      title: postData.title || undefined,
      content: postData.content,
      channel_id: postData.channel_id,
      image_urls: postData.image_urls,
      video_url: postData.video_url || undefined,
    });

    if (result) {
      setPostData({
        title: '',
        content: '',
        channel_id: '',
        post_type: 'text',
        image_urls: [],
        video_url: '',
        tags: [],
      });
      onPostCreated?.();
    }

    setLoading(false);
  };

  const addTag = () => {
    if (newTag.trim() && !postData.tags.includes(newTag.trim())) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setPostData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, url]
      }));
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to create posts</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select 
              value={postData.channel_id} 
              onValueChange={(value) => setPostData(prev => ({ ...prev, channel_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.map((channel) => (
                  <SelectItem key={channel.id} value={channel.id}>
                    <div className="flex items-center gap-2">
                      {channel.icon && <span>{channel.icon}</span>}
                      <span>{channel.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={postData.post_type} 
              onValueChange={(value) => setPostData(prev => ({ ...prev, post_type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Post type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Post</SelectItem>
                <SelectItem value="image">Image Post</SelectItem>
                <SelectItem value="video">Video Post</SelectItem>
                <SelectItem value="link">Link Post</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Post title (optional)"
            value={postData.title}
            onChange={(e) => setPostData(prev => ({ ...prev, title: e.target.value }))}
          />

          <Textarea
            placeholder="What's on your mind?"
            value={postData.content}
            onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            required
          />

          {postData.post_type === 'video' && (
            <Input
              placeholder="Video URL (YouTube, Vimeo, etc.)"
              value={postData.video_url}
              onChange={(e) => setPostData(prev => ({ ...prev, video_url: e.target.value }))}
            />
          )}

          {postData.image_urls.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Images:</p>
              <div className="flex flex-wrap gap-2">
                {postData.image_urls.map((url, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Image className="h-3 w-3" />
                    <span className="max-w-20 truncate">Image {index + 1}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setPostData(prev => ({
                        ...prev,
                        image_urls: prev.image_urls.filter((_, i) => i !== index)
                      }))}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {postData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {postData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={addImageUrl}>
                <Image className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </div>

            <Button type="submit" disabled={loading || !postData.content.trim() || !postData.channel_id}>
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
