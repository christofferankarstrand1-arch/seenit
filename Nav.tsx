import React from 'react'

type Props = { onNavigate: (screen: 'onboarding'|'dashboard'|'profile'|'settings') => void }

export default function Nav({ onNavigate }: Props) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-ink/10">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <button onClick={()=>onNavigate('dashboard')} className="flex items-center gap-2 font-semibold">
          <img src="/brand/logo.svg" alt="SeenIt?" className="h-7 w-7" />
          <span>SeenIt?</span>
        </button>
        <nav className="flex items-center gap-3">
          <button className="btn btn-ghost" onClick={()=>onNavigate('profile')}>Profile</button>
          <button className="btn btn-ghost" onClick={()=>onNavigate('settings')}>Settings</button>
          <a className="btn btn-primary" href="#share">Share</a>
        </nav>
      </div>
    </header>
  )
}