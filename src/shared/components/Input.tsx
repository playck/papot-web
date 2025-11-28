"use client";

import { forwardRef, InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled";
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "default",
      fullWidth = true,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const baseClasses =
      "px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2";
    const variantClasses = {
      default:
        "border-neutral-300 focus:ring-primary-500 focus:border-primary-500 bg-white",
      filled:
        "border-neutral-200 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50",
    };

    const errorClasses = error
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "";

    const widthClasses = fullWidth ? "w-full" : "";

    const inputClasses =
      `${baseClasses} ${variantClasses[variant]} ${errorClasses} ${widthClasses} ${className}`.trim();

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </label>
        )}

        <input ref={ref} id={inputId} className={inputClasses} {...props} />

        {(error || helperText) && (
          <div className="mt-1">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!error && helperText && (
              <p className="text-sm text-neutral-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
