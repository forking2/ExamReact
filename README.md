# ExamReact
React.ts site based on TMDb(The Movie Database)
# my-app

A React application for tracking movies and TV series, with user accounts and personal favorites synced to the cloud.

## Features

- Authentication — Username-based login/registration powered by Supabase Auth (usernames are resolved to emails server-side before sign-in)
- Favorites — Save movies and series to your account; favorites are stored in Supabase (`public.film` table) rather than local storage, so they sync across devices
- TMDB Integration — Movie/series metadata, posters, and details fetched from The Movie Database (TMDB) API
- Internationalization — Full support for English and Ukrainian via `react-i18next`
- Responsive UI — Built with TailwindCSS, includes theme support (light/dark)
- Protected Routes — Unauthenticated users are redirected to `/login` when accessing gated pages
- Efficient Data Fetching — TanStack Query handles caching, background refetching, and hydration of favorite IDs with full TMDB details

## Tech Stack

| Layer | Technology |
|---|---|
| Build tool | Vite |
| Language | TypeScript |
| Styling | TailwindCSS |
| Routing | react-router |
| Server state | TanStack Query |
| Client state | Zustand |
| Forms & validation | react-hook-form + Zod |
| i18n | react-i18next |
| Auth & Database | Supabase (Auth + PostgreSQL) |
| External API | TMDB (The Movie Database) |

## Architecture Notes

- **Auth flow**: Since Supabase Auth requires an email to sign in, but the app uses usernames, login first looks up the corresponding email in `public.users`, then calls Supabase's `signInWithPassword`.
- **Favorites storage**: Favorite films/series are persisted in the `public.film` table in Supabase, scoped per-user via Row Level Security (`auth.uid() = user_id`).
- **Favorites hydration**: The Favorites page fetches the user's saved TMDB IDs from Supabase, then uses `useQueries` to fetch full details for each from the TMDB API in parallel.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A Supabase project (URL + anon key)
- A TMDB API key

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

>  Make sure `VITE_SUPABASE_URL` is just the base project URL (e.g. `https://xxxx.supabase.co`) — **do not** append `/rest/v1/`, as Supabase client libraries add this automatically.

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Supabase Setup

1. **`public.users` table** — stores usernames mapped to auth emails. Ensure the `password` column (if present) is nullable, since Supabase Auth manages passwords itself.
2. **`public.film` table** — stores user favorites, with a `type` column (`"movie"` or `"series"`), scoped by `user_id`.
3. **Row Level Security** — enable RLS on `public.film` with a policy restricting access to `auth.uid() = user_id`.
4. **Email confirmation** — consider disabling email confirmation in the Supabase dashboard during development to avoid sign-up rate-limit (429) errors.

## Project Structure (high-level)

```
src/
├── components/
│   ├── FavoriteButton/     # Heart icon toggle, supports overlay & solid backgrounds
│   └── UserMenu/           # Sidebar auth state display
├── pages/
│   ├── Login/
│   ├── Register/
│   └── Favorites/
├── routes/
│   └── ProtectedRoute.tsx  # Redirects unauthenticated users to /login
├── services/
│   └── AuthService.ts      # Supabase auth wrapper (username → email lookup)
├── locales/
│   ├── en/
│   └── uk/
└── ...
```

## Known Gotchas

- **Supabase user shape**: `GET /auth/v1/user` returns the user object directly on `response.data` — not `response.data.user`.
- **Missing translations**: If raw i18n keys render instead of text, check that the corresponding `auth.*` (or other) keys exist in the locale JSON files.

## License

_Add your license here._
