import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'form';
          }
          if (id.includes('@hello-pangea/dnd')) {
            return 'dnd';
          }
          if (id.includes('sonner')) {
            return 'toast';
          }
          if (id.includes('react-icons')) {
            return 'icons';
          }
          if (id.includes('date-fns')) return 'date';
          if (id.includes('axios')) return 'api';
        },
      },
    },
  },
});
