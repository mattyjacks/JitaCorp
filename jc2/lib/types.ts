export type UserRole = 'admin' | 'editor' | 'moderator' | 'user'

export interface Profile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  role: UserRole
  is_banned: boolean
  banned_reason: string | null
  banned_until: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  author_id: string
  featured_image_url: string | null
  category: string | null
  tags: string[]
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  author?: Profile
  comment_count?: number
}

export interface BlogComment {
  id: string
  post_id: string
  author_id: string
  content: string
  parent_comment_id: string | null
  is_deleted: boolean
  deleted_at: string | null
  created_at: string
  updated_at: string
  author?: Profile
  replies?: BlogComment[]
}

export interface ForumCategory {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  display_order: number
  created_at: string
  thread_count?: number
  last_activity?: string
}

export interface ForumThread {
  id: string
  category_id: string
  title: string
  slug: string
  content: string
  author_id: string
  is_pinned: boolean
  is_locked: boolean
  is_deleted: boolean
  deleted_at: string | null
  deleted_by: string | null
  deletion_reason: string | null
  reply_count: number
  view_count: number
  last_reply_at: string | null
  created_at: string
  updated_at: string
  author?: Profile
  likes?: number
  dislikes?: number
  user_vote?: 'like' | 'dislike' | null
}

export interface ForumReply {
  id: string
  thread_id: string
  author_id: string
  content: string
  parent_reply_id: string | null
  is_deleted: boolean
  deleted_at: string | null
  deleted_by: string | null
  deletion_reason: string | null
  created_at: string
  updated_at: string
  author?: Profile
  likes?: number
  dislikes?: number
  user_vote?: 'like' | 'dislike' | null
  replies?: ForumReply[]
}

export interface ForumReport {
  id: string
  reported_by: string
  thread_id: string | null
  reply_id: string | null
  reason: string
  description: string | null
  status: 'open' | 'investigating' | 'resolved' | 'dismissed'
  resolved_by: string | null
  resolved_at: string | null
  resolution_notes: string | null
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  ip_address: string | null
  user_agent: string | null
  status: 'new' | 'read' | 'responded'
  created_at: string
}
