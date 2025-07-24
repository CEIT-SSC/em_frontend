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

const Button = ({
  mode = "secondary",
  size = "medium",
  label = "",
  backgroundColor = "transparent",
  prefixIcon,
  suffixIcon,
  onClick,
}: Props) => {
  return (
    <div className="w-fit h-fit rounded-lg overflow-hidden p-px bg-linear-45 from-[#FF715B] from-40% to-[#CB48B7] to-80%">
      <div className={mode === "secondary" ? "bg-black rounded-lg" : ""}>
        <button
          className={[
            Size[size],
            Variant[mode],
            "px-3 py-2 cursor-pointer",
            "flex gap-2 justify-center items-center",
            mode === "secondary" ? `bg-${backgroundColor}` : "",
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
