# Architecture Guidelines

## Project Structure

1. `app/` directory contains frontend application code.
2. `code/` directory contains backend and core logic code.
3. Frontend uses Vue 3 with TypeScript and SCSS.
4. Backend uses Rust with Tauri framework.
5. Separate concerns between UI and business logic.
6. Use consistent naming conventions across directories.
7. Maintain clear separation between frontend and backend modules.
8. Follow established patterns for component and route organization.

## Framework Usage

1. Use `pnpm` only for Node pkg management.
2. Use `pnpm` and `cargo` only for commands.
3. Request human for new frameworks.

## Rule Writing Principle

1. Write rules concisely to minimize token usage.
2. Preserve original meaning while reducing length.
3. Use abbreviations when meaning remains clear.
4. Remove redundant descriptions and examples.
5. Focus on essential guidelines only.
