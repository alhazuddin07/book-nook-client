<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook client

Next.js 16 App Router frontend for a book-lending app. Books and borrows live in a sibling Express + MongoDB API; this repo renders them and owns auth. No test runner, CI, or formatter.

## Commands

- `npm run dev` — Next 16/Turbopack dev server. Rewrites the managed block above and regenerates `.next` route types.
- `npm run build` / `npm start` — the build typechecks but does **not** lint.
- `npm run lint` — plain `eslint` (Next 16 removed `next lint`). Baseline is **1 error + 3 warnings**: `react-hooks/set-state-in-effect` in generated `src/components/ui/carousel.tsx` and unused Popover imports in `Navbar.tsx`. Don't chase these, and don't hand-edit `src/components/ui/*`.
- `npx tsc --noEmit` — currently clean. On a fresh clone run `npx next typegen` first; `LayoutProps`/`PageProps` globals come from generated `.next` types.
- Building with the API down logs `DYNAMIC_SERVER_USAGE` for `/` and `/all-books`; expected because both routes are dynamic.

## Backend dependency

- Sibling repo `../book-nook-server`; start with `node index.js` (its package.json has no dev/start script). Port 5000, same `book-nook` MongoDB database, own `.env` with `MONGODB_URI`.
- `http://localhost:5000` is hard-coded in `src/app/all-books/page.tsx`, `src/app/all-books/[id]/page.tsx`, `src/app/add-book/page.tsx`, `src/app/my-books/page.tsx`, `src/app/my-borrows/page.tsx`, and `src/components/borrowBook/BorrowBooks.tsx`. No env var; changing hosts means editing all six.
- Endpoints: `GET /all-books`, `GET /book/:id` (null for unknown id), `POST /add-book`, `GET /my-books?email=`, `PUT /book/:id?email=` (owner edit), `DELETE /book/:id?email=` (owner delete), `GET /my-borrow?email=&bookId=`, `GET /my-borrows?email=`, `DELETE /my-borrows/:id`.
- Borrowing is `POST /my-borrow` with a snapshot of the book plus `email`/`bookId`; it returns 409 if already borrowed, decrements `totalCopies`, and returns `remainingCopies`. Returning (`DELETE`) increments copies back. `PATCH /book/:id` exists but no client code calls it.
- `totalCopies` means *available* copies. Books are attributed by the client-sent `userEmail`; edit/delete filter by that email, but `/add-book` and the borrow routes trust the client. Shapes are in `src/types/book.ts`.

## Auth (better-auth, not NextAuth)

- `src/lib/auth.ts`: MongoDB adapter, email/password, DB `book-nook`; mounted by `src/app/api/auth/[...all]/route.ts`.
- Use `authClient.*` from `src/lib/auth-client.ts`. The named `signIn`/`signUp`/`useSession` exports come from a second `createAuthClient()` with no baseURL — avoid them.
- `authClient` reads `process.env.BETTER_AUTH_UR` (typo), so `baseURL` is undefined and falls back to same-origin. Don't assume it is configured for cross-origin auth.
- Env: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` in gitignored `.env`.
- Route protection: `src/proxy.ts` (Next 16 rename of middleware). Matcher `"/all-books/:path"` covers exactly one nested segment: `/all-books/<id>` is protected, `/all-books` itself and deeper paths are not. Unauthenticated hits redirect to `/login`. `/my-books` and `/my-borrows` have no route protection; they hide content client-side.

## Theming (light/dark)

- `src/app/globals.css` holds both palettes: `:root` (light) and `.dark` (purple-navy). App-specific tokens are `--surface`, `--surface-muted`, `--surface-raised`, `--surface-hover`, `--hairline`, `--ink`/`--ink-strong`/`--ink-soft`/`--ink-muted`, `--brand`/`--brand-strong`/`--brand-soft`/`--brand-ink`; they are registered in `@theme inline`, so use them as `bg-surface`, `text-ink-soft`, `border-hairline`, `text-brand`, etc.
- `src/app/layout.tsx` injects a blocking inline script that applies `localStorage.theme` (or `prefers-color-scheme` on a first visit) before paint and sets `color-scheme`; `<html>` carries `suppressHydrationWarning`.
- The moon/sun button is `src/components/theme/ThemeToggle.tsx`, rendered in the Navbar; it flips the `dark` class, writes `localStorage.theme`, and uses `useSyncExternalStore` (not `useEffect` + `setState`) to stay inside the `react-hooks/set-state-in-effect` rule.
- Component convention: keep the existing light classes and append `dark:` variants (e.g. `bg-white dark:bg-surface`). New UI needs both, or it will stay bright in dark mode.
- Turbopack dev can serve a stale CSS chunk after `globals.css` edits — if `.dark` values don't take effect, restart `npm run dev`.

## Framework quirks

- Next.js 16.4.3 / React 19.3: route `params` are Promises (`await params`); Turbopack is default, and `next.config.ts` registers `@tailwindcss/turbopack` as the CSS loader.
- React Compiler is on (`reactCompiler: true`), and lint enforces `react-hooks/set-state-in-effect`.
- Tailwind v4 is CSS-first: `src/app/globals.css` (`@import "tailwindcss"`, `tw-animate-css`, `shadcn/tailwind.css`, `@theme inline`). There is no `tailwind.config`.
- shadcn uses style `base-nova` on **Base UI** (`@base-ui/react`), not Radix: no `asChild`; use `render={<Link ... />}` with `nativeButton={false}`.
- `cn` is re-exported from the `cn` npm package in `src/lib/utils.ts`; import it from `@/lib/utils` or `cn`, not `clsx` + `tailwind-merge`.
- `next/image` allows any HTTPS host; `data:`/`blob:` sources are automatically unoptimized (uploaded covers are base64).

## Routes and data flow

- Root layout adds Navbar, Footer, and `Toaster`. Toasts: `import { toast } from "@/components/ui/toast"` then `toast.add({ type, title, description })`.
- `/` server-fetches `/all-books` with `cache: "no-store"`, sorts by `_id` descending (newest first), and passes the first 6 to `NewArrivals`; a freshly added book therefore leads the section.
- `/all-books` is a server component that fetches with `cache: "no-store"` and passes data to `AllBooksCard`; search, category filter, and pagination (6 per page) are client-side.
- `/all-books/[id]` fetches the book and renders `BorrowBooks`; it assumes a valid id (a null response crashes the page).
- `/add-book` is a client form; covers must be JPG/PNG ≤3MB and are sent as base64 data URLs (the server raises its JSON limit to 5MB). `/add-books` redirects to `/add-book`.
- `/my-books` and `/my-borrows` are client components that fetch by the session email; no server-side filtering.
- Known dead link: the Navbar dropdown points to `/profile`, which does not exist.
