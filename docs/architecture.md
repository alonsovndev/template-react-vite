# Architecture

Feature-first single-page app. Rules and rationale follow the handbook's [React, Vite, and Ant Design](https://github.com/alonsovndev/engineering-handbook) standards; this page records how the template applies them.

## Layout

| Path                      | Holds                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `src/app/`                | `App.tsx`, `routes/` (route table and lazy pages), `providers/` (`AppProviders`)                                      |
| `src/features/<feature>/` | `api/` (HTTP and query hooks), `components/`, `types.ts`, `index.ts`                                                  |
| `src/shared/`             | `components/` (AppLayout, PageHeader, LoadingState, EmptyState, ErrorBoundary), `lib/` (env, http), `styles/` (theme) |
| `src/mocks/`, `src/test/` | MSW handlers, Vitest setup, render helper                                                                             |

## Rules

- A feature exposes its public surface through `index.ts`. Other code imports from there, never from inside the feature.
- Code moves to `shared/` only after two or three real uses.
- Pages are lazy-loaded with `React.lazy`; `AppLayout` wraps the router outlet in `Suspense`.
- The `@` alias points at `src/` and is configured in `tsconfig.json`, `vite.config.ts`, and `vitest.config.ts`. Keep all three in sync.

## Provider order

```text
ConfigProvider (theme tokens)
  > antd App (message / notification / modal context)
    > QueryClientProvider
      > ErrorBoundary
        > RouterProvider
```

## Data flow

Components call a feature hook (`useStatusQuery`) that calls an API function (`getStatus`) that uses `getJson` from `shared/lib/http.ts`. `getJson` throws `HttpError` on non-2xx responses, which TanStack Query surfaces as `isError`. Every query surface renders loading, empty, and error states.

## Error handling

`ErrorBoundary` catches render errors and shows a recovery screen. It is the only class component, because React offers no hook equivalent. Reporting to an error tracker is TBD (Sentry is deferred).
