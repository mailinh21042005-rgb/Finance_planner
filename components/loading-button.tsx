"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: ReactNode;
};

export function LoadingButton({
  children,
  className,
  disabled,
  loading = false,
  loadingText,
  ...props
}: LoadingButtonProps) {
  const { pending } = useFormStatus();
  const isLoading = loading || pending;

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center gap-2 ${className ?? ""}`}
    >
      {isLoading && (
        <svg
          aria-hidden="true"
          className="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
          />
        </svg>
      )}
      <span>{isLoading ? loadingText ?? children : children}</span>
    </button>
  );
}
