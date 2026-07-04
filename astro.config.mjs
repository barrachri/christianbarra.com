// @ts-check

import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://www.christianbarra.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
})
