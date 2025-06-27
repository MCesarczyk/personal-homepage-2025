import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react(), tailwindcss()],
    define: {
      "import.meta.env": {},
    },
    server: {
      port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 4200,
      host: true,
    },
    base: "/",
  };
});
