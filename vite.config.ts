import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
const { resolve } = require("path");

const Config = defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index/index.html"),
        permissions: resolve(__dirname, "src/permissions/permissions.html"),
      },
    },
  },
  plugins: [solidPlugin()],
});

export default Config;
