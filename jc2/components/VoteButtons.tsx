'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface VoteButtonsProps {
  threadId?: string
  replyId?: string
  initialLikes?: number
  initialDislikes?: number
  user: User | null
}

export default function VoteButtons({
  threadId,
  replyId,
  initialLikes = 0,
  initialDislikes = 0,
  user,
}: VoteButtonsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null)
  const supabase = createClient()

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (!user) {
      alert('Please sign in to vote')
      return
    }

    try {
      const response = await fetch('/api/forum/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thread_id: threadId,
          reply_id: replyId,
          vote_type: voteType,
        }),
      })

      if (response.ok) {
        if (userVote === voteType) {
          setUserVote(null)
          if (voteType === 'like') setLikes(likes - 1)
          else setDislikes(dislikes - 1)
        } else {
          if (userVote === 'like') setLikes(likes - 1)
          if (userVote === 'dislike') setDislikes(dislikes - 1)
          setUserVote(voteType)
          if (voteType === 'like') setLikes(likes + 1)
          else setDislikes(dislikes + 1)
        }
      }
    } catch (error) {
      console.error('Vote error:', error)
    }
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleVote('like')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          userVote === 'like'
            ? 'bg-teal text-white'
            : 'bg-gray-100 text-text hover:bg-gray-200'
        }`}
      >
        👍 {likes}
      </button>
      <button
        onClick={() => handleVote('dislike')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          userVote === 'dislike'
            ? 'bg-red-500 text-white'
            : 'bg-gray-100 text-text hover:bg-gray-200'
        }`}
      >
        👎 {dislikes}
      </button>
    </div>
  )
}
