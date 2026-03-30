import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false,
    middlewareMode: false,
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws'
    },
    watch: {
      usePolling: true,
      interval: 50,
      binaryInterval: 100,
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
    }
  },
  define: {
    '__DEV__': true
  }
})