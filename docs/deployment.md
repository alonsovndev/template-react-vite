# Deployment

TBD per project. The template builds a static bundle (`npm run build` writes `dist/`) and ships no deploy workflow, because the target depends on the deployment profile.

| Profile       | Typical target                            | Status |
| ------------- | ----------------------------------------- | ------ |
| static / lean | Cloudflare Pages or Workers static assets | TBD    |
| enterprise    | S3 + CloudFront                           | TBD    |

Rules that apply to any target:

- Build in CI from a tagged commit on `main`.
- Authenticate to cloud providers with OIDC, not long-lived keys.
- Provide `VITE_API_BASE_URL` at build time; it is baked into the bundle.
- Add SPA fallback routing so deep links resolve to `index.html`.

See the handbook's deployment profiles and CI/CD sections.
