'use client'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './providers'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const session = useContext(AuthContext)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!session) return

    fetchBookmarks()

    const channel = supabase
      .channel('realtime bookmarks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        () => fetchBookmarks()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const addBookmark = async () => {
    if (!url || !title) return

    await supabase.from('bookmarks').insert([
      {
        url,
        title,
        user_id: session?.user.id
      }
    ])

    setUrl('')
    setTitle('')
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  if (!session)
    return (
      <div className="flex h-screen items-center justify-center">
        <button
          onClick={login}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Login with Google
        </button>
      </div>
    )

  return (
  <div className="min-h-screen bg-gray-100 flex justify-center py-10">
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Bookmarks
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Add Bookmark Form */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter title..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter URL..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={addBookmark}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Bookmark List */}
      <div className="space-y-3">
        {bookmarks.map((bm) => (
          <div
            key={bm.id}
            className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <a
              href={bm.url}
              target="_blank"
              className="text-blue-600 font-medium hover:underline"
            >
              {bm.title}
            </a>

            <button
              onClick={() => deleteBookmark(bm.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
)
}