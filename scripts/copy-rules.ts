import chalk from "chalk"
import { consola } from "consola"
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"

/**
 * Configuration options for a tool that uses rules.
 */
export type ToolOptions = {
  name: string
  path: string
  kind: "file" | "dir"
}

/**
 * List of tools that use rules with their respective configurations.
 */
export const tools: ToolOptions[] = [
  { name: "Cline Code", path: ".clinerules", kind: "dir" },
  { name: "Claude Code", path: "CLAUDE.md", kind: "file" },
  { name: "Codex", path: "AGENTS.md", kind: "file" },
  { name: "Qwen Code", path: "QWEN.md", kind: "file" },
  { name: "Roo Code", path: ".roo/rules", kind: "dir" },
  { name: "VSCode", path: ".instructions.md", kind: "file" },
]

/**
 * Recursively copies all files from a source folder to a target folder.
 *
 * @param from - The source folder path to copy from.
 * @param to - The target folder path to copy to.
 * @returns The number of files successfully copied.
 */
export async function copyRulesFolder(
  from: string,
  to: string,
): Promise<number> {
  if (!existsSync(from)) {
    consola.warn(`Source folder does not exist: ${chalk.dim(from)}`)
    return 0
  }

  mkdirSync(to, { recursive: true })

  const items = readdirSync(from)
  const promises = items.map(async (item) => {
    const sourcePath = join(from, item)
    const targetPath = join(to, item)

    const stat = statSync(sourcePath)
    if (stat.isDirectory()) {
      return await copyRulesFolder(sourcePath, targetPath)
    } else {
      copyFileSync(sourcePath, targetPath)
      return 1
    }
  })

  const results = await Promise.all(promises)
  const fileCount = results.reduce((sum, count) => sum + count, 0)
  return fileCount
}

/**
 * Bundles multiple markdown files from a source directory into a single target file.
 *
 * @param from - The source directory containing .md files to bundle.
 * @param to - The target file path where bundled content will be written.
 * @returns The number of files successfully bundled.
 */
export async function bundleRuleFile(
  from: string,
  to: string,
): Promise<number> {
  if (!existsSync(from)) {
    consola.warn(`Source directory does not exist: ${chalk.dim(from)}`)
    return 0
  }

  const targetDir = dirname(to)
  mkdirSync(targetDir, { recursive: true })

  const items = readdirSync(from)
  const mdFiles = items.filter((item) => item.endsWith(".md"))

  if (mdFiles.length === 0) {
    consola.warn(`No .md files found in: ${chalk.dim(from)}`)
    return 0
  }

  const bundledContent = mdFiles
    .map((file, index) => {
      const filePath = join(from, file)
      const content = readFileSync(filePath, "utf-8")
      const separator = index < mdFiles.length - 1 ? "\n\n---\n\n" : ""
      return `<!-- ${file} -->\n\n${content}${separator}`
    })
    .join("")

  writeFileSync(to, bundledContent, "utf-8")

  return mdFiles.length
}

/**
 * Copies or bundles rules based on the tool configuration.
 *
 * @param from - The source directory containing rules to copy.
 * @param options - The tool configuration specifying how to handle the rules.
 * @returns The number of files processed (copied or bundled).
 */
export async function copyRules(
  from: string,
  options: ToolOptions,
): Promise<number> {
  const targetPath = options.path

  let fileCount = 0
  if (options.kind === "dir") {
    consola.start(`Copying rules for ${chalk.cyan(options.name)}...`)
    fileCount = await copyRulesFolder(from, targetPath)
    if (fileCount > 0) {
      consola.success(
        `Copied ${chalk.cyan(fileCount)} files to ${chalk.dim(targetPath)}`,
      )
    } else {
      consola.info(`No files copied to ${chalk.dim(targetPath)}`)
    }
  } else {
    consola.start(`Bundling rules for ${chalk.cyan(options.name)}...`)
    fileCount = await bundleRuleFile(from, targetPath)
    if (fileCount > 0) {
      consola.success(
        `Bundled ${chalk.cyan(fileCount)} files to ${chalk.dim(targetPath)}`,
      )
    } else {
      consola.info(`No files bundled to ${chalk.dim(targetPath)}`)
    }
  }

  return fileCount
}

/**
 * Copies rules for all specified tools.
 *
 * @param from - The source directory containing rules to copy.
 * @param options - Array of tool configurations to process.
 * @returns The number of tools that were successfully configured.
 */
export async function copyRulesAll(
  from: string,
  options: ToolOptions[],
): Promise<number> {
  const promises = options.map(async (tool) => {
    return await copyRules(from, tool)
  })

  const results = await Promise.all(promises)
  const successfulTools = results.filter((count) => count > 0).length

  consola.success(
    `Rules preparation completed! ${chalk.cyan(successfulTools)} tools configured.`,
  )
  return successfulTools
}
