import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
const { resolve } = require("path");

const Config = defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index/index.html"),
        setup: resolve(__dirname, "src/setup/setup.html"),
        top: resolve(__dirname, "src/top/top.html"),
      },
      output: {
        entryFileNames: "src/[name].js",
        chunkFileNames: "src/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  plugins: [solidPlugin()],
});

export default Config;
