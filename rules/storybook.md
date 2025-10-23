# Storybook Guidelines

## Story Structure

1. Use meta object with `tags: ["autodocs"]` for all SCSS stories.
2. Skip title, use default generated from file path.
3. Add documentation comments above meta object.
4. Render div elements directly for style demonstrations.
5. Include play functions for interactive testing.

## SCSS Stories Pattern

1. Import Meta and StoryObj from "@storybook/vue3-vite".
2. Create stories with render functions returning div elements.
3. Use inline styles for layout demonstration.
4. Add play functions for accessibility and behavior testing.

## File Organization

1. Place stories alongside corresponding SCSS files.
2. Use `.stories.tsx` extension for TypeScript stories.
3. Follow naming convention: `[component].stories.tsx`.
4. Group related styles in container divs.
5. Include both normal and disabled states when applicable.

## Testing

1. Use `expect` and `within` from "storybook/internal/test".
2. Test element presence and accessibility attributes.
3. Verify disabled states for interactive elements.
4. Check visual states and layout correctness.
5. Ensure responsive behavior across view ports.
