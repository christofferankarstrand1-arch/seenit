import React, { useState } from 'react'
import { useSeenIt, Category, Item } from './contexts/SeenItContext'
import MediaCard from './MediaCard'
import TipCheck from './TipCheck'

function uid() { return Math.random().toString(36).slice(2) }

export default function Dashboard() {
  const { state, dispatch } = useSeenIt()
  const [tab, setTab] = useState<Category>('Movies/TV')
  const [newTitle, setNewTitle] = useState('')
  const [newMeta, setNewMeta] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const items = state.items[tab]

  const add = async () => {
    if (!newTitle.trim()) return
    setIsAdding(true)
    try {
      const base: Item = { id: uid(), title: newTitle.trim(), meta: newMeta || undefined, status: 'wishlist' }
      let enriched: Partial<Item> = {}
      try {
        const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(newTitle.trim())}&apikey=${import.meta.env.VITE_OMDB_KEY}`)
        const data = await res.json()
        enriched = {
          year: data?.Year,
          kind: data?.Type,
          poster: data?.Poster && data.Poster !== 'N/A' ? data.Poster : undefined,
          rating: data?.imdbRating && data.imdbRating !== 'N/A' ? data.imdbRating : undefined,
          imdbID: data?.imdbID && data.imdbID !== 'N/A' ? data.imdbID : undefined,
        }
      } catch {}
      const item = { ...base, ...enriched }
      dispatch({ type: 'ADD_ITEM', payload: { category: tab, item } })
      setNewTitle(''); setNewMeta('')
    } finally {
      setIsAdding(false)
    }
  }

  const lookup = (q: string) => {
    const hay = Object.values(state.items).flat().map(i => i.title.toLowerCase())
    return hay.includes(q.trim().toLowerCase()) ? 'seen' : 'unseen'
  }

  const suggest = (q: string) => {
    const universe = ['Oppenheimer','Everything Everywhere All at Once','Poor Things','The Zone of Interest','Severance','Arcane','Foundation','Hard Fork','Huberman Lab','MrBeast video','Kurzgesagt','Veritasium']
    return universe.filter(x => x.toLowerCase().includes(q.toLowerCase()))
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-ink/60">Welcome{state.user ? `, ${state.user.name}` : ''}</div>
        </div>
      </header>

      <div className="tabs">
        {(['Movies/TV', 'YouTube', 'Podcasts', 'Discord'] as Category[]).map(t => (
          <button key={t} onClick={()=>setTab(t)} className={tab===t?'tab tab-active':'tab'}>{t}</button>
        ))}
      </div>

      <section className="card p-4">
        <div className="flex flex-col md:flex-row gap-2">
          <input className="input flex-1" value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder={`Add to ${tab}...`} />
          <input className="input flex-1" value={newMeta} onChange={e=>setNewMeta(e.target.value)} placeholder="(Optional) year / notes" />
          <div className="flex items-center">
            <button
              className="btn btn-primary"
              onClick={add}
              disabled={isAdding}
              aria-busy={isAdding}
            >
              {isAdding ? 'Adding…' : 'Add'}
            </button>
            {isAdding && <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent align-[-2px]" />}
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        {items.map(it => (
          <MediaCard key={it.id} item={it}
            onToggle={()=>dispatch({ type:'TOGGLE_ITEM', payload: { category: tab, id: it.id } })}
            onRemove={()=>dispatch({ type:'REMOVE_ITEM', payload: { category: tab, id: it.id } })}
          />
        ))}
        {items.length === 0 && <div className="text-ink/60">No items yet.</div>}
      </section>

      <TipCheck lookup={lookup} suggestions={suggest} />
    </main>
  )
}
