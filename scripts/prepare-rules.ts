import { join } from "node:path"
import { copyRulesAll, tools } from "./copy-rules"
import { root } from "./utils"

await copyRulesAll(join(root, "rules"), tools)
