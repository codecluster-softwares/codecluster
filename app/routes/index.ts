import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

function* routes(
  raw: Record<string, () => Promise<unknown>>,
  prefix: RegExp | undefined = /^\/routes\/[\w-]+/g,
): Generator<RouteRecordRaw> {
  for (const [file, component] of Object.entries(raw)) {
    let path = file.replace(/\.vue$/g, "").replace(/\/index$/g, "")
    if (prefix) path = path.replace(prefix, "")
    if (path.length === 0) path = "/"
    yield { path, component }
  }
}

const common = [...routes(import.meta.glob("@/routes/common/**/*.vue"))]
const docs = [...routes(import.meta.glob("@/routes/docs/**/*.vue"))]
const tauri = [...routes(import.meta.glob("@/routes/tauri/**/*.vue"))]

export default createRouter({
  history: createWebHistory(),
  routes: window.__DOCS_MODE__ ? [...common, ...docs] : [...common, ...tauri],
})
