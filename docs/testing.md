# Testing

| Layer            | Tool                           | Where                                                      |
| ---------------- | ------------------------------ | ---------------------------------------------------------- |
| Unit / component | Vitest + React Testing Library | `*.test.ts(x)` next to the source                          |
| Network          | MSW                            | `src/mocks` (default handlers), `server.use(...)` per test |
| End-to-end       | Playwright (chromium)          | `e2e/`                                                     |

## Rules

- Test what the user sees: query by role and accessible name.
- MSW handles all network. `onUnhandledRequest: "error"` fails a test that makes an unmocked request.
- Use `renderWithProviders` (`src/test/render-with-providers.tsx`); it gives each test a fresh `QueryClient` with `retry: false`.
- Playwright covers a few critical journeys and stubs the API with `page.route`.

## Coverage gate

`make test` runs `vitest run --coverage` and fails below **80% lines** (`coverage.thresholds.lines` in `vitest.config.ts`). Excluded: `src/main.tsx`, `src/mocks`, `src/test`, declaration files, and test files. Do not lower the threshold or widen the excludes to get a green run; the threshold is governed by the handbook's coverage-gate ADR.

## Running

```bash
make test
npx vitest run src/features/status
npm run test:watch
npm run test:e2e
```
