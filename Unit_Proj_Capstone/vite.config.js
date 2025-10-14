// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   root: "client",
//   plugins: [react()],
//   server: {
//     historyApiFallback: true,
//     proxy: {
//       "/api": "http://localhost:5001",
//     },
//   },
// });

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "client",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // historyApiFallback: true, // ← Vite에선 불필요 (SPA가 기본)
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        // secure: false, // only for Dev
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
