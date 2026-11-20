import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Text input",
    id: "story-input",
    name: "story",
    placeholder: "Enter your name",
  },
};

export const WithGuidance: Story = {
  args: { label: "Email", id: "email-help", name: "email", type: "email", guidance: "Use the email associated with your account." },
};

export const WithError: Story = {
  args: { label: "Email", id: "email-error-story", name: "email", type: "email", errorText: "Enter a valid email address." },
};

export const Disabled: Story = {
  args: { label: "Name", id: "disabled-name", name: "name", disabled: true, value: "SSC member" },
};
