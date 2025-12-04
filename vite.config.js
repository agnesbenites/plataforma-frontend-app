// app-frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Adicione esta linha: Define o caminho base como a raiz absoluta.
  base: '/', 
  
  plugins: [react()],
});