import React from "react";
import type { ReactNode } from "react";

interface Props {
  mode?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  label?: string;
  backgroundColor?: string;
  prefixIcon?: () => ReactNode;
  suffixIcon?: () => ReactNode;
  onClick?: () => void;
}

enum Size {
  small = "min-h-9 min-w-16",
  medium = "min-h-12 min-w-20",
  large = "min-h-15 min-w-24",
}

enum Variant {
  primary = "bg-linear-45 from-[#FF715B] from-40% to-[#CB48B7] to-80%",
  outline = "text-transparent bg-clip-text " + primary,
}

enum BackgroundColors {
  transparent = "bg-transparent",
  blue = "bg-blue-500",
}

const Button = ({
  mode = "secondary",
  size = "medium",
  label = "",
  backgroundColor = "transparent",
  prefixIcon,
  suffixIcon,
  onClick,
}: Props) => {
  const getBackgroundClass = () => {
    if (mode === "secondary") {
      return (
        BackgroundColors[backgroundColor as keyof typeof BackgroundColors] ||
        "bg-transparent"
      );
    }
    return Variant[mode];
  };

  const background =
    mode === "secondary" ? getBackgroundClass() : Variant.primary;

  return (
    <div
      className={"w-fit h-fit rounded-lg overflow-hidden p-px " + background}
    >
      <div className={mode === "outline" ? "bg-black rounded-lg" : ""}>
        <button
          className={[
            Size[size],
            "px-3 py-2 cursor-pointer",
            "flex gap-2 justify-center items-center",
            getBackgroundClass(),
          ].join(" ")}
          onClick={onClick}
        >
          {prefixIcon && prefixIcon()}
          {label}
          {suffixIcon && suffixIcon()}
        </button>
      </div>
    </div>
  );
};

export default Button;
