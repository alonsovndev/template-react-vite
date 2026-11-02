# Deployment

The template builds a static bundle (`npm run build` writes `dist/`) and ships no deploy workflow, because the target depends on the project's deployment profile. Infrastructure for each profile lives in [terraform-modules](https://github.com/alonsovndev/terraform-modules) under `profiles/`; the profile READMEs there are the runbooks.

| Profile    | Target                                                  | Terraform                                | Status                          |
| ---------- | ------------------------------------------------------- | ---------------------------------------- | ------------------------------- |
| static     | Cloudflare Workers static assets                        | `cloudflare/static-site` with `spa_mode` | Validated offline, not deployed |
| lean       | Cloudflare Workers static assets, API on AWS Lambda     | `cloudflare/static-site` with `spa_mode` | Validated offline, not deployed |
| enterprise | S3 + CloudFront (Origin Access Control), API on ECS/ALB | `aws/s3-static-site`, `aws/cloudfront`   | Validated offline, not deployed |

"Validated offline" means Terraform validation, mocked-provider plan tests, and local builds. Nothing has been applied to a real account.

## Build

```sh
VITE_API_BASE_URL=https://api.example.com npm run build
```

- `VITE_API_BASE_URL` is the API origin (no path, no trailing slash). It is baked into the bundle, so each environment needs its own build. A production build without it fails at startup on purpose.
- The app uses `createBrowserRouter`, so deep links need SPA fallback to `index.html`. Set `spa_mode = true` on the Terraform module; the template has no `_redirects` file.
- Assets are served from `/`. Do not deploy under a sub-path without setting Vite's `base`.
- The API must allow the site's origin (`CORS_ALLOWED_ORIGINS` in `template-api-python`).

## Rules for any target

- Build in CI from a tagged commit on `main`.
- Authenticate to cloud providers with OIDC where the provider supports it; keep Cloudflare API tokens in GitHub Actions secrets, scoped to the one account and zone.
- Upload `dist/` after the infrastructure exists; `dist/` is the Terraform `assets_directory` for Cloudflare, or the S3 sync source for AWS.

See the handbook's deployment profiles and CI/CD sections.
