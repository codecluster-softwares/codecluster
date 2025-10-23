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
 * Recursively copies all files and subdirectories from source to target.
 *
 * Performs deep copy operation traversing entire directory tree.
 * Handles both files and nested directories recursively.
 *
 * 1. Creates target directory if it doesn't exist.
 * 2. Reads all items in source directory.
 * 3. For directories: recursively copies subdirectory.
 * 4. For files: copies file directly.
 * 5. Processes all copy operations concurrently.
 *
 * @param from - Source folder path to copy from.
 * @param to - Target folder path to copy to.
 * @returns Promise resolving when all copy operations complete.
 */
export async function copyRulesFolder(from: string, to: string): Promise<void> {
  if (!existsSync(from)) {
    consola.warn(`Source folder does not exist: ${chalk.dim(from)}`)
    return
  }

  mkdirSync(to, { recursive: true })
  const promises = readdirSync(from).map(async (item) => {
    const sourcePath = join(from, item)
    const targetPath = join(to, item)
    const stat = statSync(sourcePath)
    if (stat.isDirectory()) return await copyRulesFolder(sourcePath, targetPath)
    copyFileSync(sourcePath, targetPath)
  })

  await Promise.all(promises)
}

/**
 * Bundles multiple markdown files into single target file.
 *
 * Reads all .md files from source directory and combines them.
 * Creates bundled file with proper separators and file headers.
 *
 * 1. Creates target directory if needed.
 * 2. Filters for .md files only.
 * 3. Reads each file's content.
 * 4. Combines content with file headers and separators.
 * 5. Writes bundled content to target file.
 *
 * Each file wrapped in comment header with filename.
 * Files separated by '---' markers for clear boundaries.
 *
 * @param from - Source directory containing .md files to bundle.
 * @param to - Target file path where bundled content written.
 * @returns Number of markdown files successfully bundled.
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
  if (targetDir !== ".") mkdirSync(targetDir, { recursive: true })

  const mdFiles = readdirSync(from).filter((item) => item.endsWith(".md"))
  if (mdFiles.length === 0) {
    consola.warn(`No .md files found in: ${chalk.dim(from)}`)
    return 0
  }

  const bundledContent = mdFiles
    .map((file, index) => {
      const filePath = join(from, file)
      const content = readFileSync(filePath, "utf-8").trim()
      const separator = index < mdFiles.length - 1 ? "\n\n---\n\n" : ""
      return `<!-- ${file} -->\n\n${content}${separator}`
    })
    .join("")

  writeFileSync(to, bundledContent, "utf-8")
  return mdFiles.length
}

/**
 * Copies or bundles rules based on tool configuration.
 *
 * Routes rule processing based on tool configuration.
 * For directory tools: recursively copies all files.
 * For file tools: bundles markdown files into single file.
 *
 * Provides progress logging and returns files processed.
 * Directory copies return 1 if successful.
 * File bundles return actual markdown files count.
 *
 * @param from - Source directory containing rules to copy.
 * @param options - Tool configuration specifying rule handling.
 * @returns Files processed (1 for directory, actual count for file).
 */
export async function copyRules(
  from: string,
  options: ToolOptions,
): Promise<number> {
  const targetPath = options.path

  let fileCount = 0
  if (options.kind === "dir") {
    consola.start(`Copying rules for ${chalk.cyan(options.name)}...`)
    await copyRulesFolder(from, targetPath)
    // For directory copy, we don't track exact file count
    // Check if source exists to determine success
    fileCount = existsSync(from) ? 1 : 0
    if (fileCount > 0) {
      consola.success(`Copied rules to ${chalk.dim(targetPath)}`)
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
 * Calculates total size in bytes of markdown rule files.
 *
 * Scans source directory and sums file sizes of all .md files.
 * Ignores directories and non-markdown files.
 * Provides accurate measurement of rule content size.
 *
 * 1. Checks if source directory exists.
 * 2. Iterates through all items in directory.
 * 3. For each .md file: adds size to total.
 * 4. Returns cumulative size in bytes.
 *
 * @param from - Source directory containing rules to calculate size.
 * @returns Total size in bytes of all markdown rule files.
 */
export function calculateTotalRulesSize(from: string): number {
  if (!existsSync(from)) {
    consola.warn(`Source directory does not exist: ${chalk.dim(from)}`)
    return 0
  }

  let totalSize = 0
  readdirSync(from).forEach((item) => {
    const filePath = join(from, item)
    const stat = statSync(filePath)
    if (stat.isFile() && item.endsWith(".md")) totalSize += stat.size
  })
  return totalSize
}

/**
 * Copies rules for all specified tools in parallel.
 *
 * Orchestrates rule copying process for multiple tools simultaneously.
 * Calculates total rules size upfront.
 * Processes all tool configurations concurrently.
 *
 * 1. Calculates total size of markdown rule files.
 * 2. Processes all tool configurations in parallel.
 * 3. Tracks successful tool configurations.
 * 4. Provides comprehensive completion summary.
 *
 * @param from - Source directory containing rules to copy.
 * @param options - Array of tool configurations to process.
 * @returns Number of tools successfully configured.
 */
export async function copyRulesAll(
  from: string,
  options: ToolOptions[],
): Promise<number> {
  const totalRulesSize = calculateTotalRulesSize(from)
  consola.info(`Total rules size: ${chalk.cyan(totalRulesSize)} bytes`)

  const promises = options.map(async (tool) => await copyRules(from, tool))
  const results = await Promise.all(promises)
  const successfulTools = results.filter((count) => count > 0).length

  consola.success(
    `Rules preparation completed! ` +
      `${chalk.cyan(successfulTools)} tools configured, ` +
      `${chalk.cyan(totalRulesSize)} bytes total.`,
  )
  return successfulTools
}
