import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        apps: resolve(import.meta.dirname, 'apps/index.html'),
        blogs: resolve(import.meta.dirname, 'blogs/index.html'),
        capdent: resolve(import.meta.dirname, 'capdent/index.html'),
      },
    },
  },
});
