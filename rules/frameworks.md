# Framework Guidelines

1. Use `pnpm` only for Node pkg management.
2. Use `pnpm` and `cargo` only for commands.
3. Request human for new frameworks.

## Rules Management

1. Rules location: `rules/**/*.md`.
2. Rules copied to tools config files.
3. Update rules in `rules/**/*.md` when modified.
4. **MUST** run `pnpm prepare-rules` after **every** rules update.
5. **MUST** generate commit message after **every** task completion.

## Commit Message Generation

1. Generate commit messages into `.commit.md` file.
2. Use `git status` and `git diff` to review changes.
3. Use `git log --oneline -10` for context.
4. Follow commit message format from git-messages.md.
5. Include multi-lang support when user lang differs from English.
6. Base commit message on actual git changes, not context assumptions.
7. Keep commit message concise with line width control.

## Rule Writing Principle

1. Write rules concisely to minimize token usage.
2. Preserve original meaning while reducing length.
3. Use abbreviations when meaning remains clear.
4. Remove redundant descriptions and examples.
5. Focus on essential guidelines only.
