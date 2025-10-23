import { join } from "node:path"
import { copyRulesAll, tools } from "./copy-rules"
import { root, run } from "./utils"

await run("husky install", { log: true })
await copyRulesAll(join(root, "rules"), tools)
