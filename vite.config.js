import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        apps: resolve(__dirname, 'apps.html'),
        blogs: resolve(__dirname, 'blogs.html'),
      },
    },
  },
});
