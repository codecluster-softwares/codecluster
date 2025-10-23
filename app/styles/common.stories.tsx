import { Meta, StoryObj } from "@storybook/vue3-vite"
import { expect, within } from "storybook/internal/test"

const meta = {} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const ContainerCenter: Story = {
  render: () => <div class="container center">Container Center</div>,
}

ContainerCenter.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textElement = canvas.getByText("Container Center")
  expect(textElement).toBeInTheDocument()
}
