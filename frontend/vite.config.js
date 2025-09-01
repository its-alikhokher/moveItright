import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import proxyOptions from './proxyOptions';

export default defineConfig({
  plugins: [react()],
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
  server: {
    proxy: proxyOptions,   // ✅ ab proxy enable hai
  },
});
