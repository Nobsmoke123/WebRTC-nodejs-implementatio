import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "02e8-2c0f-2a80-14-a010-e69d-a643-8799-22a2.ngrok-free.app",
      "localhost",
    ],
  },
});
