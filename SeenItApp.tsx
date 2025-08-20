import React from 'react'
import { SeenItProvider, useSeenIt } from './contexts/SeenItContext'
import Nav from './Nav'
import Onboarding from './Onboarding'
import Dashboard from './Dashboard'
import Profile from './Profile'
import Settings from './Settings'

function RouterView() {
  const { state, dispatch } = useSeenIt()
  const navigate = (screen: typeof state.screen) => dispatch({ type: 'SET_SCREEN', payload: screen })

  return (
    <div>
      {state.screen !== 'onboarding' && <Nav onNavigate={navigate} />}
      {state.screen === 'onboarding' && <Onboarding />}
      {state.screen === 'dashboard' && <Dashboard />}
      {state.screen === 'profile' && <Profile />}
      {state.screen === 'settings' && <Settings />}
    </div>
  )
}

export default function SeenItApp() {
  return (
    <SeenItProvider>
      <div>
        <div className="bg-black text-white text-xs px-2 py-1 text-center">
          Build: {import.meta.env.VITE_BUILD_TAG}
        </div>
        <RouterView />
      </div>
    </SeenItProvider>
  )
}
