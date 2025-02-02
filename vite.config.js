import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/pesaqr.ts",
      name: "pesaqr",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
