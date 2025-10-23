# Git Commit Message Format

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Multi-lang Support

```
<type>(<scope>): <subject>

<body>

<footer>

---

<type>(<scope>): <translated_subject>

<translated_body>

<translated_footer>
```

1. Same type/scope for both versions.
2. Accurate translation.
3. Separate with `---`.
4. Scope is optional, can be omitted.

### Types

1. `feat`: New feature.
2. `fix`: Bug fix.
3. `docs`: Documentation.
4. `perf`: Performance.
5. `test`: Tests.
6. `rules`: Rule changes.
7. `build`: Build system.
8. `chore`: Other changes.
9. `revert`: Revert commit.
10. `merge`: Merge operations.

### Scope

1. Optional: use dir/component name: `app`, `docs`, `scripts`, `config`.
2. Omit scope when not applicable.
3. `rules` is type, not scope.

### Subject

1. Imperative present tense.
2. Lowercase first letter.
3. No ending dot.
4. Max 50 chars.

### Body

1. Imperative present tense.
2. Explain what/why vs how.
3. Use ordered lists.
4. Wrap at 72 chars.
5. Add trailing dots.

### Footer

1. Reference issues.
2. BREAKING CHANGE.

## Task Completion

1. Generate commit message into `.commit.md` when task completes.
2. Use appropriate type based on changes made.
3. Include all significant changes in commit message.
4. Generate bilingual commit message when user asked in non-English language.
5. Follow multi-lang format: English first, then translation.
6. Human executes `git add . && git commit -F .commit.md`.
7. Human removes `.commit.md` after successful commit.

## PR Messages

1. Generate PR msg in `.message.md`.
2. Use `git diff main...HEAD` for changes.
3. Same format as commit messages.

## Merge Conflicts

1. Resolve conflicts in files.
2. Generate commit msg in `.commit.md`.
3. Use `merge` type.
4. Subject: `merge: resolve conflicts from <source> to <target>`.
