import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from the root of the custom domain (frogon.top), so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
