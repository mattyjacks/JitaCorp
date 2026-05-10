'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

export default function BlogDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) {
        router.push('/login')
        return
      }

      setUser(userData.user)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userData.user.id)
        .single()

      if (!profileData || !['admin', 'editor'].includes(profileData.role)) {
        router.push('/dashboard')
        return
      }

      const { data: postsData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('author_id', userData.user.id)
        .order('created_at', { ascending: false })

      if (postsData) {
        setPosts(postsData as BlogPost[])
      }
      setLoading(false)
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-text-light">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-bold text-navy">My Blog Posts</h1>
          <Link href="/dashboard/blog/new" className="px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition">
            New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light mb-4">You haven't written any blog posts yet</p>
            <Link href="/dashboard/blog/new" className="text-teal hover:text-teal-dark font-semibold">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-navy mb-2">{post.title}</h2>
                    <p className="text-text-light mb-4">{post.excerpt || post.content.substring(0, 150)}</p>
                    <div className="flex items-center gap-4 text-sm text-text-light">
                      <span>{formatDate(post.created_at)}</span>
                      <span className={`px-3 py-1 rounded-full ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/blog/${post.slug}`} className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition text-sm">
                      View
                    </Link>
                    <Link href={`/dashboard/blog/${post.id}/edit`} className="px-4 py-2 bg-gray-200 text-text rounded-lg hover:bg-gray-300 transition text-sm">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
