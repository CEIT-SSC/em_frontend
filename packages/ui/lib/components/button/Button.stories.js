"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Outline = exports.Small = exports.Large = exports.Secondary = exports.Primary = void 0;
const test_1 = require("storybook/test");
const Button_1 = require("./Button");
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Components/Button",
    component: Button_1.Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: (0, test_1.fn)() },
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
exports.Primary = {
    args: {
        variant: Button_1.ButtonVariant.PRIMARY,
        label: "Button",
    },
};
exports.Secondary = {
    args: {
        label: "Button",
    },
};
exports.Large = {
    args: {
        size: Button_1.ButtonSize.LARGE,
        variant: Button_1.ButtonVariant.PRIMARY,
        label: "Button",
    },
};
exports.Small = {
    args: {
        size: Button_1.ButtonSize.SMALL,
        variant: Button_1.ButtonVariant.PRIMARY,
        label: "Button",
    },
};
exports.Outline = {
    args: {
        variant: Button_1.ButtonVariant.OUTLINE,
        label: "Button",
    },
};
