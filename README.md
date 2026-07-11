# christianbarra.com

Personal website for Christian Barra, now migrated from Gatsby to Astro and simplified back to a text-first single page.

## Stack

- Astro for static rendering
- React islands for shadcn/ui components
- Tailwind CSS v4 with the shadcn `nova` preset
- React Grab in development for copying source context from UI selections
- Netlify and Cloudflare Workers deployment

## Local development

```sh
pnpm install
pnpm run dev
```

For private shadcnblocks installs, set `SHADCNBLOCKS_API_KEY` in your shell. `components.json` uses the authenticated `https://www.shadcnblocks.com/r/{name}` registry URL.

## Build and checks

```sh
pnpm run typecheck
pnpm run lint
pnpm run build
```

The production build outputs to `dist/`.

## Deploy to Cloudflare Workers

This project includes `wrangler.toml` for the `christianbarra-com` Worker. Manual deployment:

```sh
pnpm run deploy:worker
```

Deployments use Cloudflare's official `cloudflare/wrangler-action`. `.github/workflows/pull-request.yml` creates an isolated Worker preview for pull requests and reuses `.github/workflows/deploy.yml`; pushes and merges to `master` trigger `deploy.yml` directly for production.
