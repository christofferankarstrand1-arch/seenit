import React from 'react'
import { SeenItProvider, useSeenIt } from './SeenItContext'
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
      <RouterView />
    </SeenItProvider>
  )
}
