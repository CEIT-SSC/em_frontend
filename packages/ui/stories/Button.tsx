import React from "react";

import "./button.css";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const baseClasses =
    "rounded-lg font-semibold transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  const colorClasses = primary
    ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
    : "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500";

  return (
    <button
      type="button"
      className={`${mode} ${baseClasses} ${colorClasses} ${sizeClasses[size]}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
