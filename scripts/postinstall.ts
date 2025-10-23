import { join } from "node:path"
import { copyRulesAll, tools } from "./copy-rules"
import { root, run } from "./utils"

await run("playwright install", { log: true })
await run("husky install", { log: true })
await copyRulesAll(join(root, "rules"), tools)
