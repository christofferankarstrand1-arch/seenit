// /contexts/SeenItContext.tsx
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
      { id: 'dune2', title: 'Dune: Part Two', meta: '2024 • Sci-fi', status: 'seen' },
      { id: 'bear3', title: 'The Bear S3', meta: '2025 • Series', status: 'wishlist' }
    ],
    'YouTube': [{ id: 'v1', title: 'Veritasium: Fusion Breakthrough', meta: 'Video', status: 'seen' }],
    'Podcasts': [{ id: 'p1', title: 'Lex Fridman #408', meta: 'Interview', status: 'wishlist' }],
    'Discord': []
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
          [category]: state.items[category].map(i => i.id === id ? { ...i, status: i.status === 'seen' ? 'wishlist' : 'seen' } : i)
        }
      }
    }
    case 'REMOVE_ITEM': {
      const { category, id } = action.payload
      return { ...state, items: { ...state.items, [category]: state.items[category].filter(i => i.id !== id) } }
    }
    case 'RESET': return initialState
    case 'IMPORT': return action.payload
    default: return state
  }
}

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({} as any)

export function SeenItProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) dispatch({ type: 'IMPORT', payload: JSON.parse(raw) as State })
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)) } catch {}
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSeenIt() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSeenIt must be used within SeenItProvider')
  return ctx
}
