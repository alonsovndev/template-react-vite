import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // antd is part of the eagerly loaded app shell, so the entry chunk legitimately exceeds the
    // default 500 kB warning. Raise this only after checking `vite build` output for regressions.
    chunkSizeWarningLimit: 800,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
