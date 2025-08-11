import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "client",
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:5001",
    },
  },
});
