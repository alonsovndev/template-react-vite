# ADR-001: Template baseline

- **Status**: Accepted
- **Date**: 2026-10-10

## Context

New React apps should start with the handbook's frontend, testing, and git standards already applied. The template needs a stack baseline and a decision on what to leave out.

## Decision

- React 19, TypeScript 5.9, Vite 7, Ant Design 6, React Router 7, Vitest 3, Playwright 1.58, ESLint 9, matching the versions already proven in open-projects-hub-web.
- TanStack Query for server state. No Redux; use RTK Query only in a repository that already uses Redux.
- Enforce 80% line coverage, per the handbook's coverage-gate ADR.
- Leave Sentry out of the first version. It is listed in the ecosystem plan but deferred; `docs/development.md` records the intended wiring.
- Ship no deploy workflow; deployment depends on the deployment profile.

## Consequences

### Positive

- Versions are already exercised in a real project.
- A new project gets hooks, CI, tests, and agent context on day one.

### Negative

- Projects needing error tracking must add Sentry themselves until the template gains it.
- Version pins drift; bump them deliberately and record material changes in a new ADR.

## Alternatives Considered

1. **Latest stable of every package**
   - Why it was considered: newest features.
   - Why it was not selected: unproven combination; the known-good set is cheaper to trust.
2. **Include Sentry now**
   - Why it was considered: matches the ecosystem plan's template list.
   - Why it was not selected: adds a runtime dependency and DSN handling before there is a project to validate it against.
