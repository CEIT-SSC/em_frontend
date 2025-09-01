import type { StoryObj } from "@storybook/react-vite";
declare const meta: {
    title: string;
    component: ({ label, id, name, type, errorText, guidance, placeholder, }: import("./TextField").TextFieldProps) => import("react").JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
