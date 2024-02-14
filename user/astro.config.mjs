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
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});