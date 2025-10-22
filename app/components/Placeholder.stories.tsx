import { Meta, StoryObj } from "@storybook/vue3-vite"
import { expect, within } from "storybook/internal/test"
import Placeholder from "./Placeholder.vue"

const meta = {
  component: Placeholder,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const text = "Placeholder"

export const Default: Story = {
  render: () => <Placeholder>{text}</Placeholder>,
}

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const placeholder = canvas.getByText(text)
  expect(placeholder).toBeInTheDocument()
}
