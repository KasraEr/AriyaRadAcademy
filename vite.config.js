import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3010 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react")) return "react";
          if (id.includes("@tiptap") || id.includes("prosemirror"))
            return "editor";
          if (id.includes("chart.js")) return "charts";
          if (id.includes("leaflet")) return "maps";
        },
      },
    },
  },
});
