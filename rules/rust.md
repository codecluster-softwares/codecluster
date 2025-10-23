# Rust Guidelines

## Code Style

1. Use `rustfmt` for formatting.
2. Follow naming conventions.
3. Use `cargo check` for linting.
4. Prefer functional over imperative style.
5. Use idiomatic patterns.

## Error Handling

1. Use `Result<T, E>` for fallible operations.
2. Prefer `thiserror` for custom errors.
3. Use `anyhow` for app-level errors.
4. Propagate errors with `?`.
5. Handle errors explicitly.

## Memory Management

1. Use ownership effectively.
2. Prefer borrowing over cloning.
3. Use `Arc`/`Rc` for shared ownership.
4. Use `Mutex`/`RwLock` for thread safety.
5. Avoid unnecessary allocations.

## Testing

1. Write unit tests for public APIs.
2. Use `#[cfg(test)]` for test modules.
3. Prefer integration tests for complex logic.
4. Use `tempfile` for file tests.
5. Mock external dependencies.

## Documentation

1. Write doc comments for public items.
2. Include examples.
3. Document error conditions.
4. Use `#[must_use]` when appropriate.
5. Document safety invariants.
