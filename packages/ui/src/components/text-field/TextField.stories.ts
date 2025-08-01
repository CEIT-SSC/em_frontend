import type { Meta, StoryObj } from '@storybook/react-vite';
import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Text input',
    id: 'story-input',
    name: 'story',
    guidance: 'guidance'
  },
};