import React, { forwardRef } from "react";
import clsx from "clsx";
import { HiOutlineExclamation } from "react-icons/hi";
import { IoMdHelpCircleOutline } from "react-icons/io";

export interface phoneNumberFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string;
  name: string;
  errorText?: string;
  guidance?: string;
}

export const PhoneNumberField = forwardRef<HTMLInputElement, phoneNumberFieldProps>(
  ({ label, id, name, errorText, guidance, className,
     "aria-describedby": describedBy, ...props }, ref) => (
    <div className={clsx("ssc-field w-full min-w-0 flex flex-col gap-2", className)}>
      <label className="ssc-field-label text-sm font-medium" htmlFor={id}>{label}</label>
      <div className="ssc-phone-control flex items-center rounded-lg border border-[var(--border-strong,#4F5154)]" dir="ltr" data-invalid={!!errorText} data-disabled={!!props.disabled}>
        <span className="ssc-phone-prefix border-e border-[#4F5154] px-3 text-sm">+98</span>
        <input
          {...props}
          ref={ref}
          id={id}
          name={name}
          type="tel"
          inputMode="numeric"
          autoComplete={props.autoComplete ?? "tel-national"}
          dir="ltr"
          aria-invalid={errorText ? true : undefined}
          aria-describedby={[describedBy, errorText && `${id}-error`, guidance && `${id}-guidance`].filter(Boolean).join(" ") || undefined}
          className="ssc-phone-input min-w-0 w-full min-h-12 bg-transparent px-3 py-3 text-left focus-visible:outline-none"
        />
      </div>
      {errorText && <p id={`${id}-error`} aria-live="polite" className="ssc-field-error flex items-start gap-1.5 text-sm leading-6 text-[#ff9da9]"><HiOutlineExclamation aria-hidden="true" className="mt-1 shrink-0" />{errorText}</p>}
      {guidance && <p id={`${id}-guidance`} className="ssc-field-guidance flex items-start gap-1.5 text-sm leading-6 text-[#b2b6bd]"><IoMdHelpCircleOutline aria-hidden="true" className="mt-1 shrink-0" />{guidance}</p>}
    </div>
  )
);
PhoneNumberField.displayName = "PhoneNumberField";
