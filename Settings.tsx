import React from 'react'
import { useSeenIt, Category } from './contexts/SeenItContext'

export default function Settings() {
  const { state, dispatch } = useSeenIt()

  const exportData = () => {
    const blob = new Blob([localStorage.getItem('seenit_state_v1') || '{}'], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'seenit_export.json'; a.click()
    URL.revokeObjectURL(url)
  }

  const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    try {
      const state = JSON.parse(text)
      localStorage.setItem('seenit_state_v1', JSON.stringify(state))
      location.reload()
    } catch {}
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <section className="card p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Theme</div>
            <div className="text-sm text-ink/60">Light or dark</div>
          </div>
          <button className="btn btn-ghost" onClick={()=>dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' })}>
            Toggle: {state.theme}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">User</div>
            <div className="text-sm text-ink/60">{state.user?.name || 'Guest'}</div>
          </div>
          <button className="btn btn-ghost" onClick={()=>dispatch({ type: 'SET_USER', payload: { name: prompt('Name?') || 'Guest' } })}>
            Edit name
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Export data</div>
            <div className="text-sm text-ink/60">Download your SeenIt? data as JSON</div>
          </div>
          <button className="btn btn-primary" onClick={exportData}>Export</button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Import data</div>
            <div className="text-sm text-ink/60">Upload a previously exported JSON file</div>
          </div>
          <label className="btn btn-ghost">
            Import
            <input type="file" accept="application/json" className="hidden" onChange={importData} />
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Reset</div>
            <div className="text-sm text-ink/60">Clear all local data</div>
          </div>
          <button className="btn btn-ghost" onClick={()=>{ localStorage.removeItem('seenit_state_v1'); location.reload() }}>Reset</button>
        </div>
      </section>
    </main>
  )
}
