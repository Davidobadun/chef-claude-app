import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/chef-claude-app",
  server: {
    host: '0.0.0.0', // Allow access from any IP
    port: 3000, // Use a default port
  },
  build: {
    outDir: 'build', // Folder for the production build
  }
})
