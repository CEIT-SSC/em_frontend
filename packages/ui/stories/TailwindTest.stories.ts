import type { Meta, StoryObj } from "@storybook/react-vite";
import { TailwindTest } from "./TailwindTest";

const meta = {
  title: "Example/TailwindTest",
  component: TailwindTest,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TailwindTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
