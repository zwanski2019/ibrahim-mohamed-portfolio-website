
export interface ForumCategory {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  parent_id: string | null;
  icon: string | null;
  color: string;
  sort_order: number;
  is_active: boolean;
  thread_count: number;
  post_count: number;
  created_at: string;
  updated_at: string;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  slug: string;
  author_id: string;
  category_id: string;
  status: 'open' | 'closed' | 'locked' | 'archived';
  is_pinned: boolean;
  is_featured: boolean;
  tags: string[];
  view_count: number;
  reply_count: number;
  like_count: number;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  category?: ForumCategory;
}

export interface ForumReply {
  id: string;
  content: string;
  author_id: string;
  thread_id: string;
  parent_id: string | null;
  is_edited: boolean;
  edit_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  replies?: ForumReply[];
}

export interface ForumUserPreferences {
  id: string;
  user_id: string;
  forum_role: 'admin' | 'moderator' | 'trusted_user' | 'member';
  email_notifications: boolean;
  push_notifications: boolean;
  signature: string | null;
  created_at: string;
  updated_at: string;
}

export interface ThreadLike {
  id: string;
  user_id: string;
  thread_id: string;
  created_at: string;
}

export interface ReplyLike {
  id: string;
  user_id: string;
  reply_id: string;
  created_at: string;
}

export interface ThreadBookmark {
  id: string;
  user_id: string;
  thread_id: string;
  notes: string | null;
  created_at: string;
}
