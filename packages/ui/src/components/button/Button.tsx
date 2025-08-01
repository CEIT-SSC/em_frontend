import React from "react";
import { IconType } from "react-icons";
import clsx from "clsx";

interface Props {
  variant?: Variant;
  size?: Size;
  label?: string;
  className?: string;
  prefixIcon?: IconType;
  suffixIcon?: IconType;
  onClick?: () => void;
}

export enum Size {
  small,
  medium,
  large,
}

const sizeClasses = {
  [Size.small]: "min-h-9 min-w-16",
  [Size.medium]: "min-h-12 min-w-20",
  [Size.large]: "min-h-15 min-w-24",
};

export enum Variant {
  primary,
  secondary,
  outline,
}

const variantClasses = {
  [Variant.primary]: "default-gradient",
  [Variant.secondary]: "",
  [Variant.outline]: "text-transparent bg-clip-text default-gradient",
};

const Button = ({
  variant = Variant.secondary,
  size = Size.medium,
  label = "",
  className = "",
  prefixIcon: PrefixIcon,
  suffixIcon: SuffixIcon,
  onClick,
}: Props) => {
  const isSecondary = variant === Variant.secondary;

  return (
    <div
      className={clsx("w-fit h-fit rounded-lg overflow-hidden p-px", {
        "default-gradient": !isSecondary,
        "bg-transparent": isSecondary,
      })}
    >
      <div
        className={clsx({ "bg-black rounded-lg": variant === Variant.outline })}
      >
        <button
          className={clsx(
            sizeClasses[size],
            "px-3 py-2 cursor-pointer rounded-lg",
            "flex gap-2 justify-center items-center",
            className,
            variantClasses[variant]
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

export default Button;
