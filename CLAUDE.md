# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## ⚠️ Non-standard Next.js

This project pins `next@16.2.9`, a version with breaking changes vs. the Next.js you were trained on. **Before writing App Router / config / middleware code, check `node_modules/next/dist/docs/`** — do not assume training-data APIs still apply. One confirmed example already present in this repo: the `middleware.ts` convention is deprecated and renamed to `src/proxy.ts` (exporting a `proxy` function instead of `middleware`); see `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` — Biome check (lint + import-organization rules)
- `pnpm format` — Biome format, writes changes
- `pnpm lint:staged` / `pnpm format:staged` — same, scoped to staged files (used by pre-commit hooks)

There is no test runner configured in this repo.

Toolchain is pinned: Node `24.18.0` (`.nvmrc`), pnpm `11.9.0` via Corepack (`packageManager` in `package.json`). Use `nvm use` and `corepack use pnpm@11.9.0` before installing.

## Architecture

- **App Router with mandatory locale segment**: all routes live under `src/app/[locale]/`. Locale handling is via `next-intl`: `src/i18n/routing.ts` defines locales (`en`, `vi`, default `en`), `src/i18n/request.ts` loads messages from `messages/{locale}.json`, `src/i18n/navigation.ts` re-exports locale-aware `Link`/`redirect`/`useRouter`/`usePathname`. Always import navigation primitives from `@/i18n/navigation`, not `next/navigation`, so locale prefixes are preserved. `src/proxy.ts` runs the `next-intl` middleware for locale detection/redirects (see naming note above).

- **Provider composition**: `src/providers/app.provider.tsx` composes providers by reducing over a `providers` object (`I18nProvider`, `ReactQueryProvider`) so each wraps the next — add new context providers there rather than nesting manually in the layout. Server-safe vs. client-only providers are annotated by comment; `ReactQueryProvider`, `UIProvider` (renders `<Toaster/>`), and `Devtools` (`ReactQueryDevtools`) are separate because they need `"use client"` or render outside the provider-wrapped `<body>`. `src/app/[locale]/layout.tsx` wires `AppProvider` around `<html>`/`<body>` and validates the `locale` param with `hasLocale`, calling `notFound()` if invalid.

- **React Query setup**: `src/providers/react-query.provider.tsx` uses the server/browser singleton pattern (`environmentManager.isServer()` decides whether to create a fresh `QueryClient` per request or reuse a module-level singleton). Defaults: `staleTime` 10s, `gcTime` 1min, `retry` 2, no refetch on window focus. A global `MutationCache` handles toast notifications on mutation success/error and can auto-invalidate queries via mutation `meta`. Mutation `meta` is typed via module augmentation in `global.d.ts` (`skipToastError`, `invalidateQueries`) — set these on `useMutation({ meta: {...} })` instead of handling toasts/invalidation manually in each mutation.

- **API client**: `src/lib/api.ts` wraps `ky` with request/response logging hooks and injects a hardcoded `Authorization: Bearer token` header (placeholder — not real auth yet). `beforeError` converts raw ky errors into `ApiError` (`src/lib/api-error.ts`), which normalizes HTTP/network/timeout/unknown failures into a typed `code`/`status`/`data` shape. Prefer catching/inspecting `ApiError` over raw `ky` errors elsewhere in the app.

- **Env validation**: `src/env.ts` uses `@t3-oss/env-nextjs` + `zod` to validate env vars at build/runtime (currently only `NEXT_PUBLIC_API_URL` client-side). `next.config.ts` imports `./src/env` first so invalid env fails the build early. Add new env vars here (under `server`/`client`) rather than reading `process.env` directly.

- **Domain modules**: `src/modules/<domain>/types.ts` (e.g. `posts`, `albums`) hold domain types/interfaces, including options types for planned query/mutation functions (`Get*Options`, `Update*Options`). Follow this module-per-domain convention (`src/modules/<domain>/...`) when adding new API-backed features.

- **UI components**: shadcn/ui (`components.json`, style `radix-vega`, base color `neutral`, icon library `lucide`) generates into `src/components/ui`; that directory (plus `globals.css` and `public`) is excluded from Biome linting/formatting since it's generated code — don't hand-edit formatting there. Use the `cn()` helper (`src/lib/utils.ts`, clsx + tailwind-merge) for conditional class names; Biome's `useSortedClasses` rule auto-fixes Tailwind class ordering inside `cn`/`clsx`/`cva`/`tw`.

- **Path alias**: `@/*` → `src/*` (`tsconfig.json`).

- **Biome**: single source of truth for lint + format (no ESLint/Prettier). Import order is enforced/auto-fixed via the `organizeImports` assist action (builtin → external packages → `@myown/**` → path aliases).
