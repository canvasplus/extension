import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const Config = defineConfig({
  build: {
    outDir: 'dist/pages',
  },
  plugins: [
    solidPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/*',
          dest: '..',
        },
      ],
    }),
  ],
});

export default Config;
