import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' permite publicar el sitio en GitHub Pages (en una subcarpeta del dominio).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
  },
  test: {
    globals: true,
  },
});
