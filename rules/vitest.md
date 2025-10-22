# Vitest Testing Guidelines

## Test Purpose

1. Test behavior and logic, not static data.
2. Focus on edge cases and error conditions.
3. Verify actual functionality, not implementation details.
4. Ensure tests provide value beyond code compilation.

## Test Anti-patterns

1. Don't test static configuration arrays or objects.
2. Avoid testing TypeScript type definitions.
3. Don't duplicate source code in test assertions.
4. Avoid testing trivial getters/setters without logic.
5. Don't write UI tests in TypeScript test files - use Storybook stories instead.
6. Avoid superficial assertions like `expect(fn).toHaveBeenCalled()` without verifying specific arguments or behavior.

## Test Structure

1. Use descriptive test names explaining expected behavior.
2. Group related tests in describe blocks.
3. Test one concept per test case.
4. Use beforeEach/afterEach for test setup/teardown.

## Best Practices

1. Mock external dependencies appropriately.
2. Test both success and failure scenarios.
3. Keep tests independent and isolated.
4. Use meaningful assertions with clear failure messages.
5. Write UI component tests in Storybook stories, not in .test.ts files.
6. Use vi.mock() for file system operations instead of actual file I/O.
7. Verify mock function calls with specific arguments and expected behavior.
8. Test both positive and negative scenarios for comprehensive coverage.
