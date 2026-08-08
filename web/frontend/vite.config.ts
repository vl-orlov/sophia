import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (info) => {
          const ext = info.name?.split('.').pop() ?? 'bin';
          if (ext === 'css') return 'assets/css/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8888', changeOrigin: true },
    },
  },
});
