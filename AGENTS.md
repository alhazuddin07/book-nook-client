<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook client

Next.js 16 App Router frontend for a book-lending app. Book and borrow data lives in a separate Express/MongoDB API; this repo only renders it and handles auth.

## Commands

- `npm run dev` — Next 16 dev server (Turbopack). Also rewrites the managed block above and regenerates `.next` route types.
- `npm run build` / `npm start`
- `npm run lint` — plain `eslint`. Next 16 removed `next lint`; `next build` does **not** lint.
- `npx tsc --noEmit` — typecheck (currently clean).
- No test runner or test script exists.

Lint baseline is not green: `npm run lint` exits 1 on `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx`, plus several unused-variable warnings. Don't chase pre-existing failures, and avoid hand-editing generated `src/components/ui/*` files.

`npm run build` succeeds. The `All books fetch error` log during page generation is expected when the API is down; `/all-books` is dynamic.

## Backend dependency

- API base `http://localhost:5000` is hard-coded in `src/app/all-books/page.tsx`, `src/app/all-books/[id]/page.tsx`, `src/app/add-books/page.tsx`, and `src/components/borrowBook/BorrowBooks.tsx`. There is no env var — changing hosts means editing every call site.
- Run the sibling `../book-nook-server` with `node index.js` (its package.json has no dev script). Uses the same `book-nook` MongoDB database.
- Endpoints: `GET /all-books`, `GET /book/:id`, `POST /add-book`, `PATCH /book/:id` (decrements `totalCopies`), `GET|POST /my-borrow`, `GET /my-borrows?email=`, `DELETE /my-borrows/:id` (returns a copy). `totalCopies` doubles as the available-copy count. `Book` and `Borrow` shapes are in `src/types/book.ts`.

## Auth (better-auth, not NextAuth)

- Server config `src/lib/auth.ts` (MongoDB adapter, email/password) is mounted at `src/app/api/auth/[...all]/route.ts`.
- Client helpers `src/lib/auth-client.ts`: `authClient.signIn.email`, `signUp.email`, `useSession`, `signOut`; used by Navbar, login, register, and borrow UI.
- Required env: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. `.env` is gitignored.
- `src/lib/auth-client.ts` reads `process.env.BETTER_AUTH_UR` (typo), so the client `baseURL` is undefined and falls back to same-origin. Keep this in mind before debugging cross-origin auth.
- Route protection is `src/proxy.ts` — Next 16's rename of `middleware.ts`. Matcher `["/all-books/:path"]` matches one nested segment only, so the `/all-books` list itself and deeper paths are not protected. Unauthenticated matches redirect to `/login`.

## Framework quirks

- Next.js 16.4.3 / React 19.3: route `params` are Promises (`await params`); Turbopack is the default; middleware is called Proxy. Consult `node_modules/next/dist/docs/` instead of assuming older APIs.
- `PageProps` / `LayoutProps` / `RouteContext` globals come from generated `.next` types (`src/app/layout.tsx` uses `LayoutProps<"/">`). On a fresh clone, run `npm run dev` or `npx next typegen` before typechecking. `next-env.d.ts` and the managed block are generated files.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`), and lint enforces `react-hooks/set-state-in-effect`.
- Tailwind v4 is CSS-first: theme and dark variant live in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, `@custom-variant dark`). There is no `tailwind.config`.
- shadcn is configured with the `base-nova` style on **Base UI** (`@base-ui/react`), not Radix. Compose triggers/links with `render={<Link ... />}` and `nativeButton={false}`; there is no `asChild`.
- `cn` is re-exported from the `cn` npm package in `src/lib/utils.ts`; import it from `@/lib/utils` (or `cn`), not `clsx` + `tailwind-merge`.

## Route map and conventions

- App Router pages in `src/app`; feature components in `src/components/<feature>`; generated primitives in `src/components/ui`.
- Root layout adds Navbar, Footer, and Toaster for all pages. Toast API is Base UI's manager: `import { toast } from "@/components/ui/toast"` then `toast.add({...})`.
- The working add-book form is `/add-books`; the Navbar links to `/add-book`, which is only a placeholder. `/my-borrows` is implemented; `/my-books` is still a stub.
- Server pages fetch with `cache: "no-store"`; interactive files declare `"use client"` at the top.
- `next/image` allows any HTTPS host (`images.remotePatterns` hostname `**`) because cover URLs are arbitrary.
