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

Production deploys are also handled by `.github/workflows/deploy.yml` using Cloudflare's official `cloudflare/wrangler-action`. The workflow runs checks on pull requests and deploys after pushes to `master` or manual dispatches.
