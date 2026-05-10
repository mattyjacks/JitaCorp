'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Profile } from '@/lib/types'
import type { User } from '@supabase/supabase-js'

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
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
        .select('*')
        .eq('id', userData.user.id)
        .single()

      if (profileData) {
        setProfile(profileData as Profile)
        setDisplayName(profileData.display_name || '')
        setBio(profileData.bio || '')
      }
      setLoading(false)
    }

    fetchData()
  }, [router])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          bio: bio,
        })
        .eq('id', user.id)

      if (error) throw error
      setMessage('Profile updated successfully!')
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-text-light">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-navy mb-12">Settings</h1>

        <div className="bg-white p-8 rounded-xl border border-border mb-8">
          <h2 className="text-2xl font-bold text-navy mb-6">Profile Information</h2>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.startsWith('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-gray-50 text-text-light"
              />
              <p className="text-xs text-text-light mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Role</label>
              <input
                type="text"
                value={profile?.role || ''}
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-gray-50 text-text-light capitalize"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-border">
          <h2 className="text-2xl font-bold text-navy mb-6">Account</h2>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
