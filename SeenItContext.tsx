import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

export type Category = 'Movies/TV' | 'YouTube' | 'Podcasts' | 'Discord'
export type Item = { id: string; title: string; meta?: string; status: 'seen'|'wishlist' }
export type User = { name: string }

type State = {
  user: User | null
  theme: 'light' | 'dark'
  screen: 'onboarding' | 'dashboard' | 'profile' | 'settings'
  items: Record<Category, Item[]>
}

type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_SCREEN'; payload: State['screen'] }
  | { type: 'ADD_ITEM'; payload: { category: Category; item: Item } }
  | { type: 'TOGGLE_ITEM'; payload: { category: Category; id: string } }
  | { type: 'REMOVE_ITEM'; payload: { category: Category; id: string } }
  | { type: 'RESET' }
  | { type: 'IMPORT'; payload: State }

const LS_KEY = 'seenit_state_v1'

const initialState: State = {
  user: null,
  theme: 'light',
  screen: 'onboarding',
  items: {
    'Movies/TV': [
      { id: 'dune2', title: 'Dune: Part Two', meta: '2024 • Sci‑fi', status: 'seen' },
      { id: 'bear3', title: 'The Bear S3', meta: '2025 • Series', status: 'wishlist' }
    ],
    'YouTube': [{ id: 'v1', title: 'Veritasium: Fusion Breakthrough', meta: 'Video', status: 'seen' }],
    'Podcasts': [{ id: 'p1', title: 'Lex Fridman #408', meta: 'Interview', status: 'wishlist' }],
    'Discord': [{ id: 'd1', title: 'Tip: Hidden gem list', meta: 'From #movies', status: 'seen' }],
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload }
    case 'SET_THEME': return { ...state, theme: action.payload }
    case 'SET_SCREEN': return { ...state, screen: action.payload }
    case 'ADD_ITEM': {
      const { category, item } = action.payload
      return { ...state, items: { ...state.items, [category]: [item, ...state.items[category]] } }
    }
    case 'TOGGLE_ITEM': {
      const { category, id } = action.payload
      return {
        ...state,
        items: {
          ...state.items,
          [category]: state.items[category].map(it => it.id === id ? { ...it, status: it.status === 'seen' ? 'wishlist' : 'seen' } : it)
        }
      }
    }
    case 'REMOVE_ITEM': {
      const { category, id } = action.payload
      return { ...state, items: { ...state.items, [category]: state.items[category].filter(it => it.id !== id) } }
    }
    case 'RESET': return initialState
    case 'IMPORT': return action.payload
    default: return state
  }
}

const SeenItContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null)

export const SeenItProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return init
    try { return JSON.parse(raw) as State } catch { return init }
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
    if (state.theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <SeenItContext.Provider value={value}>{children}</SeenItContext.Provider>
}

export function useSeenIt() {
  const ctx = useContext(SeenItContext)
  if (!ctx) throw new Error('useSeenIt must be used within SeenItProvider')
  return ctx
}