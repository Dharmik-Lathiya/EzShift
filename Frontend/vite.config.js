import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: { strict: false },
    middlewareMode: false
  },
  preview: {
    fs: {
      strict: false,
    },
  },
});
