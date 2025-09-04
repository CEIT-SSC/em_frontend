import React from "react";
import { IconType } from "react-icons";
export interface ButtonProps {
    label?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
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
export declare const Button: ({ label, variant, size, loading, className, prefixIcon: PrefixIcon, suffixIcon: SuffixIcon, onClick, }: ButtonProps) => React.JSX.Element;
