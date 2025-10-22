import { join, normalize } from "node:path"
import { copyRulesAll, tools } from "./copy-rules.ts"

const root = normalize(join(import.meta.dirname, ".."))
await copyRulesAll(join(root, "rules"), tools)
