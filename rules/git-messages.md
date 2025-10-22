# Git Commit Message Guidelines

## Commit Message Generation Process

1. After completing any task, generate commit msg in `.commit.md` at workspace root.
2. Use `git status` cmd to identify changed files and their status.
3. Use `git diff` cmd to review specific changes in modified files.
4. Use `git diff --staged` cmd to review staged changes.
5. Use `git log --oneline -10` cmd to understand recent commit context.
6. Analyze changes to determine appropriate commit type and scope.
7. Detect user's lang from prompt context and generate additional commit msg in user's lang only when different from English.

## Commit Message Format

Follow this structured format for all commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Multi-language Support

When user's lang is different from English, append additional commit msg in user's lang after English version. If user's lang is English, only generate English version.

```
<type>(<scope>): <subject>

<body>

<footer>

---

<type>(<scope>): <translated_subject>

<translated_body>

<translated_footer>
```

- Use same commit type and scope for both versions.
- Translate subject, body, and footer content accurately.
- Maintain same structure and formatting rules.
- Separate lang versions with `---` on a single line.

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
- `merge`: Merge operations and conflict resolutions

### Scope (Optional)

Specify scope of change:

- Use dir name or component name affected
- Examples: `app`, `docs`, `scripts`, `config`
- Use `rules` as dedicated type for rule updates, not as scope

### Subject (Required)

- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize first letter
- No dot (.) at the end
- Keep it concise (50 characters or less)

### Body (Optional)

- Use imperative, present tense
- Include motivation for change and contrasts with previous behavior
- Wrap at 72 chars
- Explain what and why vs. how
- Use ordered lists for detailed desc
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
feat(docs): add multi-lang commit msg support

1. Detect user's lang from prompt context.
2. Generate additional commit msg in user's lang only when different from English.
3. Maintain same commit type and scope structure.
4. Separate lang versions with horizontal rule.

---

feat(docs): [translated subject]

1. [translated body point 1].
2. [translated body point 2].
3. [translated body point 3].
4. [translated body point 4].
```

## PR Message Generation Process

1. When user requests PR msg generation, generate PR msg in `.message.md` at workspace root.
2. Use `git diff main...HEAD` cmd to review changes between current branch and main branch (default).
3. If user explicitly specifies different base branch, use `git diff <base_branch>...HEAD` instead.
4. Analyze diff to understand scope and impact of changes.
5. Use `git log --oneline -10` cmd to understand recent commit context.
6. Detect user's lang from prompt context and generate additional PR msg in user's lang only when different from English.

## PR Message Format

Follow the same structured format as commit messages with multi-language support.

### Type, Scope, Subject, Body, Footer

Use the same definitions and requirements as commit messages.

## Examples

### Example 1: Feature PR message

Follow the same format as commit message examples, using `.message.md` file.

### Example 2: Multi-language PR message

Follow the same multi-language format as commit message examples, using `.message.md` file.

## Merge Conflict Resolution Process

Follow standard commit msg generation process with these merge-specific considerations:

1. When user requests to handle merge conflicts, resolve conflicts in affected files.
2. After resolving conflicts, generate commit msg in `.commit.md` at workspace root.
3. Use `merge` type for merge ops and conflict resolutions.
4. Use subject format: `merge: resolve conflicts from <source_branch> to <target_branch>`.
5. Follow standard multi-lang support rules.

### Merge-Specific Guidelines

- Subject must start with `merge:` prefix
- Specify source and target branches in format: `from <source_branch> to <target_branch>`
- Describe nature of conflicts resolved and key files affected
- Use ordered lists for detailed desc of resolution approach

## Examples

### Example 1: Basic merge conflict resolution

```
merge: resolve conflicts from feature/user-auth to main

1. Resolve conflicts in user authentication module.
2. Merge login functionality from feature branch.
3. Preserve main branch's error handling improvements.
4. Update configuration files to accommodate both changes.
```

### Example 2: Multi-language merge commit message

```
merge: resolve conflicts from feature/api-integration to develop

1. Resolve conflicts in API service layer.
2. Merge new endpoint impls from feature branch.
3. Preserve develop branch's perf optimizations.
4. Update docs to reflect merged changes.

---

merge: [translated subject]

1. [translated body point 1].
2. [translated body point 2].
3. [translated body point 3].
4. [translated body point 4].
```
