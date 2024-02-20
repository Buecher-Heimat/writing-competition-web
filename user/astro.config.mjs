import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue({
    // Workaround for https://github.com/withastro/astro/issues/9328
    template: {
      transformAssetUrls: {
        includeAbsolute: false,
      },
    },
  })],
  redirects: {
    '/alle-texte': '/alle-texte/1',
    '/alletexte': '/alle-texte/1',
    '/all-posts': '/alle-texte/1',
    '/alle-posts': '/alle-texte/1',
    '/beiträge': '/alle-texte/1',
    '/alle-beiträge': '/alle-texte/1',
    '/mitmachen': '/text-einreichen',
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});