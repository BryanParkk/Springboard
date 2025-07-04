import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  root: "client",
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
});
