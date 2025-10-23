# Vitest Testing Guidelines

## Test Purpose

1. Test behavior/logic, not static data.
2. Focus on edge cases and errors.
3. Verify functionality, not implementation.
4. Ensure tests provide value.

## Test Anti-patterns

1. Don't test static config arrays/objects.
2. Avoid testing TypeScript types.
3. Don't duplicate source in assertions.
4. Avoid testing trivial getters/setters.
5. Don't write UI tests in `xxx.test.ts` - use Storybook instead.
6. Avoid superficial assertions like `expect(fn).toHaveBeenCalled()` without verifying args/behavior.

## Test Structure

1. Use `test` instead of `it`.
2. Keep descriptions concise without "should".
3. Group tests in describe blocks.
4. Test one concept per case.
5. Use beforeEach/afterEach for setup/teardown.

## Best Practices

1. Mock external deps appropriately.
2. Test success/failure scenarios.
3. Keep tests independent.
4. Use meaningful assertions.
5. Write UI tests in Storybook, not .test.ts.
6. Use vi.mock() for file ops.
7. Verify mock calls with specific args.
8. Test positive/negative scenarios.
