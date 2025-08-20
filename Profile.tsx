import React, { useState } from 'react'
import { useSeenIt, Category } from './contexts/SeenItContext'
import MediaCard from './MediaCard'

export default function Profile() {
  const { state } = useSeenIt()
  const [tab, setTab] = useState<Category>('Movies/TV')
  const items = state.items[tab]

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Public Profile</h1>
        <div className="text-ink/60">Share this page with friends to avoid duplicate tips.</div>
      </header>

      <div className="tabs">
        {(['Movies/TV', 'YouTube', 'Podcasts', 'Discord'] as Category[]).map(t => (
          <button key={t} onClick={()=>setTab(t)} className={tab===t?'tab tab-active':'tab'}>{t}</button>
        ))}
      </div>

      <section className="grid gap-3">
        {items.map(it => (
          <MediaCard key={it.id} item={it} onToggle={()=>{}} onRemove={()=>{}} />
        ))}
        {items.length === 0 && <div className="text-ink/60">No items yet.</div>}
      </section>
    </main>
  )
}
