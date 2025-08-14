import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.join(__dirname, 'src', 'renderer'),
  base: './',
  build: {
    outDir: path.join(__dirname, 'dist', 'renderer'),
    emptyOutDir: true,
  },
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer/src'),
    },
  },
});