import React from 'react'

export type Item = { id: string; title: string; meta?: string; status: 'seen'|'wishlist' }

type Props = { item: Item; onToggle: ()=>void; onRemove: ()=>void }

export default function MediaCard({ item, onToggle, onRemove }: Props) {
  return (
    <div className="card p-4 flex items-center justify-between gap-4">
      <div>
        <div className="font-semibold">{item.title}</div>
        {item.meta && <div className="text-sm text-ink/60">{item.meta}</div>}
      </div>
      <div className="flex items-center gap-2">
        <button className="btn btn-ghost" onClick={onToggle}>
          {item.status === 'seen' ? '✔️ Seen' : '➕ Wishlist'}
        </button>
        <button className="btn btn-ghost" onClick={onRemove}>🗑️</button>
      </div>
    </div>
  )
}