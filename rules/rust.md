# Rust Programming Guidelines

## Code Style

1. Use `rustfmt` for code formatting.
2. Follow Rust naming conventions.
3. Use `cargo check` for linting.
4. Prefer functional style over imperative.
5. Use idiomatic Rust patterns.

## Error Handling

1. Use `Result<T, E>` for fallible operations.
2. Prefer `thiserror` for custom error types.
3. Use `anyhow` for application-level errors.
4. Propagate errors with `?` operator.
5. Handle errors explicitly when needed.

## Memory Management

1. Use ownership system effectively.
2. Prefer borrowing over cloning.
3. Use `Arc`/`Rc` for shared ownership.
4. Use `Mutex`/`RwLock` for thread safety.
5. Avoid unnecessary heap allocations.

## Testing

1. Write unit tests for all public APIs.
2. Use `#[cfg(test)]` for test modules.
3. Prefer integration tests for complex logic.
4. Use `tempfile` for file system tests.
5. Mock external dependencies.

## Documentation

1. Write doc comments for all public items.
2. Include examples in documentation.
3. Document error conditions.
4. Use `#[must_use]` when appropriate.
5. Document safety invariants for unsafe code.
