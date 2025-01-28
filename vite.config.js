import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/pesaqr.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
