# Operator Portfolio — React

A game-profile-style software engineering portfolio, built with React + Vite.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

Deploys as a static site anywhere (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.) — the build output lands in `dist/`.

## Customizing content

**Everything you'd want to edit lives in `src/data/profile.js`.** Name, stats,
skill tree, quests (projects), achievements, connected realms, about copy,
and contact links are all plain data objects/arrays there — you shouldn't
need to touch component code just to update content.

To restyle colors, fonts, or spacing, edit the CSS variables at the top of
`src/index.css` (`:root { --bg, --accent, --display, ... }`).

## Folder structure

```
portfolio-react/
├── index.html                  # HTML shell, loads Google Fonts
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Section routing + explorer-achievement logic
│   ├── index.css               # Design tokens + all component styles
│   │
│   ├── data/
│   │   └── profile.js          # ← EDIT THIS to customize all content
│   │
│   ├── components/
│   │   ├── Boot.jsx            # Terminal boot-sequence intro overlay
│   │   ├── Sidebar.jsx         # Left nav shell (brand + rank card + nav)
│   │   ├── RankCard.jsx        # Hexagonal level/XP badge
│   │   ├── Nav.jsx             # Section nav buttons
│   │   ├── Toast.jsx           # "Achievement unlocked" toast
│   │   │
│   │   ├── sections/           # One component per profile "screen"
│   │   │   ├── CharacterSection.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── SkillTreeSection.jsx
│   │   │   ├── QuestLogSection.jsx
│   │   │   ├── AchievementsSection.jsx
│   │   │   ├── RealmsSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   └── ContactSection.jsx
│   │   │
│   │   └── ui/                 # Small reusable pieces used by sections
│   │       ├── StatCard.jsx
│   │       ├── Bar.jsx
│   │       ├── Branch.jsx      # Skill tree branch/column
│   │       ├── Quest.jsx       # Expandable quest-log card
│   │       ├── Achievement.jsx
│   │       ├── RealmCard.jsx
│   │       └── FormattedText.jsx  # Renders **bold** markers from data
```

## Notes

- No routing library — section switching is local state in `App.jsx`
  (`active` + `onNavigate`). If you want real URLs per section (e.g.
  `/quests`), swap this for `react-router` — the section components are
  already isolated and would drop straight into routes.
- No external UI/animation libraries — everything is plain CSS
  (transitions, keyframes) to keep the bundle small and the design fully
  in your control.
- `prefers-reduced-motion` is respected globally.
- To wire the "Connected Realms" cards to real GitHub/Steam/Riot APIs later,
  that's a good candidate for a small `useEffect` + fetch inside
  `RealmsSection.jsx`, replacing the static `stat` values from `profile.js`
  with live data.
