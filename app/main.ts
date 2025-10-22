import RootComponent from "@/main.vue"
import { createApp } from "vue"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

function* routes(): Generator<RouteRecordRaw> {
  yield {
    path: "/error/:title?/:message?",
    component: () => import("@/routes/error.vue"),
  }

  yield {
    path: "/:pathMatch(.*)*",
    component: () => import("@/routes/error.vue"),
    props: {
      title: "404 - Page Not Found",
      message: "Sorry, the page you are looking for does not exist.",
    },
  }

  const allRoutes = import.meta.glob("@/routes/**/*.vue")
  for (const [file, component] of Object.entries(allRoutes)) {
    let path = file
      .replace(/^\/routes/g, "")
      .replace(/\.vue$/g, "")
      .toLowerCase()

    if (window.__DOCS_MODE__) {
      if (path === "/home") continue
      if (path === "/hello") path = "/"
    } else {
      if (path === "/hello") continue
      if (path === "/home") path = "/"
    }
    yield { path, component }
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes()],
})

createApp(RootComponent).use(router).mount("div#app")
