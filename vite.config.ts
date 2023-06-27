import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./src/index.html"),
      },

      output: {
        entryFileNames: "src/[name].js",
        chunkFileNames: "src/[name].js",
      },
    },
  },
  plugins: [react(), cssInjectedByJsPlugin({ topExecutionPriority: false })],
});
