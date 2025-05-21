import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// This Vite config is used only for the Scratchpad app - not the Astro site.

// https://vite.dev/config/
export default defineConfig({
  // Disable SSR to avoid losing selected element in DevTools upon HMR
  ssr: {
    noExternal: true,
    external: [],
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            'preset-default',
            'removeTitle',
            'removeDesc',
            'removeDoctype',
            'cleanupIds',
          ],
        },
      },
    }),
  ],
});
