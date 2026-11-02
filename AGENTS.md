<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook client

Next.js 16 App Router frontend for a book-lending app. Books and borrows live in a sibling Express + MongoDB API; this repo renders them and owns auth. No test runner, CI, or formatter.

## Commands

- `npm run dev` — Next 16/Turbopack dev server. Re-adds the managed block above and regenerates `.next` route types.
- `npm run build` — typechecks but does **not** lint. It logs `DYNAMIC_SERVER_USAGE` for `/` and `/books` because both fetch with `cache: "no-store"`; the errors are caught and the build still succeeds.
- `npm run lint` — plain `eslint` (Next 16 removed `next lint`). Baseline is **1 error + 4 warnings**: `react-hooks/set-state-in-effect` in generated `src/components/ui/carousel.tsx`, plus unused variables in `add-book/page.tsx`, `login/page.tsx` (2), and `register/page.tsx`. Don't chase these, and don't hand-edit `src/components/ui/*`.
- `npx tsc --noEmit` — clean **only after** `npx next typegen` (or `npm run dev`). A `.next` produced before the `/all-books` → `/books` rename errors in `.next/types/validator.ts` about missing `src/app/all-books/*`.
- Verification order: `npm run lint` → `npx next typegen` → `npx tsc --noEmit` (there are no tests).

## Routes

- Real routes: `/`, `/books`, `/books/[id]`, `/add-book`, `/my-books`, `/my-borrows`, `/login`, `/register`; `/add-books` just redirects to `/add-book`.
- Stale links still in the code — don't copy them: `/all-books` (`NewArrivals` "See All Books", `/my-borrows` empty state), `/all-books/[id]` (`MyBookCard`), `/profile` (Navbar menu). None of those routes exist.
- `/` server-fetches `/all-books` with `cache: "no-store"`, sorts by `_id` descending, and renders the first 6 in `NewArrivals`.
- `/books` is a server component that fetches with `cache: "no-store"` and passes data to `AllBooksCard`; search, category filter, and pagination (6 per page) are client-side.
- `/books/[id]` is a server component: it checks the session itself and redirects to `/login`, then fetches the book with a bearer token. A null response for an unknown id crashes at `books.image`.
- `/add-book`, `/my-books`, and `/my-borrows` are client components. Covers must be JPG/PNG ≤3MB and are sent as base64 data URLs (server JSON limit is 5MB). Per-user lists are filtered by the session email in the browser, not by the server.

## API and auth (the part that trips agents)

- Sibling repo `../book-nook-server`; start with `node index.js` (its package.json has no dev/start script). Port 5000, same `book-nook` MongoDB database, own `.env` with `MONGODB_URI`.
- `http://localhost:5000` is hard-coded in `src/app/page.tsx`, `src/app/books/page.tsx`, `src/app/books/[id]/page.tsx`, `src/app/add-book/page.tsx`, `src/app/my-books/page.tsx`, `src/app/my-borrows/page.tsx`, `src/components/borrowBook/BorrowBooks.tsx`, and `src/components/my-books/EditBookDialog.tsx`. There is no env var; changing hosts means editing all eight.
- Only `POST /add-book` and `GET /book/:id` are protected. The server's `verifyToken` fetches JWKS from `http://localhost:3000/api/auth/jwks` — this Next server — so the client must be reachable on port 3000 or those calls return 401. It only checks the signature; the `email` in the query/body is still trusted.
- Get a JWT with `authClient.token()` in client components or `auth.api.getToken({ headers: await headers() })` in server components, then send `Authorization: Bearer <token>`. This depends on the `jwt()` plugin in `src/lib/auth.ts`; don't remove it.
- All other endpoints (`/all-books`, `/my-books`, `/my-borrow`, `/my-borrows`, `PUT`/`DELETE /book/:id`) take `email` from the query/body with no auth check.
- `POST /my-borrow` snapshots the book plus `email`/`bookId`, returns 409 if already borrowed, decrements `totalCopies`, and returns `remainingCopies`. `DELETE /my-borrows/:id` deletes the record and increments copies back. `PATCH /book/:id` exists but no client code calls it.
- `totalCopies` means *available* copies, not total owned. Shapes are in `src/types/book.ts`.
- Endpoints: `GET /all-books`, `GET /book/:id` (protected, null for unknown id), `POST /add-book` (protected), `GET /my-books?email=`, `PUT /book/:id?email=` (owner edit), `DELETE /book/:id?email=` (owner delete), `GET /my-borrow?email=&bookId=`, `GET /my-borrows?email=`, `DELETE /my-borrows/:id`.
- Auth is better-auth, not NextAuth: Mongo adapter, email/password, Google, `jwt()` plugin, 7-day JWT cookie cache, DB `book-nook`; mounted by `src/app/api/auth/[...all]/route.ts` via `toNextJsHandler(auth)`.
- Use `authClient.*` from `src/lib/auth-client.ts`. Its named `signIn`/`signUp`/`useSession` re-exports come from a second bare `createAuthClient()` — avoid them.
- `authClient` reads `process.env.BETTER_AUTH_UR` (typo), so `baseURL` is undefined and it falls back to same-origin.
- Env keys: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` in gitignored `.env`. Google login needs valid OAuth creds and the `/api/auth/callback/google` redirect.
- `src/proxy.ts` is Next 16's middleware rename, but its matcher is still `"/all-books/:path"` — that route no longer exists, so the proxy never runs. `/books/[id]` protects itself; `/my-books` and `/my-borrows` only hide content client-side. Editing `proxy.ts` does nothing until the matcher is updated.

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
