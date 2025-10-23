import { Meta, StoryObj } from "@storybook/vue3-vite"
import { expect, within } from "storybook/internal/test"

const meta = {} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const NormalAndDisable: Story = {
  render: () => (
    <div class="container center" style={{ flexDirection: "row", gap: "1rem" }}>
      <button>Normal</button>
      <button disabled>Disabled</button>
    </div>
  ),
}

NormalAndDisable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const normalButton = canvas.getByText("Normal")
  const disabledButton = canvas.getByText("Disabled")
  expect(normalButton).toBeInTheDocument()
  expect(disabledButton).toBeInTheDocument()
  expect(disabledButton).toBeDisabled()
}
