import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
  ],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000, // inline large assets
    cssCodeSplit: false,          // merge all CSS into one file
  },
});