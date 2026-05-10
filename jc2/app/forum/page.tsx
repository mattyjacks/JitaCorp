'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { ForumCategory } from '@/lib/types'

export default function ForumPage() {
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('display_order', { ascending: true })

      if (!error && data) {
        setCategories(data as ForumCategory[])
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-navy mb-4">Forum</h1>
          <p className="text-xl text-text-light">Join the conversation with our community</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-light">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light">No categories available yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/forum/${category.slug}`}>
                <div className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-navy hover:text-teal transition">{category.name}</h2>
                      {category.description && (
                        <p className="text-text-light mt-2">{category.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal">{category.thread_count || 0}</p>
                      <p className="text-sm text-text-light">threads</p>
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
