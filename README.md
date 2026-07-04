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

This project includes `wrangler.toml` for the `christianbarra-com` Worker. To deploy the static Astro build:

```sh
npm run deploy:worker
```
