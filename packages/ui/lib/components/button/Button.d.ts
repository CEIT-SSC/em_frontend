import React from "react";
import { IconType } from "react-icons";
export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    label?: string;
    className?: string;
    prefixIcon?: IconType;
    suffixIcon?: IconType;
    onClick?: () => void;
}
export declare enum ButtonSize {
    SMALL = 0,
    MEDIUM = 1,
    LARGE = 2
}
export declare enum ButtonVariant {
    PRIMARY = 0,
    SECONDARY = 1,
    OUTLINE = 2,
    TEXT = 3
}
export declare const Button: ({ variant, size, label, className, prefixIcon: PrefixIcon, suffixIcon: SuffixIcon, onClick, }: ButtonProps) => React.JSX.Element;
