import vue from "@vitejs/plugin-vue"
import { join } from "node:path"
import { env } from "node:process"
import { defineConfig } from "vite"

const root = import.meta.dirname
const appDir = join(root, "app")

export default defineConfig({
  plugins: [vue()],
  root: appDir,
  resolve: { alias: { "@": appDir } },
  define: {
    __DOCS_MODE__: JSON.stringify(env["DOCS_MODE"] === "true"),
  },
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
