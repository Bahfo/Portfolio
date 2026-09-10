import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages project site: https://bahfo.github.io/Portfolio/
  // Use /Portfolio/ in production, / in dev (localhost)
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  preview: {
    host: '127.0.0.1',
    port: 4173
  }
})
