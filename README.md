# christianbarra.com

Personal website for Christian Barra, now migrated from Gatsby to Astro.

## Stack

- Astro for static rendering
- React islands for shadcn/ui components
- Tailwind CSS v4 with the shadcn `nova` preset
- Netlify and Cloudflare Workers deployment

## Local development

```sh
npm install
npm run dev
```

## Build and checks

```sh
npm run typecheck
npm run lint
npm run build
```

The production build outputs to `dist/`.

## Deploy to Cloudflare Workers

This project includes `wrangler.toml` for the `christianbarra-com` Worker. Manual deployment:

```sh
npm run deploy:worker
```

Production deploys are also handled by `.github/workflows/deploy.yml` using Cloudflare's official `cloudflare/wrangler-action`. The workflow runs checks on pull requests and deploys after pushes to `master` or manual dispatches.

The Cloudflare account ID is fixed in `wrangler.toml` and the workflow. Required GitHub repository or `production` environment secret:

- `CLOUDFLARE_API_TOKEN`

You can add it with GitHub CLI:

```sh
gh secret set CLOUDFLARE_API_TOKEN
```

Or, if you want it scoped to the `production` environment used by the workflow:

```sh
gh secret set CLOUDFLARE_API_TOKEN --env production
```
