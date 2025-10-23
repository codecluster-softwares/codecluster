# Storybook Guidelines

## Story Structure

1. Use meta with `tags: ["autodocs"]` for SCSS stories.
2. Skip title, use default from file path.
3. Add doc comments above meta.
4. Render divs for style demos.
5. Include play functions.

## SCSS Stories Pattern

1. Import Meta and StoryObj from "@storybook/vue3-vite".
2. Create stories with render functions returning divs.
3. Use inline styles for layout.
4. Add play functions for accessibility.

## File Organization

1. Place stories with SCSS files.
2. Use `.stories.tsx` extension.
3. Follow `[component].stories.tsx` naming.
4. Group styles in container divs.
5. Include normal and disabled states.

## Testing

1. Use `expect` and `within` from "storybook/internal/test".
2. Test element presence and accessibility.
3. Verify disabled states.
4. Check visual states and layout.
5. Ensure responsive behavior.
