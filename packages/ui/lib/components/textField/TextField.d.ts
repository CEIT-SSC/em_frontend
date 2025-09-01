import React from "react";
export interface TextFieldProps {
    label: string;
    id: string;
    name: string;
    type?: string;
    errorText?: string;
    guidance?: string;
    placeholder?: string;
}
export declare const TextField: ({ label, id, name, type, errorText, guidance, placeholder, }: TextFieldProps) => React.JSX.Element;
