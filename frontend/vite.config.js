import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import frappeui from 'frappe-ui/vite'

export default defineConfig({
  plugins: [frappeui(),react()],
  base: './',
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
});
