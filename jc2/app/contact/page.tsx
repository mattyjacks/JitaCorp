'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-navy mb-4">Contact Us</h1>
        <p className="text-xl text-text-light mb-12">We'd love to hear from you. Send us a message!</p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            <p className="text-green-800 font-semibold">Thank you for your message!</p>
            <p className="text-green-700 mt-2">We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border">
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 text-red-800">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-navy mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-navy mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-navy mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-navy mb-2">Message</label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
