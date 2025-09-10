import React, { ChangeEventHandler } from "react";
export interface TextFieldProps {
    label: string;
    id: string;
    name: string;
    type?: "text" | "email" | "password" | "tel" | "number";
    errorText?: string;
    guidance?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler;
    onBlur?: ChangeEventHandler;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
}
export declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
