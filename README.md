# 🎬 SeenIt?

**SeenIt?** är en zero-friction webapp för att hålla koll på vilka filmer, serier, YouTube-videos och poddar du sett – och göra det enkelt för vänner och familj att tipsa dig om nytt innehåll utan att riskera att du redan sett det.

🚀 Live demo (Vercel): _kommer efter du deployat_

---

## ✨ Funktioner

- ✅ Skapa en personlig profil  
- ✅ Lägg till media (filmer, serier, YouTube, poddar, Discord-tips)  
- ✅ Markera som *Seen* eller *Wishlist*  
- ✅ TipCheck – se direkt om din vän redan sett det du tänkt tipsa om  
- ✅ Light/Dark mode toggle  
- ✅ Allt sparas i **localStorage** (inga konton krävs i MVP)  

---

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/) för styling  
- Context API + LocalStorage för state management  
- Förberett för **Supabase** (auth & database) och API-integrationer (TMDB, YouTube, ListenNotes)

---

## 🏗️ Kom igång lokalt

```bash
# Klona repot
git clone https://github.com/<ditt-användarnamn>/seenit.git
cd seenit

# Installera dependencies
npm install

# Starta dev-server
npm run dev

☁️ Deploy på Vercel

Klicka på knappen ovan

Koppla ditt GitHub-konto

Framework preset: Vite

Build command: npm run build

Output directory: dist

🔮 Roadmap

 Riktig autentisering via Supabase

 TMDB-integration för film/serier (autocomplete)

 YouTube- & podcast-API

 Delbara profiler (/u/[username])

 Gamification (badges, streaks, “top tips”)

👨‍🎤 Idé & koncept: Christoffer Ankarstrand
christoffer.ankarstrand1@gmail.com

💻 MVP utvecklad med AI-stöd (ChatGPT)
