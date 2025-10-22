# Framework Guidelines

1. Use `pnpm` as Node's package manager, don't use other package managers.
2. Only use `pnpm` and `cargo` to run commands, don't use other command runners.
3. Don't add any new frameworks, request human to do that when necessary.

## Rules Guidelines

1. All rules are located at: `rules/**/*.md`.
2. All rules will be copied|merged into many tools' config files|dirs.
3. When user asked modify rules, update corresponding rules in `rules/**/*.md`.
4. Once rules updated, run `pnpm prepare-rules` to update.
