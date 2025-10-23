import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { beforeEach, describe, expect, test, vi } from "vitest"
import {
  bundleRuleFile,
  calculateTotalRulesSize,
  copyRulesFolder,
} from "./copy-rules"

vi.mock("node:fs")
vi.mock("node:path")
vi.mock("consola", () => ({
  consola: {
    warn: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    start: vi.fn(),
  },
}))

describe("copyRulesFolder", () => {
  beforeEach(() => vi.clearAllMocks())

  test("skip when source folder not exist", async () => {
    vi.mocked(existsSync).mockReturnValue(false)

    await copyRulesFolder("/nonexistent", "/target")

    expect(existsSync).toHaveBeenCalledWith("/nonexistent")
    expect(mkdirSync).not.toHaveBeenCalled()
  })

  test("copy files recursively", async () => {
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(readdirSync).mockReturnValue(["file1.md", "subdir"] as any)
    vi.mocked(statSync).mockImplementation((path: string) => {
      const stat = { isDirectory: vi.fn() }
      if (path && path.includes("subdir")) {
        stat.isDirectory.mockReturnValue(true)
      } else {
        stat.isDirectory.mockReturnValue(false)
      }
      return stat as any
    })
    vi.mocked(join)
      .mockReturnValueOnce("/source/file1.md")
      .mockReturnValueOnce("/target/file1.md")
      .mockReturnValueOnce("/source/subdir")
      .mockReturnValueOnce("/target/subdir")

    await copyRulesFolder("/source", "/target")

    expect(mkdirSync).toHaveBeenCalledWith("/target", { recursive: true })
    expect(copyFileSync).toHaveBeenCalledWith(
      "/source/file1.md",
      "/target/file1.md",
    )
  })
})

describe("bundleRuleFile", () => {
  beforeEach(() => vi.clearAllMocks())

  test("return 0 when source directory not exist", async () => {
    vi.mocked(existsSync).mockReturnValue(false)
    const result = await bundleRuleFile("/nonexistent", "/target.md")
    expect(result).toBe(0)
  })

  test("bundle markdown files with separators", async () => {
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(readdirSync).mockReturnValue(["rule1.md", "rule2.md"] as any)
    vi.mocked(readFileSync)
      .mockReturnValueOnce("Content 1")
      .mockReturnValueOnce("Content 2")
    vi.mocked(join)
      .mockReturnValueOnce("/source/rule1.md")
      .mockReturnValueOnce("/source/rule2.md")

    const result = await bundleRuleFile("/source", "/target.md")

    expect(result).toBe(2)
    expect(writeFileSync).toHaveBeenCalledWith(
      "/target.md",
      "<!-- rule1.md -->\n\nContent 1\n\n---\n\n<!-- rule2.md -->\n\nContent 2",
      "utf-8",
    )
  })

  test("return 0 when no markdown files found", async () => {
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(readdirSync).mockReturnValue(["file.txt", "config.json"] as any)
    const result = await bundleRuleFile("/source", "/target.md")
    expect(result).toBe(0)
  })
})

describe("calculateTotalRulesSize", () => {
  beforeEach(() => vi.clearAllMocks())

  test("return 0 when source directory not exist", () => {
    vi.mocked(existsSync).mockReturnValue(false)
    const result = calculateTotalRulesSize("/nonexistent")
    expect(result).toBe(0)
  })

  test("calculate total size of markdown files only", () => {
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(readdirSync).mockReturnValue([
      "rule1.md",
      "rule2.md",
      "config.json",
    ] as any)
    vi.mocked(statSync).mockImplementation((path: string) => {
      const size = path.includes("rule1")
        ? 100
        : path.includes("rule2")
          ? 200
          : 50
      const stat = { size, isFile: vi.fn().mockReturnValue(true) }
      return stat as any
    })
    vi.mocked(join)
      .mockReturnValueOnce("/source/rule1.md")
      .mockReturnValueOnce("/source/rule2.md")
      .mockReturnValueOnce("/source/config.json")

    const result = calculateTotalRulesSize("/source")
    expect(result).toBe(300)
  })

  test("ignore directories", () => {
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(readdirSync).mockReturnValue(["rule1.md", "subdir"] as any)
    vi.mocked(statSync).mockImplementation((path: string) => {
      const stat = { size: 100, isFile: vi.fn() }
      if (path.includes("subdir")) {
        stat.isFile.mockReturnValue(false)
      } else {
        stat.isFile.mockReturnValue(true)
      }
      return stat as any
    })
    vi.mocked(join)
      .mockReturnValueOnce("/source/rule1.md")
      .mockReturnValueOnce("/source/subdir")

    const result = calculateTotalRulesSize("/source")
    expect(result).toBe(100)
  })
})
