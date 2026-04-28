import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ["nest-aside-drench.ngrok-free.dev"],
  },
});