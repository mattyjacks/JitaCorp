'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { BlogPost, BlogComment } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData?.user || null)

      const { data: postData } = await supabase
        .from('blog_posts')
        .select('*, author:profiles(display_name, avatar_url)')
        .eq('slug', resolvedParams.slug)
        .eq('published', true)
        .single()

      if (postData) {
        setPost(postData as BlogPost)

        const { data: commentsData } = await supabase
          .from('blog_comments')
          .select('*, author:profiles(display_name, avatar_url)')
          .eq('post_id', postData.id)
          .eq('is_deleted', false)
          .order('created_at', { ascending: true })

        if (commentsData) {
          setComments(commentsData as BlogComment[])
        }
      }
      setLoading(false)
    }

    fetchData()
  }, [params])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !post || !commentText.trim()) return

    const { error } = await supabase
      .from('blog_comments')
      .insert({
        post_id: post.id,
        author_id: user.id,
        content: commentText,
      })

    if (!error) {
      setCommentText('')
      // Refetch comments
      const { data } = await supabase
        .from('blog_comments')
        .select('*, author:profiles(display_name, avatar_url)')
        .eq('post_id', post.id)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })

      if (data) {
        setComments(data as BlogComment[])
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-text-light">Loading...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-text-light mb-4">Post not found</p>
          <Link href="/blog" className="text-teal hover:text-teal-dark">Back to blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="text-teal hover:text-teal-dark mb-8 inline-block">← Back to blog</Link>

        <article className="bg-white rounded-xl p-8 border border-border mb-12">
          {post.featured_image_url && (
            <img src={post.featured_image_url} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />
          )}

          <h1 className="text-5xl font-bold text-navy mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <div>
              <p className="font-semibold text-text">{post.author?.display_name || 'Anonymous'}</p>
              <p className="text-sm text-text-light">{formatDate(post.published_at || post.created_at)}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-teal/10 text-teal text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Comments Section */}
        <section className="bg-white rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-navy mb-8">Comments ({comments.length})</h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8 pb-8 border-b border-border">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal"
                rows={4}
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-6 py-2 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition disabled:opacity-50"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <p className="text-text-light mb-8 pb-8 border-b border-border">
              <Link href="/login" className="text-teal hover:text-teal-dark">Sign in</Link> to comment
            </p>
          )}

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="pb-6 border-b border-border last:border-b-0">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-text">{comment.author?.display_name || 'Anonymous'}</p>
                    <p className="text-sm text-text-light mb-2">{formatDate(comment.created_at)}</p>
                    <p className="text-text">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
