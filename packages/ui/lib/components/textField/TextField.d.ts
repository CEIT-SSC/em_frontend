import React from "react";
export interface TextFieldProps {
    label: string;
    id: string;
    name: string;
    errorText?: string;
    guidance?: string;
    placeholder?: string;
}
export declare const TextField: ({ label, id, name, errorText, guidance, placeholder, }: TextFieldProps) => React.JSX.Element;
