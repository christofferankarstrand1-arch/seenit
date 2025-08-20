import React from 'react'

export type Item = {
  id: string;
  title: string;
  meta?: string;
  status: 'seen' | 'wishlist';
  year?: string;
  kind?: string;
  poster?: string;
  rating?: string;
  imdbID?: string;
}

type Props = { item: Item; onToggle: () => void; onRemove: () => void }

export default function MediaCard({ item, onToggle, onRemove }: Props) {
  return (
    <div className="card p-4 flex items-center justify-between gap-4">
      <div>
        <div className="font-semibold">{item.title}</div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink/60">
          {item.meta && <span>{item.meta}</span>}
          {item.rating && <span>⭐ {item.rating}</span>}
          {item.imdbID ? (
            <a
              href={`https://www.imdb.com/title/${item.imdbID}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline opacity-80 hover:opacity-100"
              aria-label="Open on IMDb"
              title="Open on IMDb"
            >
              IMDb
            </a>
          ) : (
            <a
              href={`https://www.imdb.com/find/?q=${encodeURIComponent(item.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline opacity-60 hover:opacity-100"
              aria-label="Search on IMDb"
              title="Search on IMDb"
            >
              IMDb
            </a>
          )}
        </div>
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