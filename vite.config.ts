import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
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
    // By default, Vite imports PNGs as strings rather than objects, which
    // differs from the code we wrote for our React Docusaurus site, that
    // expects the default export of a PNG to be a metadata object including a
    // "src" property. So we use imagetools() to get behaviour consistent with
    // that.
    imagetools({
      defaultDirectives: (url) => {
        if (url.pathname.endsWith('.png')) {
          // We pick a directive that includes the 'src' property in its
          // metadata.
          const directive = 'metadata';

          return new URLSearchParams({
            // This setting rewrites imports as follows:
            //
            // import AppIcon from './app-icon.png';
            // ->
            // import AppIcon from './app-icon.png?metadata';
            //
            // It seems there's no need for a value; just the key suffices.
            [directive]: '',

            // Without this `as` param, the default import behaves as a string
            // because it goes through their default `urlFormat()` rather than
            // using the format for the specified directive.
            //
            // It seems you can pass `as=a;b;c`, but I'm not really clear what
            // the value is for. The key `as` alone is enough for my purposes.
            as: directive,
          });
        }

        return url.searchParams;
      },
    }),
    tailwindcss(),
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {
        // See DEFAULT_CONFIG in node_modules/@svgr/core/dist/index.js
        dimensions: false,
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // We must preserve the viewbox in order for the SVG to scale
                  // to fit the specified `width` and `height`.
                  removeViewBox: false,
                },
              },
            },
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
