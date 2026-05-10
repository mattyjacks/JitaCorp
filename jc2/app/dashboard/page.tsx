'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Profile } from '@/lib/types'
import type { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
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
        .select('*')
        .eq('id', userData.user.id)
        .single()

      if (profileData) {
        setProfile(profileData as Profile)
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

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-navy mb-2">Dashboard</h1>
          <p className="text-xl text-text-light">Welcome, {profile.display_name || user.email}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Link href="/dashboard/settings" className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-navy mb-2">Account Settings</h2>
            <p className="text-text-light">Manage your profile and preferences</p>
          </Link>

          {(profile.role === 'admin' || profile.role === 'editor') && (
            <Link href="/dashboard/blog" className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-navy mb-2">My Blog Posts</h2>
              <p className="text-text-light">Create and manage your articles</p>
            </Link>
          )}

          <Link href="/forum" className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-navy mb-2">Forum Activity</h2>
            <p className="text-text-light">Participate in community discussions</p>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl border border-border">
          <h2 className="text-2xl font-bold text-navy mb-6">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-light">Email</p>
              <p className="text-lg text-text font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-text-light">Display Name</p>
              <p className="text-lg text-text font-semibold">{profile.display_name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-text-light">Role</p>
              <p className="text-lg text-text font-semibold capitalize">{profile.role}</p>
            </div>
            <div>
              <p className="text-sm text-text-light">Member Since</p>
              <p className="text-lg text-text font-semibold">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <Link href="/dashboard/settings" className="mt-6 inline-block px-6 py-2 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
