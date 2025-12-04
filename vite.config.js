import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild', // ⚡ Mais rápido e já vem com Vite
    sourcemap: false
  }
});