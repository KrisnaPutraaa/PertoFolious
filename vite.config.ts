import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` harus sama dengan nama repo agar website jalan di GitHub Pages:
// https://krisnaputraaa.github.io/PertoFolious/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/PertoFolious/',
})
