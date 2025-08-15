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
  [Size.small]: "h-9 min-w-16",
  [Size.medium]: "h-12 min-w-20",
  [Size.large]: "h-15 min-w-24",
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
  const isOutline = variant === Variant.outline;

  const radiusClass =
    className.match(/\brounded(?:-[^\s]+)?\b/) || "rounded-lg";

  return (
    <div
      className={clsx(
        "overflow-hidden p-px",
        sizeClasses[size],
        {
          "default-gradient": !isSecondary,
          "bg-transparent": isSecondary,
        },
        className,
        radiusClass
      )}
    >
      <div
        className={clsx(
          "w-full h-full",
          { "bg-black": isOutline },
          radiusClass
        )}
      >
        <button
          className={clsx(
            "w-full h-full px-3 py-2 cursor-pointer",
            "flex gap-2 justify-center items-center",
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
