"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const TextField_1 = require("./TextField");
const meta = {
    title: "Components/TextField",
    component: TextField_1.TextField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
exports.default = meta;
exports.Default = {
    args: {
        label: "Text input",
        id: "story-input",
        name: "story",
        errorText: "guidance",
    },
};
