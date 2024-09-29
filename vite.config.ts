import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    svgr(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: 'electron/preload.ts',
      }
    })
  ],
})
