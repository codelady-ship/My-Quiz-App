import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the app from /My-Quiz-App/; local dev and `npm run build` use /.
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/My-Quiz-App/' : '/',
  plugins: [react()],
  test: {
    environment: 'node',
  },
}))
