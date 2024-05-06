import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [react()],
});
