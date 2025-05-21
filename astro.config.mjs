// @ts-check
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/withastro/starlight',
        },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
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
  },
});
