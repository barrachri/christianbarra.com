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

Required GitHub repository or `production` environment secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

You can add them with GitHub CLI:

```sh
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
```

Or, if you want them scoped to the `production` environment used by the workflow:

```sh
gh secret set CLOUDFLARE_API_TOKEN --env production
gh secret set CLOUDFLARE_ACCOUNT_ID --env production
```
