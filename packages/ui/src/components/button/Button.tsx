import React from "react";
import { IconType } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";
import clsx from "clsx";

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

export enum ButtonSize {
  SMALL,
  MEDIUM,
  LARGE,
}

const sizeClasses = {
  [ButtonSize.SMALL]: "h-fit min-w-16 leading-[1.5rem]",
  [ButtonSize.MEDIUM]: "h-12 min-w-20",
  [ButtonSize.LARGE]: "h-15 min-w-24",
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
  [ButtonVariant.OUTLINE]: "text-transparent bg-clip-text default-gradient",
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
}: ButtonProps) => {
  const isSecondary = variant === ButtonVariant.SECONDARY;
  const isText = variant === ButtonVariant.TEXT;
  const isOutline = variant === ButtonVariant.OUTLINE;

  return (
    <div
      className={clsx(
        "overflow-hidden p-px",
        {
          "default-gradient": !isSecondary && !isText,
          "bg-black border-1 border-whiteText": isOutline,
          [sizeClasses[size]]: !isText,
        },
        variantClasses[variant],
        className,
        radiusClass
      )}
    >
      <button
        className={clsx("relative w-full h-full cursor-pointer", "text-bold", {
          "px-3 py-2": !isText,
          "p-1": isText,
        })}
        onClick={onClick}
      >
        {loading && (
          <AiOutlineLoading className=" absolute top-1/2 left-1/2 -translate-1/2 animate-spin" />
        )}
        <div
          className={clsx("flex gap-2 justify-center items-center", {
            ["opacity-0"]: loading,
          })}
        >
          {PrefixIcon && <PrefixIcon />}
          {label}
          {SuffixIcon && <SuffixIcon />}
        </div>
      </button>
    </div>
  );
};
