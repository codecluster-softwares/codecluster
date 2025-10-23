import App from "@/app.vue"
import locales from "@/locales"
import router from "@/routes"
import { createApp } from "vue"

createApp(App).use(router).use(locales).mount("div#app")
