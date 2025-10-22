# Git Commit Message Guidelines

## Commit Message Generation Process

1. After completing any task, generate a commit message in `.message.md` file at workspace root.
2. Use `git status` command to identify changed files and their status.
3. Use `git diff` command to review specific changes in modified files.
4. Use `git diff --staged` command to review staged changes.
5. Use `git log --oneline -5` command to understand recent commit context.
6. Analyze the changes to determine the appropriate commit type and scope.

## Commit Message Format

Follow this structured format for all commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type (Required)

Use one of these commit types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
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

### Example 1: Adding new rules

```
feat(rules): add git commit message guidelines

1. Create comprehensive git commit message rules.
2. Define commit message format and structure.
3. Provide examples for different change types.
4. Document command usage for change analysis.

Closes #123
```

### Example 2: Fixing a bug

```
fix(app): resolve component rendering issue

1. Fix race condition in component lifecycle.
2. Add proper error handling for async operations.
3. Update component tests to cover edge cases.

Fixes #456
```

### Example 3: Documentation update

```
docs(readme): update installation instructions

1. Add pnpm installation steps.
2. Include environment setup requirements.
3. Clarify configuration options.
4. Fix broken links in documentation.
```

### Example 4: Refactoring code

```
refactor(scripts): improve rule preparation logic

1. Extract file copying into separate function.
2. Add error handling for file operations.
3. Improve code readability with better variable names.
4. Remove duplicate code patterns.
```

### Example 5: Configuration change

```
chore(config): update prettier configuration

1. Add new file patterns to prettierignore.
2. Update line length limit to 100 characters.
3. Configure trailing commas for ES5 compatibility.
4. Set tab width to 2 spaces.
```
