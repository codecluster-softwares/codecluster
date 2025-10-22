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

- Same type/scope for both versions.
- Accurate translation.
- Separate with `---`.

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `perf`: Performance
- `test`: Tests
- `rules`: Rule changes
- `build`: Build system
- `chore`: Other changes
- `revert`: Revert commit
- `merge`: Merge operations

### Scope

- Use dir/component name: `app`, `docs`, `scripts`, `config`
- `rules` is type, not scope

### Subject

- Imperative present tense
- Lowercase first letter
- No ending dot
- Max 50 chars

### Body

- Imperative present tense
- Explain what/why vs how
- Use ordered lists
- Wrap at 72 chars
- Add trailing dots

### Footer

- Reference issues
- BREAKING CHANGE

## PR Messages

1. Generate PR msg in `.message.md`.
2. Use `git diff main...HEAD` for changes.
3. Same format as commit messages.

## Merge Conflicts

1. Resolve conflicts in files.
2. Generate commit msg in `.commit.md`.
3. Use `merge` type.
4. Subject: `merge: resolve conflicts from <source> to <target>`.
