/* eslint-env node */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
    // for unit and integration testing
    test: {
      // Allow using 'describe', 'it', 'expect' without explicit imports
      globals: true,
      // Simulate browser environment for React components
      environment: "jsdom",
      // Global setup file for custom matchers (like jest-dom)
      setupFiles: "./src/test-setup.js",
    },
  };
});