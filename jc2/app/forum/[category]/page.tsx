'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { ForumThread, ForumCategory } from '@/lib/types'
import { formatTimeAgo } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [category, setCategory] = useState<ForumCategory | null>(null)
  const [categorySlug, setCategorySlug] = useState<string>('')
  const [threads, setThreads] = useState<ForumThread[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params
      setCategorySlug(resolvedParams.category)
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData?.user || null)

      const { data: categoryData } = await supabase
        .from('forum_categories')
        .select('*')
        .eq('slug', resolvedParams.category)
        .single()

      if (categoryData) {
        setCategory(categoryData as ForumCategory)

        const { data: threadsData } = await supabase
          .from('forum_threads')
          .select('*, author:profiles(display_name, avatar_url)')
          .eq('category_id', categoryData.id)
          .eq('is_deleted', false)
          .order('is_pinned', { ascending: false })
          .order('last_reply_at', { ascending: false })

        if (threadsData) {
          setThreads(threadsData as ForumThread[])
        }
      }
      setLoading(false)
    }

    fetchData()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-text-light">Loading...</p>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-text-light mb-4">Category not found</p>
          <Link href="/forum" className="text-teal hover:text-teal-dark">Back to forum</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/forum" className="text-teal hover:text-teal-dark mb-8 inline-block">← Back to forum</Link>

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-navy mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-text-light">{category.description}</p>
          )}
        </div>

        {user && (
          <Link href={`/forum/${categorySlug}/new`} className="px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition mb-8 inline-block">
            New Thread
          </Link>
        )}

        {threads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light">No threads yet. Be the first to start a discussion!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {threads.map((thread) => (
              <Link key={thread.id} href={`/forum/${categorySlug}/${thread.id}`}>
                <div className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-navy hover:text-teal transition">{thread.title}</h2>
                      <p className="text-text-light mt-2">by {thread.author?.display_name || 'Anonymous'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-text-light">{thread.reply_count} replies</p>
                      <p className="text-sm text-text-light">{formatTimeAgo(thread.last_reply_at || thread.created_at)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
