import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/wordpress",
    lib: {
      entry: "src/pesaqr.ts",
      formats: ["es"],
      fileName: "pesaqr",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
