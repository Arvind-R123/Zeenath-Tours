import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // <-- add this:
  base: "/Zeenath-Tours/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
