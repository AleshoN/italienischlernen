import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/italienischlernen/' : '/',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify('1.1.0'),
    __CONTENT_VERSION__: JSON.stringify('1.0.0'),
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
  },
}))
