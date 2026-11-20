import React from "react";
import clsx from "clsx";

export interface BreadcrumbStep {
  label: string;
  description?: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

export interface BreadcrumbProps {
  steps: BreadcrumbStep[];
  className?: string;
  stepClassName?: string;
  activeStepClassName?: string;
  completedStepClassName?: string;
  connectorClassName?: string;
  showConnector?: boolean;
  size?: "sm" | "md" | "lg";
}

// Persian digit conversion function
const toPersianDigits = (num: number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  steps,
  className = "",
  stepClassName = "",
  activeStepClassName = "",
  completedStepClassName = "",
  connectorClassName = "",
  showConnector = true,
  size = "md",
}) => {
  return (
    <div className={clsx("flex items-center justify-center", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            {/* Step Circle */}
            <div
              aria-current={step.isActive ? "step" : undefined}
              className={clsx(
                "relative flex items-center justify-center rounded-full border font-semibold transition-colors duration-200",
                sizeClasses[size],
                {
                  "bg-[var(--surface-raised,#292b2e)] border-[var(--border-strong,#656970)] text-[var(--muted,#b4b7bc)]":
                    !step.isActive && !step.isCompleted,
                  "bg-[var(--accent,#f28ba8)] border-transparent text-[var(--accent-ink,#22151e)]":
                    step.isActive,
                  "bg-[var(--success,#9dd6b2)] border-transparent text-[var(--accent-ink,#22151e)]": step.isCompleted,
                },
                step.isActive
                  ? activeStepClassName
                  : step.isCompleted
                  ? completedStepClassName
                  : stepClassName
              )}
            >
              {step.isCompleted ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span>{toPersianDigits(index + 1)}</span>
              )}
            </div>

            {/* Step Label */}
            <div className="mt-2 text-center">
              <div
                className={clsx("text-xs font-medium transition-colors", {
                  "text-[var(--muted,#b4b7bc)]": !step.isActive && !step.isCompleted,
                  "text-[var(--foreground,#f3f4ef)]": step.isActive,
                  "text-[var(--success,#9dd6b2)]": step.isCompleted,
                })}
              >
                {step.label}
              </div>
              {step.description && (
                <div
                  className={clsx("text-xs mt-1 transition-colors", {
                    "text-[var(--muted,#b4b7bc)]": !step.isCompleted,
                    "text-[var(--success,#9dd6b2)]": step.isCompleted,
                  })}
                >
                  {step.description}
                </div>
              )}
            </div>
          </div>

          {/* Connector Line */}
          {showConnector && index < steps.length - 1 && (
            <div
              className={clsx(
                "flex-1 h-0.5 mx-4 transition-colors duration-300",
                {
                  "bg-[var(--border-strong,#656970)]": !steps[index + 1]?.isCompleted,
                  "bg-[var(--success,#9dd6b2)]": steps[index + 1]?.isCompleted,
                },
                connectorClassName
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
