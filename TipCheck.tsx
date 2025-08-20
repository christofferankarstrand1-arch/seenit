import React, { useState } from 'react'

type Props = { lookup: (q: string) => 'seen' | 'unseen'; suggestions?: (q: string)=>string[] }

export default function TipCheck({ lookup, suggestions }: Props) {
  const [q, setQ] = useState('')
  const [res, setRes] = useState<null | 'seen' | 'unseen'>(null)
  const sugg = suggestions ? suggestions(q) : []

  return (
    <section className="card p-6">
      <h2 className="text-xl font-semibold mb-2">Tip-Check</h2>
      <p className="text-sm text-ink/60 mb-4">Paste a title or link to check if it&apos;s new.</p>
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Movie, video, or podcast..." className="input flex-1"/>
        <button className="btn btn-primary" onClick={()=>setRes(lookup(q))}>Check</button>
      </div>
      {res && (
        <div className="mt-4 text-lg">
          {res === 'unseen' ? '✅ Not seen — great tip!' : '❌ Already seen'}
        </div>
      )}
      {res === 'seen' && sugg.length > 0 && (
        <div className="mt-3 text-sm">
          <div className="mb-1 text-ink/70">Alternatives you might like:</div>
          <ul className="list-disc ml-5">{sugg.slice(0,3).map((s,i)=>(<li key={i}>{s}</li>))}</ul>
        </div>
      )}
    </section>
  )
}