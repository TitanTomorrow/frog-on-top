import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served as a GitHub Pages project site: https://titantomorrow.github.io/frog-on-top/
// If you later move to a custom domain served at the root (e.g. frogon.top),
// change this to '/' and add public/CNAME back.
export default defineConfig({
  base: '/frog-on-top/',
  plugins: [react(), tailwindcss()],
})
