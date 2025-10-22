import { beforeEach, describe, expect, test, vi } from "vitest"
import { copyRules, copyRulesAll, tools } from "./copy-rules"

// Mock file system operations
vi.mock("node:fs", () => ({
  copyFileSync: vi.fn(),
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  readdirSync: vi.fn().mockReturnValue([]),
  readFileSync: vi.fn(),
  statSync: vi.fn(),
  writeFileSync: vi.fn(),
}))

vi.mock("node:path", () => ({
  dirname: vi.fn((path) => path.split("/").slice(0, -1).join("/") || "."),
  join: vi.fn((...paths) => paths.join("/")),
}))

// Mock consola with factory function
vi.mock("consola", () => ({
  consola: {
    warn: vi.fn(),
    info: vi.fn(),
    start: vi.fn(),
    success: vi.fn(),
  },
}))

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs"

import { consola } from "consola"

describe("copy-rules", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("copyRulesAll", () => {
    test("should process all tools and return successful count", async () => {
      // Mock file system to simulate successful processing
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(statSync).mockReturnValue({
        isDirectory: () => false,
        isFile: () => true,
        size: 100,
      } as any)
      vi.mocked(readdirSync).mockReturnValue(["rule1.md", "rule2.md"] as any)
      vi.mocked(readFileSync).mockReturnValue("# Test Rule Content")

      const successfulTools = await copyRulesAll("./rules", tools)

      // Should process all tools successfully
      expect(successfulTools).toBe(tools.length)
      // Should call mkdirSync for directory tools with correct paths
      expect(mkdirSync).toHaveBeenCalledWith(".clinerules", { recursive: true })
      expect(mkdirSync).toHaveBeenCalledWith(".roo/rules", { recursive: true })
      // Should NOT call mkdirSync for current directory (.)
      // Should log total rules size
      expect(consola.info).toHaveBeenCalledWith(
        expect.stringContaining("Total rules size:"),
      )
      // Should log completion message
      expect(consola.success).toHaveBeenCalledWith(
        expect.stringContaining("Rules preparation completed!"),
      )
    })

    test("should handle non-existent source directory gracefully", async () => {
      vi.mocked(existsSync).mockReturnValue(false)

      const successfulTools = await copyRulesAll("./non-existent-dir", tools)

      // Should return 0 when source doesn't exist
      expect(successfulTools).toBe(0)
      // Should log warning
      expect(consola.warn).toHaveBeenCalledWith(
        expect.stringContaining("does not exist"),
      )
    })
  })

  describe("copyRules", () => {
    test("should copy files to directory target", async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(readdirSync).mockReturnValue(["rule1.md", "rule2.md"] as any)
      vi.mocked(statSync).mockReturnValue({
        isDirectory: () => false,
        isFile: () => true,
        size: 100,
      } as any)

      const tool = {
        name: "Test Tool",
        path: "./test-output",
        kind: "dir" as const,
      }
      const fileCount = await copyRules("./rules", tool)

      expect(fileCount).toBe(2) // Should process 2 files
      expect(mkdirSync).toHaveBeenCalledWith("./test-output", {
        recursive: true,
      })
      // Should log start and success messages with chalk formatting
      expect(consola.start).toHaveBeenCalledWith(
        expect.stringContaining("Test Tool"),
      )
      expect(consola.success).toHaveBeenCalledWith(
        expect.stringContaining("2 files"),
      )
    })

    test("should bundle files to single file target", async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(readdirSync).mockReturnValue(["rule1.md", "rule2.md"] as any)
      vi.mocked(readFileSync).mockReturnValue("# Test Rule Content")

      const tool = {
        name: "Test Tool",
        path: "./test-bundle.md",
        kind: "file" as const,
      }
      const fileCount = await copyRules("./rules", tool)

      expect(fileCount).toBe(2) // Should bundle 2 files
      expect(writeFileSync).toHaveBeenCalledWith(
        "./test-bundle.md",
        expect.any(String),
        "utf-8",
      )
      // Should log start and success messages with chalk formatting
      expect(consola.start).toHaveBeenCalledWith(
        expect.stringContaining("Test Tool"),
      )
      expect(consola.success).toHaveBeenCalledWith(
        expect.stringContaining("2 files"),
      )
    })

    test("should return 0 for non-existent source", async () => {
      vi.mocked(existsSync).mockReturnValue(false)

      const tool = {
        name: "Test Tool",
        path: "./test-output",
        kind: "dir" as const,
      }
      const fileCount = await copyRules("./non-existent-dir", tool)

      expect(fileCount).toBe(0)
      // Should log warning for non-existent source
      expect(consola.warn).toHaveBeenCalledWith(
        expect.stringContaining("does not exist"),
      )
    })

    test("should log info when no files are processed", async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(readdirSync).mockReturnValue([] as any)

      const tool = {
        name: "Test Tool",
        path: "./test-output",
        kind: "dir" as const,
      }
      const fileCount = await copyRules("./rules", tool)

      expect(fileCount).toBe(0)
      // Should log info message when no files are processed
      expect(consola.info).toHaveBeenCalledWith(
        expect.stringContaining("No files copied"),
      )
    })
  })

  describe("consola output format", () => {
    test("should use chalk formatting in consola messages", async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(readdirSync).mockReturnValue(["rule1.md"] as any)
      vi.mocked(statSync).mockReturnValue({
        isDirectory: () => false,
        isFile: () => true,
        size: 100,
      } as any)

      const tool = {
        name: "Test Tool",
        path: "./test-output",
        kind: "dir" as const,
      }
      await copyRules("./rules", tool)

      // Verify consola methods are called with formatted messages
      expect(consola.start).toHaveBeenCalled()
      expect(consola.success).toHaveBeenCalled()
      expect(consola.start).toHaveBeenCalledWith(
        expect.stringContaining("Test Tool"),
      )
      expect(consola.success).toHaveBeenCalledWith(
        expect.stringContaining("1 files"),
      )
    })

    test("should log total rules size with chalk formatting", async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(readdirSync).mockReturnValue(["rule1.md"] as any)
      vi.mocked(statSync).mockReturnValue({
        isDirectory: () => false,
        isFile: () => true,
        size: 150,
      } as any)

      await copyRulesAll("./rules", tools)

      // Verify total rules size is logged with chalk formatting
      expect(consola.info).toHaveBeenCalledWith(
        expect.stringContaining("Total rules size:"),
      )
      expect(consola.success).toHaveBeenCalledWith(
        expect.stringContaining("tools configured"),
      )
      expect(consola.success).toHaveBeenCalledWith(
        expect.stringContaining("bytes total"),
      )
    })
  })
})
