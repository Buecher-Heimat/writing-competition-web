import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import lottie from "astro-integration-lottie";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), lottie(), vue({
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
    '/texte': '/alle-texte/1',
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    define: {
      'process.env.PUBLIC_BACKEND_URL': JSON.stringify(process.env.PUBLIC_BACKEND_URL),
    }
  }
});