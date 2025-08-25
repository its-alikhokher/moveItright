import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { FrappeProvider } from "frappe-react-sdk";

export default defineConfig({
  plugins: [ FrappeProvider(),react()],
  base: '/assets/moveitright/frontend/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: `../${path.basename(path.resolve('..'))}/public/frontend`,
    emptyOutDir: true,
    target: 'es2015',
    sourcemap: true
  },
})
