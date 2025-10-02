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
  const persianDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
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
              className={clsx(
                "relative flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300",
                sizeClasses[size],
                {
                  "bg-gray-700 border-gray-600 text-gray-400":
                    !step.isActive && !step.isCompleted,
                  "bg-gradient-to-r from-[#ff715b] to-[#cb48b7] border-transparent text-white shadow-lg":
                    step.isActive,
                  "bg-green-600 border-green-600 text-white": step.isCompleted,
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
                  "text-gray-400": !step.isActive && !step.isCompleted,
                  "text-white": step.isActive,
                  "text-green-400": step.isCompleted,
                })}
              >
                {step.label}
              </div>
              {step.description && (
                <div
                  className={clsx("text-xs mt-1 transition-colors", {
                    "text-gray-500": !step.isActive && !step.isCompleted,
                    "text-gray-300": step.isActive,
                    "text-green-300": step.isCompleted,
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
                  "bg-gray-600": !steps[index + 1]?.isCompleted,
                  "bg-green-600": steps[index + 1]?.isCompleted,
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
