import type { Preview } from "@storybook/vue3-vite"
import "../app/themes.scss"
import "./decorator.scss"

const preview: Preview = {
  decorators: [],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "todo" },
  },
}

export default preview
