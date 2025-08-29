import React from "react";
import { IconType } from "react-icons";
import clsx from "clsx";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
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
  [ButtonSize.SMALL]: "h-9 min-w-16 leading-[1.5rem]",
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
  variant = ButtonVariant.SECONDARY,
  size = ButtonSize.MEDIUM,
  label = "",
  className = "",
  prefixIcon: PrefixIcon,
  suffixIcon: SuffixIcon,
  onClick,
}: ButtonProps) => {
  const isSecondary = variant === ButtonVariant.SECONDARY;
  const isText = variant === ButtonVariant.TEXT;
  const isOutline = variant === ButtonVariant.OUTLINE;

  const radiusClass =
    className.match(/\brounded(?:-[^\s]+)?\b/) || "rounded-lg";

  return (
    <div
      className={clsx(
        "overflow-hidden p-px",
        sizeClasses[size],
        {
          "default-gradient": !isSecondary && !isText,
          "bg-transparent": isSecondary,
        },
        className,
        radiusClass
      )}
    >
      <div
        className={clsx({
          "bg-black rounded-lg": variant === ButtonVariant.OUTLINE,
        })}
      >
        <button
          className={clsx(
            "w-full h-full px-3 py-2 cursor-pointer",
            "flex gap-2 justify-center items-center",
            "text-lg text-bold",
            className,
            variantClasses[variant],

            {
              "rounded-lg": !isSecondary,
            }
          )}
          onClick={onClick}
        >
          {PrefixIcon && <PrefixIcon />}
          {label}
          {SuffixIcon && <SuffixIcon />}
        </button>
      </div>
    </div>
  );
};
