# Golf Edu

Golf education web app for beginners — covers swing fundamentals, rules & etiquette, equipment guides, glossary, drills, score tracking, and a learning path.

## Tech Stack

- **Framework:** React 19 + TypeScript 5.9
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Routing:** React Router DOM 7
- **State:** React Context (`UserContext`) + localStorage (`src/utils/storage.ts`)
- **PWA:** Service worker registered in `main.tsx`

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Type-check (`tsc -b`) then build for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## Project Structure

```
src/
├── assets/          # Static assets (SVGs, images)
├── components/      # Feature-grouped components
│   ├── checklist/   # Course prep checklist
│   ├── drills/      # Practice drills
│   ├── equipment/   # Club anatomy, bag diagrams
│   ├── glossary/    # Term cards, search, filters
│   ├── layout/      # Header, Sidebar, Layout shell
│   ├── onboarding/  # New user onboarding flow
│   ├── rules/       # Rules scenarios & quizzes
│   ├── scoring/     # Scorecard, round forms, stats
│   ├── swing/       # Swing phases, animation, comparison
│   └── ui/          # Shared UI primitives (Button, Card, Modal, Tabs, etc.)
├── context/         # React context providers
├── data/            # Static data (equipment, scenarios, swings, checklist)
├── hooks/           # Custom React hooks
├── pages/           # Route-level page components
├── types/           # TypeScript type definitions
└── utils/           # Utility functions (storage, etc.)
```

## Conventions

- UI primitives live in `src/components/ui/` and are barrel-exported from `index.ts`
- Feature components are grouped by domain (swing, scoring, rules, etc.)
- Pages are in `src/pages/` and map to routes defined in `src/router.tsx`
- Static/seed data goes in `src/data/`
- Types are centralized in `src/types/index.ts`
