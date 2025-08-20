
# SeenIt? — Full MVP (React + TypeScript + Tailwind)

A complete MVP for SeenIt? with:
- Context state (user, theme, items, navigation)
- Screens: Onboarding, Dashboard, Profile, Settings
- Categories: Movies/TV, YouTube, Podcasts, Discord
- Tip-Check (✅/❌) with simple suggestions
- Light/Dark theme toggle
- LocalStorage persistence

## Run locally
```bash
npm i
npm run dev
```

## Deploy (Vercel)
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

## Replace branding
- Put your final SVG in `public/brand/logo.svg`
- Update OG image at `public/brand/og-default.png`

## Next steps
- Supabase auth + DB
- TMDB/YouTube/ListenNotes integrations
- Shareable public profiles via slug (e.g. /u/christo)
