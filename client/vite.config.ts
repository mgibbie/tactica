import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  base: './',  // Use relative paths for assets
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    open: true,
  },
}); 