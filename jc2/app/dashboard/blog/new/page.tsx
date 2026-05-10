'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import RichTextEditor from '@/components/RichTextEditor'
import type { User } from '@supabase/supabase-js'

export default function NewBlogPostPage() {
  const [user, setUser] = useState<User | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) {
        router.push('/login')
        return
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userData.user.id)
        .single()

      if (!profileData || !['admin', 'editor'].includes(profileData.role)) {
        router.push('/dashboard')
        return
      }

      setUser(userData.user)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim() || !content.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          category,
          tags: tags.split(',').map(t => t.trim()).filter(t => t),
        }),
      })

      if (response.ok) {
        router.push('/dashboard/blog')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create post')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
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

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-navy mb-12">Create New Post</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="Brief summary of the post"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Content *</label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                placeholder="e.g., News, Updates"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                placeholder="Comma-separated tags"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border border-border text-text font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
