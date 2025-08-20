import React, { useState } from 'react'
import { useSeenIt, Category } from './contexts/SeenItContext'

export default function Onboarding() {
  const { state, dispatch } = useSeenIt()
  const [name, setName] = useState(state.user?.name ?? '')

  const start = () => {
    dispatch({ type: 'SET_USER', payload: { name: name || 'Guest' } })
    dispatch({ type: 'SET_SCREEN', payload: 'dashboard' })
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <img src="/brand/logo.svg" className="mx-auto h-16 w-16" />
        <h1 className="text-3xl font-bold">SeenIt?</h1>
        <p className="text-ink/70">Check before you recommend.</p>
      </div>

      <div className="card p-6 space-y-4">
        <label className="block text-sm font-medium">Your name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="input w-full" placeholder="Christoffer" />
        <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={start}>Get started</button>
          <button className="btn btn-ghost" onClick={()=>dispatch({ type: 'SET_SCREEN', payload: 'dashboard' })}>Skip</button>
        </div>
      </div>

      <div className="text-sm text-ink/60 text-center">
        No account needed for MVP. Your data is saved in this browser.
      </div>
    </main>
  )
}
