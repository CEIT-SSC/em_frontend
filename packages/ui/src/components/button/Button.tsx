import React from "react";
import { IconType } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix" | "onClick"> {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  prefixIcon?: IconType;
  suffixIcon?: IconType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
}

export enum ButtonSize {
  SMALL,
  MEDIUM,
  LARGE,
}

const sizeClasses = {
  [ButtonSize.SMALL]: "h-fit min-w-16 leading-[1.5rem]",
  [ButtonSize.MEDIUM]: "h-12 min-w-20",
  [ButtonSize.LARGE]: "w-full h-15 min-w-24",
};

export enum ButtonVariant {
  PRIMARY,
  SECONDARY,
  OUTLINE,
  TEXT,
}

const variantClasses = {
  [ButtonVariant.PRIMARY]: "default-gradient",
  [ButtonVariant.SECONDARY]: "",
  [ButtonVariant.OUTLINE]: "",
};

export const Button = ({
  label = "",
  variant = ButtonVariant.SECONDARY,
  size = ButtonSize.MEDIUM,
  loading = false,
  className = "",
  prefixIcon: PrefixIcon,
  suffixIcon: SuffixIcon,
  onClick,
  type,
  disable = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const isText = variant === ButtonVariant.TEXT;

  const radiusClass =
    className.match(/\brounded(?:-[^\s]+)?\b/) || "rounded-lg";

  return (
    <button
      {...props}
      disabled={disable || disabled || loading}
      aria-busy={loading || undefined}
      data-variant={ButtonVariant[variant].toLowerCase()}
      data-size={ButtonSize[size].toLowerCase()}
      className={twMerge(
        clsx(
          "ssc-button relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
          "overflow-hidden p-px",
          "font-semibold",
          "flex justify-center items-center",
          {
            "px-3 py-2": !isText,
            "!bg-none bg-gray-500 text-gray-300": disable,
            "!cursor-not-allowed": disable,
            [sizeClasses[size]]: !isText,
          },
          variantClasses[variant],
          radiusClass,
          className
        )
      )}
      type={type ?? "button"}
      onClick={onClick}
    >
      {loading && (
        <AiOutlineLoading aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-1/2 animate-spin" />
      )}
      <span
        className={clsx("flex gap-2 justify-center items-center", {
          ["opacity-0"]: loading,
        })}
      >
        {PrefixIcon && <PrefixIcon aria-hidden="true" />}
        {label}
        {SuffixIcon && <SuffixIcon aria-hidden="true" />}
      </span>
    </button>
  );
};
