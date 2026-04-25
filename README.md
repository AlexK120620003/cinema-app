# Cinema App

A movie browsing application built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Browse movies, filter by genre, sort, search, and save your favorites — all with local storage persistence.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **clsx** — conditional class names
- **use-debounce** — debounced search input

## Features

- Browse a movie catalog with poster, rating, genre, and year
- Filter movies by genre
- Sort movies by title, rating, or year
- Live search with debounce
- Add / remove movies from favorites (persisted in `localStorage`)
- Responsive layout with a collapsible sidebar
- Hero banner on the home page
- Loading and error boundary pages

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cinema-app/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout (font, theme, sidebar)
│   ├── page.tsx                 # Home page (hero banner + movie list)
│   ├── loading.tsx              # Global loading UI
│   ├── error.tsx                # Global error boundary
│   ├── globals.css              # Global styles & Tailwind imports
│   ├── favorites/
│   │   └── page.tsx             # Favorites page
│   ├── movies/
│   │   ├── page.tsx             # All movies page
│   │   └── [id]/
│   │       └── page.tsx         # Movie detail page
│   └── hooks/
│       ├── useLocalStorage.ts   # Generic localStorage hook
│       └── useTheme.ts          # Dark/light theme hook
├── components/
│   ├── HeroBanner.tsx           # Hero section on home page
│   ├── MoviesList.tsx           # Grid of movie cards
│   ├── MoviesCard.tsx           # Single movie card
│   ├── MoviesPage.tsx           # Movies page shell (filter + list)
│   ├── GenreFilter.tsx          # Genre filter buttons
│   ├── SortSelector.tsx         # Sort dropdown
│   ├── SearchBar.tsx            # Search input
│   ├── SearchOverlay.tsx        # Full-screen search overlay
│   ├── LoadMore.tsx             # Load-more button
│   ├── FavoriteButton.tsx       # Add/remove from favorites
│   └── Sidebar.tsx              # Navigation sidebar
├── Data/
│   └── films.ts                 # Static movie data
├── types/
│   └── types.ts                 # Shared TypeScript types
├── public/                      # Static assets
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Scripts

| Command        | Description                  |
|----------------|------------------------------|
| `pnpm dev`     | Start development server     |
| `pnpm build`   | Build for production         |
| `pnpm start`   | Start production server      |
| `pnpm lint`    | Run ESLint                   |
