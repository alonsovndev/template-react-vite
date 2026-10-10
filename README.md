# template-react-vite

Production-ready starting point for React single-page apps: TypeScript, Vite, Ant Design, React Router, TanStack Query, Vitest, Testing Library, MSW, Playwright, ESLint, Prettier, Husky, and GitHub Actions CI. It implements the frontend, testing, and git standards of the [engineering handbook](https://github.com/alonsovndev/engineering-handbook).

Use it for SaaS, dashboards, and admin apps. For content sites use the Astro template; for SSR needs use the Next.js template.

## Use the template

1. Create a repository from this template (or copy it) and rename the package in `package.json` and the title in `index.html`.
2. `cp .env.example .env` and set `VITE_API_BASE_URL`.
3. `make install && make dev`, then open http://localhost:5173.
4. Replace `src/features/status` with your first feature; keep its structure.

Requires Node 22 (`.nvmrc`).

## Commands

| Command            | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| `make install`     | `npm ci`                                                    |
| `make dev`         | Vite dev server                                             |
| `make test`        | Vitest with the 80% line coverage gate                      |
| `make lint`        | ESLint, zero warnings                                       |
| `make format`      | Prettier                                                    |
| `make ci`          | Format check, lint, type-check, tests, build (what CI runs) |
| `npm run test:e2e` | Playwright (chromium)                                       |

## What's included

- Feature-first layout with an example `status` feature: query hook, loading/empty/error states, MSW-backed tests.
- Providers: Ant Design `ConfigProvider` + `App`, `QueryClientProvider`, error boundary.
- Conventional Commits `commit-msg` hook, secret scan, and lint-staged `pre-commit` hook.
- CI: verify, end-to-end, and PR-title jobs.
- `AGENTS.md` plus `docs/` for humans and agents.

Not included: Sentry (deferred), authentication, deployment workflow. See [docs/deployment.md](docs/deployment.md).

## Docs

[Architecture](docs/architecture.md) · [Development](docs/development.md) · [Testing](docs/testing.md) · [Deployment](docs/deployment.md) · [ADRs](docs/adr/adr-001-template-baseline.md)

## License

MIT. See [LICENSE](LICENSE).
