'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { BlogPost } from '@/lib/types'
import { formatDate, truncate } from '@/lib/utils'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, author:profiles(display_name, avatar_url)')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (!error && data) {
        setPosts(data as BlogPost[])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-navy mb-4">Blog</h1>
          <p className="text-xl text-text-light">Insights, updates, and stories from JitaCorp</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-light">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light mb-4">No blog posts yet</p>
            <Link href="/" className="text-teal hover:text-teal-dark">Back to home</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition h-full">
                  {post.featured_image_url && (
                    <div className="w-full h-48 bg-gray-200 overflow-hidden">
                      <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-teal/10 text-teal text-sm font-semibold rounded-full mb-3">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-2xl font-bold text-navy mb-2 hover:text-teal transition">{post.title}</h2>
                    <p className="text-text-light mb-4 line-clamp-2">{post.excerpt || truncate(post.content, 150)}</p>
                    <div className="flex items-center justify-between text-sm text-text-light">
                      <span>{post.author?.display_name || 'Anonymous'}</span>
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
