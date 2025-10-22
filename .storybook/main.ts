import type { StorybookConfig } from "@storybook/vue3-vite"

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.tsx"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
}

export default config
