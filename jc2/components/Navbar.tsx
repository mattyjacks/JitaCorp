'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    getUser()

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className={`text-xl font-bold ${scrolled ? 'text-navy' : 'text-white'}`}>
          Jita<span className="text-teal">Corp</span>
        </Link>

        <ul className={`flex gap-8 ${scrolled ? 'text-slate' : 'text-white/80'}`}>
          <li><Link href="/blog" className="hover:text-teal transition">Blog</Link></li>
          <li><Link href="/forum" className="hover:text-teal transition">Forum</Link></li>
          <li><Link href="/investors" className="hover:text-teal transition">Investors</Link></li>
          <li><Link href="/contact" className="hover:text-teal transition">Contact</Link></li>
        </ul>

        <div className="flex gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 text-sm font-semibold rounded-lg bg-teal text-white hover:bg-teal-dark transition">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold rounded-lg border border-teal text-teal hover:bg-teal/10 transition">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 text-sm font-semibold rounded-lg bg-teal text-white hover:bg-teal-dark transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
