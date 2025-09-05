import type { StoryObj } from "@storybook/react-vite";
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./TextField").TextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
