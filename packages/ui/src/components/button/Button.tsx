import React from "react";
import { IconType } from "react-icons";
import clsx from "clsx";

interface Props {
  mode?: "primary" | "secondary" | "outline";
  size?: Size;
  label?: string;
  className?: string;
  prefixIcon?: IconType;
  suffixIcon?: IconType;
  onClick?: () => void;
}

export enum Size {
  small = "min-h-9 min-w-16",
  medium = "min-h-12 min-w-20",
  large = "min-h-15 min-w-24",
}

enum Variant {
  primary = "bg-linear-45 from-[#FF715B] from-40% to-[#CB48B7] to-80%",
  secondary = "",
  outline = "text-transparent bg-clip-text " + primary,
}

const Button = ({
  mode = "secondary",
  size = Size.medium,
  label = "",
  className = "",
  prefixIcon: PrefixIcon,
  suffixIcon: SuffixIcon,
  onClick,
}: Props) => {
  const isSecondary = mode === "secondary";

  return (
    <div
      className={clsx("w-fit h-fit rounded-lg overflow-hidden p-px", {
        [Variant.primary]: !isSecondary,
        "bg-transparent": isSecondary,
      })}
    >
      <div className={clsx({ "bg-black rounded-lg": mode === "outline" })}>
        <button
          className={clsx(
            size,
            "px-3 py-2 cursor-pointer rounded-lg",
            "flex gap-2 justify-center items-center",
            className,
            {
              [Variant[mode]]: !isSecondary,
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

export default Button;
