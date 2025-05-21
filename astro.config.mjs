// @ts-check
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
// https://starlight.astro.build/guides/authoring-content/
export default defineConfig({
  integrations: [
    starlight({
      title: "Jamie's Compendium",
      customCss: ['./src/styles/global.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          // TODO: Swap compendium-astro for compendium
          href: 'https://github.com/shirakaba/compendium',
        },
      ],
      sidebar: [
        { label: 'About', slug: 'about' },
        {
          label: 'Native dev',
          autogenerate: { directory: 'native-dev' },
        },
        {
          label: 'Web dev',
          autogenerate: { directory: 'web-dev' },
        },
        {
          label: 'Backend dev',
          autogenerate: { directory: 'backend-dev' },
        },
        // TODO: Non-dev categories. Could have anything from cookery to
        // investing.
      ],
    }),
    react(),
  ],

  vite: {
    plugins: [
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
                    // We must preserve the viewbox in order for the SVG to
                    // scale to fit the specified `width` and `height`.
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
  },
});
