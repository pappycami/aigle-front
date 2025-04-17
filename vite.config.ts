import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["albatros.prx", "localhost", "127.0.0.1"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@tests": path.resolve(__dirname, "./src/tests"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
    },
  },
});
