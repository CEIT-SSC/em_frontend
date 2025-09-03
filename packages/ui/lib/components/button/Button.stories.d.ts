import type { StoryObj } from "@storybook/react-vite";
declare const meta: {
    title: string;
    component: ({ label, variant, size, loading, className, prefixIcon: PrefixIcon, suffixIcon: SuffixIcon, onClick, }: import("./Button").ButtonProps) => import("react").JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
    args: {
        onClick: import("storybook/internal/test").Mock<(...args: any[]) => any>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Large: Story;
export declare const Small: Story;
export declare const Outline: Story;
