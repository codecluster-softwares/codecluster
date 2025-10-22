# Git Commit Message Guidelines

## Commit Message Generation Process

1. After completing any task, generate a commit message in `.message.md` file at workspace root.
2. Use `git status` command to identify changed files and their status.
3. Use `git diff` command to review specific changes in modified files.
4. Use `git diff --staged` command to review staged changes.
5. Use `git log --oneline -10` command to understand recent commit context.
6. Analyze the changes to determine the appropriate commit type and scope.
7. Detect user's language from prompt context and generate additional commit message in user's language only when different from English.

## Commit Message Format

Follow this structured format for all commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Multi-language Support

When user's language is different from English, append an additional commit message in user's language after the English version. If user's language is English, only generate the English version.

```
<type>(<scope>): <subject>

<body>

<footer>

---

<type>(<scope>): <translated_subject>

<translated_body>

<translated_footer>
```

- Use the same commit type and scope for both versions.
- Translate subject, body, and footer content accurately.
- Maintain the same structure and formatting rules.
- Separate language versions with `---` on a single line.

### Type (Required)

Use one of these commit types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `rules`: Changes about the rules
- `build`: Changes that affect the build system or external dependencies
- `chore`: Other changes that had not been classified
- `revert`: Reverts a previous commit

### Scope (Optional)

Specify the scope of the change:

- Use the directory name or component name affected
- Examples: `app`, `docs`, `scripts`, `config`
- Use `rules` as a dedicated type for rule updates, not as scope

### Subject (Required)

- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize first letter
- No dot (.) at the end
- Keep it concise (50 characters or less)

### Body (Optional)

- Use imperative, present tense
- Include motivation for the change and contrasts with previous behavior
- Wrap at 72 characters
- Explain what and why vs. how
- Use ordered lists for detailed descriptions
- Add trailing dots for all list items

### Footer (Optional)

- Reference issue tracker IDs
- BREAKING CHANGE: if any breaking changes

## Examples

### Example 1: Adding new features

```
feat(app): add user authentication system

1. Implement login and registration functionality.
2. Add password hashing and validation.
3. Create session management system.
4. Include error handling for authentication failures.
```

### Example 2: Multi-language commit message

```
feat(docs): add multi-language commit message support

1. Detect user's language from prompt context.
2. Generate additional commit message in user's language only when different from English.
3. Maintain same commit type and scope structure.
4. Separate language versions with horizontal rule.

---

feat(docs): [translated subject]

1. [translated body point 1].
2. [translated body point 2].
3. [translated body point 3].
4. [translated body point 4].
```
