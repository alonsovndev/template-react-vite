# AGENTS.md

<!-- ai-repo-setup:generated:start -->

## Overview

React 19 + TypeScript + Vite + Ant Design 6 template. TanStack Query for server state, React Router 7, Vitest + React Testing Library + MSW, Playwright, ESLint, Prettier, Husky. Follows the [engineering handbook](https://github.com/alonsovndev/engineering-handbook) (frontend, testing, and git sections). Deployment profile: chosen per project (see `docs/deployment.md`).

## Commands

| Task                    | Command                                 |
| ----------------------- | --------------------------------------- |
| Install                 | `make install` (`npm ci`)               |
| Dev server (port 5173)  | `make dev`                              |
| Test with coverage gate | `make test` (`vitest run --coverage`)   |
| Lint                    | `make lint`                             |
| Type-check              | `npm run type-check`                    |
| Build                   | `npm run build`                         |
| Format                  | `make format`                           |
| Everything CI runs      | `make ci`                               |
| Single test file        | `npx vitest run src/path/file.test.tsx` |
| End-to-end              | `npm run test:e2e`                      |

Run `make ci` before declaring work done.

## Structure

```text
src/app/          App.tsx, routes/ (lazy pages), providers/ (ConfigProvider > antd App > QueryClient > ErrorBoundary)
src/features/<f>/ api/, components/, types.ts, index.ts (public exports)
src/shared/       components/, lib/ (env, http), styles/ (theme tokens)
src/mocks/        MSW handlers and server
src/test/         Vitest setup and renderWithProviders
e2e/              Playwright specs
docs/             architecture, development, testing, deployment, adr/
```

## Architecture

- Features import other features only through their `index.ts`. Move code to `shared/` after real reuse.
- Server state lives in TanStack Query hooks in a feature's `api/`. Do not copy it into local state or a store. No Redux.
- Use `App.useApp()` for `message`, `notification`, `modal`; never the static antd calls.
- Theme through tokens in `src/shared/styles/theme.ts`; no `!important` against antd internals.
- Only `VITE_` variables reach the client and they are public. Read them through `src/shared/lib/env.ts`.
- `strict` TypeScript, no `any`, no `!` assertions, explicit props interfaces.

Details: `docs/architecture.md`, handbook `frontend/`.

## Testing

- Colocate tests as `*.test.ts(x)`. Query by role and accessible name.
- Mock the network with MSW (`src/mocks`), never by stubbing `fetch`. Unhandled requests fail tests.
- Render with `renderWithProviders` from `src/test/render-with-providers.tsx`.
- 80% line coverage is enforced by `make test`. Do not lower it or add excludes to pass. Changing it needs an ADR.

Details: `docs/testing.md`.

## Git

- Conventional Commits, enforced by `.husky/commit-msg` and the PR-title check. No AI or tool co-author trailers.
- Branch from `dev`: `feature/*`, `fix/*`, `chore/*`. PRs target `dev`. Never commit or push on `main` or `dev`.
- Do not commit, push, or bypass hooks (`--no-verify`) unless asked.

## Security

- Never commit `.env` files or secrets. `.husky/check-secrets.sh` blocks the obvious cases.
- Do not put secrets in `VITE_` variables.
- Do not add dependencies, call external services, or trigger pipelines without approval.

## Definition of done

`make ci` passes, tests cover the changed behavior, docs are updated, no new warnings. See the handbook's [definition of done](https://github.com/alonsovndev/engineering-handbook/blob/main/docs/ai-development/definition-of-done.md). Do not delete, skip, or weaken tests, and do not disable lint, type checks, hooks, or the coverage gate.

## Deployment

TBD. `docs/deployment.md` lists the options; CI (`.github/workflows/ci.yml`) only verifies.

## Known gaps

- Sentry is not wired in (deferred; see `docs/adr/adr-001-template-baseline.md`).

<!-- ai-repo-setup:generated:end -->

<!-- ai-repo-setup:custom:start -->
<!-- Add project-specific rules below this line. Preserved across re-runs. -->
<!-- ai-repo-setup:custom:end -->
