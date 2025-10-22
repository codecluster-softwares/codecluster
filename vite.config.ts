import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { join } from "node:path"
import { env } from "node:process"
import { defineConfig } from "vite"
import { defineProject } from "vitest/config"

const root = import.meta.dirname
const appDir = join(root, "app")
const tauriDebug = env.TAURI_ENV_DEBUG === "true"

const testCode = defineProject({
  root,
  test: { include: [join(root, "@(app|scripts)/**/*.test.ts")] },
})

const testStorybook = defineProject({
  plugins: [
    storybookTest({ configDir: join(root, ".storybook") }),
    vue(),
    vueJsx(),
  ],
  root,
  test: {
    setupFiles: [join(root, ".storybook/vitest.setup.ts")],
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
  },
})

export default defineConfig({
  plugins: [vue(), vueJsx()],
  root: appDir,
  resolve: { alias: { "@": appDir } },
  define: {
    __DOCS_MODE__: JSON.stringify(env["DOCS_MODE"] === "true"),
  },

  // Server for development.
  server: {
    host: tauriDebug ? "localhost" : undefined,
    strictPort: tauriDebug,
    port: tauriDebug ? 1420 : undefined,
    hmr: tauriDebug
      ? { protocol: "ws", host: "localhost", port: 1421 }
      : undefined,
  },

  // Bundling options.
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

  // Vitest options.
  test: { projects: [testCode, testStorybook] },
})
