import vue from "@vitejs/plugin-vue"
import { join } from "node:path"
import { env } from "node:process"
import { defineConfig } from "vite"

const root = import.meta.dirname
const appDir = join(root, "app")
const tauriDebug = env.TAURI_ENV_DEBUG === "true"

export default defineConfig({
  plugins: [vue()],
  root: appDir,
  resolve: { alias: { "@": appDir } },
  define: {
    __DOCS_MODE__: JSON.stringify(env["DOCS_MODE"] === "true"),
  },

  server: {
    host: tauriDebug ? "localhost" : undefined,
    strictPort: tauriDebug,
    port: tauriDebug ? 1420 : undefined,
    hmr: tauriDebug
      ? { protocol: "ws", host: "localhost", port: 1421 }
      : undefined,
  },

  css: { modules: { generateScopedName: "[hash:base64:8]" } },
  build: {
    outDir: join(root, "out"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "[hash].[ext]",
        chunkFileNames: "[hash].js",
        entryFileNames: "[hash].js",
      },
    },
  },
})
