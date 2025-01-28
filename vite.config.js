import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/pesaqr.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
