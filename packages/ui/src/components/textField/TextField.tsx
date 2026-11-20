import clsx from "clsx";
import React, { forwardRef } from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import { IoMdHelpCircleOutline } from "react-icons/io";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  id: string;
  name: string;
  errorText?: string;
  guidance?: string;
  readonly?: boolean;
  className?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, name, type = "text", errorText, guidance, className,
     readonly, readOnly, "aria-describedby": describedBy, ...props }, ref) => {
    const description = [describedBy, errorText && `${id}-error`, guidance && `${id}-guidance`]
      .filter(Boolean).join(" ") || undefined;
    return (
      <div className={clsx("ssc-field w-full min-w-0 flex flex-col gap-2", className)}>
        <label className="ssc-field-label text-sm font-medium" htmlFor={id}>{label}</label>
        <input
          {...props}
          ref={ref}
          id={id}
          name={name}
          type={type}
          readOnly={readonly || readOnly}
          aria-invalid={errorText ? true : undefined}
          aria-describedby={description}
          className="ssc-input w-full min-h-12 rounded-lg border border-[var(--border-strong,#4F5154)] bg-[var(--background,transparent)] px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errorText && (
          <p id={`${id}-error`} className="ssc-field-error flex items-start gap-1.5 text-sm leading-6 text-[#ff9da9]" aria-live="polite">
            <HiOutlineExclamation aria-hidden="true" className="mt-1 shrink-0" />{errorText}
          </p>
        )}
        {guidance && (
          <p id={`${id}-guidance`} className="ssc-field-guidance flex items-start gap-1.5 text-sm leading-6 text-[#b2b6bd]">
            <IoMdHelpCircleOutline aria-hidden="true" className="mt-1 shrink-0" />{guidance}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";
