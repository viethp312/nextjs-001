This is a Next.js template for new projects, using the App Router, `next-intl` for i18n, React Query, shadcn/ui, and Biome for linting/formatting.

> **Note:** This project pins `next@16.2.9`, which has breaking changes vs. older Next.js versions (e.g. `middleware.ts` is renamed to `src/proxy.ts`). See `node_modules/next/dist/docs/` for up-to-date API references.

## Requirements

This project pins its toolchain versions:

- **Node.js**: `24.18.0` (see `.nvmrc`)
- **pnpm**: `11.9.0` (see `packageManager` in `package.json`, via Corepack)

Use the Node version from `.nvmrc`:

```bash
nvm use
```

Enable Corepack so pnpm resolves to the pinned version automatically:

```bash
corepack enable
corepack use pnpm@11.9.0
```

Then install dependencies:

```bash
pnpm install
```

## Getting Started

Copy the example env file and adjust as needed (`NEXT_PUBLIC_API_URL` is required, see `src/env.ts`):

```bash
cp .env.example .env
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` — Biome check (lint + import-organization rules)
- `pnpm format` — Biome format, writes changes
- `pnpm lint:staged` / `pnpm format:staged` — same, scoped to staged files (used by pre-commit hooks)

There is no test runner configured in this repo.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives), [lucide-react](https://lucide.dev/) icons, [next-themes](https://github.com/pacocoursey/next-themes)
- **Data fetching / server state**: [TanStack React Query](https://tanstack.com/query) + [ky](https://github.com/sindresorhus/ky) HTTP client
- **i18n**: [next-intl](https://next-intl.dev/)
- **Env validation**: [@t3-oss/env-nextjs](https://github.com/t3-oss/t3-env) + [Zod](https://zod.dev/)
- **Lint/format**: [Biome](https://biomejs.dev/)
- **Package manager**: [pnpm](https://pnpm.io/) (via Corepack)

## Project Structure

```
.
├── messages/               # next-intl translation files ({locale}.json)
├── public/                 # static assets
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── [locale]/       # all routes live under the locale segment
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── albums/
│   │       │   ├── page.tsx
│   │       │   ├── error.tsx
│   │       │   └── [albumId]/page.tsx
│   │       ├── posts/
│   │       │   ├── page.tsx
│   │       │   ├── loading.tsx
│   │       │   └── [postId]/page.tsx
│   │       └── posts-2/page.tsx
│   ├── components/
│   │   ├── layouts/        # app-wide layout components
│   │   └── ui/              # shadcn/ui generated components (excluded from Biome)
│   ├── i18n/                # next-intl routing/navigation/request config
│   ├── lib/                 # api client, api-error, utils
│   ├── modules/              # domain modules
│   │   ├── albums/
│   │   │   ├── api/            # actions/API calls
│   │   │   ├── types.ts
│   │   │   └── ui/
│   │   │       ├── components/
│   │   │       └── views/
│   │   └── posts/
│   │       ├── api/            # api, query, query-key
│   │       ├── types.ts
│   │       └── ui/
│   │           ├── components/
│   │           └── views/
│   ├── providers/            # context providers, composed in app.provider.tsx
│   ├── utils/
│   ├── env.ts                # env var validation
│   └── proxy.ts              # next-intl middleware (replaces middleware.ts)
├── biome.json
├── components.json          # shadcn/ui config
├── next.config.ts
└── tsconfig.json
```

## Architecture

- **App Router with mandatory locale segment**: all routes live under `src/app/[locale]/`. Locale handling is via `next-intl` (`src/i18n/`); always import navigation primitives (`Link`, `redirect`, `useRouter`, `usePathname`) from `@/i18n/navigation` instead of `next/navigation` so locale prefixes are preserved. `src/proxy.ts` runs the `next-intl` middleware for locale detection/redirects.
- **Provider composition**: `src/providers/app.provider.tsx` composes context providers (i18n, React Query, UI/toaster, devtools) — add new providers there rather than nesting manually in the layout.
- **React Query**: `src/providers/react-query.provider.tsx` sets up a server/browser-safe `QueryClient` singleton with sensible defaults and a global `MutationCache` for toast notifications and query invalidation via mutation `meta`.
- **API client**: `src/lib/api.ts` wraps `ky` with logging hooks and normalizes errors into `ApiError` (`src/lib/api-error.ts`) — prefer catching this over raw `ky` errors.
- **Domain modules**: `src/modules/<domain>/` holds domain types and API query/mutation logic — follow this convention when adding new API-backed features.
- **UI components**: shadcn/ui components live in `src/components/ui` (generated, excluded from Biome formatting). Use the `cn()` helper (`src/lib/utils.ts`) for conditional class names.
- **Path alias**: `@/*` → `src/*`.

See `CLAUDE.md` for a more detailed architecture overview.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — note this project pins `next@16.2.9`; check `node_modules/next/dist/docs/` for API changes before trusting general Next.js docs/training data.
- [next-intl Documentation](https://next-intl.dev/docs/getting-started)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
