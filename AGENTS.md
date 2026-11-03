<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook client

Next.js 16 App Router frontend for a book-lending app. Books and borrows live in a sibling Express + MongoDB API; this repo renders them and owns auth. No test runner, CI, or formatter. `README.md` describes a different API (`/books`, `/borrows`, `.env.local`) — trust the code and the sibling server, not the README.

## Commands

- `npm run dev` — Next 16/Turbopack dev server. Re-adds the managed block above and regenerates `.next` route types.
- `npm run build` — typechecks but does **not** lint. It succeeds even when the API is down (fetch errors are caught). `/` is **statically prerendered**, so its book list is fetched at build time; a missing or unreachable `NEXT_PUBLIC_API_URL` bakes an empty list into the build. `/books` reads `searchParams` (for `?category=`), so it renders on demand and refetches per request. Dev refetches per request.
- `npm run lint` — plain `eslint` (Next 16 removed `next lint`). Current baseline is **1 error + 11 warnings**: the error is `react-hooks/set-state-in-effect` in generated `src/components/ui/carousel.tsx`; the warnings are all `@typescript-eslint/no-unused-vars`. Don't chase these, and don't hand-edit `src/components/ui/*`.
- `npx tsc --noEmit` — clean **only after** `npx next typegen` (or `npm run dev` / `npm run build`), which generate `.next/types`. It is currently clean.
- Verification order: `npm run lint` → `npx next typegen` → `npx tsc --noEmit` (there are no tests).

## Routes

- Real routes: `/`, `/books`, `/books/[id]`, `/add-book`, `/my-books`, `/my-borrows`, `/profile`, `/login`, `/register`; `/add-books` just redirects to `/add-book`.
- Stale links still in the code — don't copy them: `/all-books` (`/my-borrows` empty state) and `/all-books/[id]` (`MyBookCard`). `NewArrivals` was fixed to `/books`.
- `/` server-fetches `/all-books`, sorts by `_id` descending, and renders the first 6 in `NewArrivals` (the section hides itself when the list is empty). It also renders `CategoryShowcase` between `NewArrivals` and `HomeInfoCards`; its 8 cards link to `/books?category=<value>` (Fantasy→`fantasy`, Historical→`history`, Business→`finance`, Thrillers→`thriller`). Humor/Politics/Thrillers have no seeded books and land on the empty state with a “View all books” link.
- `/books` is a server component that fetches and passes data to `AllBooksCard`; it reads `?category=` from `searchParams` and passes it as `initialCategory` (plus a `key` to remount the filters). Search, category filter, and pagination (6 per page) are client-side, and category matching is case-insensitive.
- `/books/[id]` is a server component: it checks the session itself and redirects to `/login`, then fetches the book with a bearer token. A null response for an unknown id crashes at `books.image`.
- `/profile` is a server component that reads `auth.api.getSession` but does **not** redirect itself — `src/proxy.ts` does. Its fallback avatar points at `public/placeholder-avatar.png`, which does not exist.
- `/add-book`, `/my-books`, and `/my-borrows` are client components. Covers must be JPG/PNG ≤3MB and are sent as base64 data URLs (server JSON limit is 5MB). `/my-books` and `/my-borrows` fetch with `?email=` **and** a bearer token.

## API and auth (the part that trips agents)

- Sibling repo `../book-nook-server`; start with `node index.js` (its package.json has no dev/start script; it is ESM). Port 5000, same `book-nook` MongoDB database, own `.env` with `MONGODB_URI` and `CLIENT_URL`.
- API base is `process.env.NEXT_PUBLIC_API_URL` from `.env` (currently `http://localhost:5000`), used in `src/app/page.tsx`, `books/page.tsx`, `books/[id]/page.tsx`, `add-book/page.tsx`, `my-books/page.tsx`, `my-borrows/page.tsx`, `components/borrowBook/BorrowBooks.tsx`, and `components/my-books/EditBookDialog.tsx`. There is no fallback: a missing var produces `undefined/...` URLs.
- Almost every server route now uses `verifyToken`: `POST /add-book`, `GET /book/:id`, `GET /my-books`, `GET|POST /my-borrow`, `GET /my-borrows`, `DELETE /my-borrows/:id`, and `PATCH|DELETE /book/:id`. Only `GET /all-books` (plus the `/` health check) is open.
- `verifyToken` fetches JWKS from `${CLIENT_URL}/api/auth/jwks` (server env; currently `http://localhost:3000`) — this Next server. The Next server must be reachable or protected calls return 401. It only checks the signature; the `email` in the query/body is still trusted.
- Get a JWT with `authClient.token()` in client components or `auth.api.getToken({ headers: await headers() })` in server components, then send `Authorization: Bearer <token>`. This depends on the `jwt()` plugin in `src/lib/auth.ts`; don't remove it.
- **Known bug:** `EditBookDialog` sends `PUT /book/:id?email=`, but the server only defines `PATCH` — editing a book always 404s. (The server also defines `PATCH /book/:id` twice; the first, owner-edit handler wins.)
- `POST /my-borrow` snapshots the book plus `email`/`bookId`, returns 409 if already borrowed, decrements `totalCopies`, and returns `remainingCopies`. `DELETE /my-borrows/:id` deletes the record and increments copies back.
- `totalCopies` means *available* copies, not total owned. Shapes are in `src/types/book.ts` (note `Borrow` carries both `image` and `imageUrl`).
- Auth is better-auth, not NextAuth: Mongo adapter, email/password, Google, `jwt()` plugin, 7-day JWT cookie cache, DB `book-nook`; mounted by `src/app/api/auth/[...all]/route.ts` via `toNextJsHandler(auth)`.
- Use `authClient.*` from `src/lib/auth-client.ts`. Its named `signIn`/`signUp`/`useSession` re-exports come from a second bare `createAuthClient()` — avoid them.
- `authClient` reads `process.env.BETTER_AUTH_UR` (typo), so `baseURL` is undefined and it falls back to same-origin. Don't "fix" it without updating the env key too.
- Env keys in gitignored `.env` (not `.env.local`): `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`. Google login needs valid OAuth creds and the `/api/auth/callback/google` redirect.
- `src/proxy.ts` is Next 16's middleware (exported as `proxy`; the build reports "Proxy (Middleware)"). It runs for `/my-books`, `/add-book`, `/my-borrows`, and `/profile`; the `"/all-books/:path"` matcher is stale and matches nothing. `/books/[id]` protects itself; `/my-books` and `/my-borrows` still hide content client-side too.

## Theming (light/dark)

- `src/app/globals.css` holds both palettes: `:root` (light) and `.dark` (purple-navy). App-specific tokens are `--surface`, `--surface-muted`, `--surface-raised`, `--surface-hover`, `--hairline`, `--ink`/`--ink-strong`/`--ink-soft`/`--ink-muted`, `--brand`/`--brand-strong`/`--brand-soft`/`--brand-ink`; they are registered in `@theme inline`, so use them as `bg-surface`, `text-ink-soft`, `border-hairline`, `text-brand`, etc.
- `src/app/layout.tsx` injects a blocking inline script that applies `localStorage.theme` (or `prefers-color-scheme` on a first visit) before paint and sets `color-scheme`; `<html>` carries `suppressHydrationWarning`.
- The moon/sun button is `src/components/theme/ThemeToggle.tsx`, rendered in the Navbar; it flips the `dark` class, writes `localStorage.theme`, and uses `useSyncExternalStore` (not `useEffect` + `setState`) to stay inside the `react-hooks/set-state-in-effect` rule.
- Component convention: keep the existing light classes and append `dark:` variants (e.g. `bg-white dark:bg-surface`). New UI needs both, or it will stay bright in dark mode. Some existing components (e.g. `MyBookCard`) still lack them.
- Turbopack dev can serve a stale CSS chunk after `globals.css` edits — if `.dark` values don't take effect, restart `npm run dev`.

## Framework quirks

- Next.js 16.4.3 / React 19.3: route `params` are Promises (`await params`); Turbopack is default, and `next.config.ts` registers `@tailwindcss/turbopack` as the `*.css` loader. `LayoutProps`/`PageProps` globals come from generated `.next` types.
- React Compiler is on (`reactCompiler: true`), and lint enforces `react-hooks/set-state-in-effect`.
- Tailwind v4 is CSS-first: `src/app/globals.css` (`@import "tailwindcss"`, `tw-animate-css`, `shadcn/tailwind.css`, `@theme inline`). There is no `tailwind.config`.
- shadcn uses style `base-nova` on **Base UI** (`@base-ui/react`), not Radix: no `asChild`; use `render={<Link ... />}` with `nativeButton={false}`.
- `cn` is re-exported from the `cn` npm package in `src/lib/utils.ts`; import it from `@/lib/utils` or `cn`, not `clsx` + `tailwind-merge`.
- `next/image` allows any HTTPS host; `data:`/`blob:` sources are automatically unoptimized (uploaded covers are base64).
- Root layout adds Navbar, Footer, and `Toaster`. Toasts: `import { toast } from "@/components/ui/toast"` then `toast.add({ type, title, description })`.
