import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { thread_id, reply_id, vote_type } = await request.json()

    if (thread_id) {
      const { data: existing } = await supabase
        .from('forum_thread_votes')
        .select()
        .eq('thread_id', thread_id)
        .eq('user_id', user.id)
        .single()

      if (existing) {
        if (existing.vote_type === vote_type) {
          await supabase
            .from('forum_thread_votes')
            .delete()
            .eq('id', existing.id)
        } else {
          await supabase
            .from('forum_thread_votes')
            .update({ vote_type })
            .eq('id', existing.id)
        }
      } else {
        await supabase
          .from('forum_thread_votes')
          .insert({
            thread_id,
            user_id: user.id,
            vote_type,
          })
      }
    } else if (reply_id) {
      const { data: existing } = await supabase
        .from('forum_reply_votes')
        .select()
        .eq('reply_id', reply_id)
        .eq('user_id', user.id)
        .single()

      if (existing) {
        if (existing.vote_type === vote_type) {
          await supabase
            .from('forum_reply_votes')
            .delete()
            .eq('id', existing.id)
        } else {
          await supabase
            .from('forum_reply_votes')
            .update({ vote_type })
            .eq('id', existing.id)
        }
      } else {
        await supabase
          .from('forum_reply_votes')
          .insert({
            reply_id,
            user_id: user.id,
            vote_type,
          })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
