import React from 'react'

export type Item = {
  id: string;
  title: string;
  meta?: string;
  status: 'seen' | 'wishlist';
  year?: string;
  type?: string;
  poster?: string;
  rating?: string;
  imdbID?: string;
}

type Props = { item: Item; onToggle: () => void; onRemove: () => void }

export default function MediaCard({ item, onToggle, onRemove }: Props) {
  const info = [item.year, item.type, item.meta].filter(Boolean).join(' • ')
  const imdbUrl = item.imdbID
    ? `https://www.imdb.com/title/${item.imdbID}/`
    : `https://www.imdb.com/find/?q=${encodeURIComponent(item.title)}`

  return (
    <div className="rounded-xl shadow-md bg-white hover:shadow-lg flex flex-col overflow-hidden transition-shadow">
      {item.poster ? (
        <img
          src={item.poster}
          alt={`${item.title} poster`}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-ink/5 text-4xl font-bold">
          {item.title.charAt(0)}
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="font-semibold">{item.title}</div>
        <div className="mt-1 text-sm text-ink/60">{info}</div>
        <div className="mt-2 flex items-center gap-2 text-sm text-ink/60">
          {item.rating && <span>⭐ {item.rating}</span>}
          <a
            href={imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={item.imdbID ? 'underline opacity-80 hover:opacity-100' : 'underline opacity-60 hover:opacity-100'}
            aria-label={item.imdbID ? 'Open on IMDb' : 'Search on IMDb'}
            title={item.imdbID ? 'Open on IMDb' : 'Search on IMDb'}
          >
            IMDb
          </a>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2">
          <button className="btn btn-ghost" onClick={onToggle}>
            {item.status === 'seen' ? '✔️ Seen' : '➕ Wishlist'}
          </button>
          <button className="btn btn-ghost" onClick={onRemove}>🗑️</button>
        </div>
      </div>
    </div>
  )
}
