"use client";

import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";

type CurrencyInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  name: string;
  defaultValue?: number | string;
};

function toDigits(val?: number | string): string {
  if (val === undefined || val === null || val === "") return "";
  return String(val).replace(/\D/g, "").replace(/^0+(?=\d)/, "");
}

function formatWithDots(digits: string): string {
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function CurrencyInput({
  name,
  defaultValue,
  className,
  placeholder = "0",
  ...rest
}: CurrencyInputProps) {
  const initialDigits = toDigits(defaultValue);
  const [rawValue, setRawValue] = useState<string>(initialDigits);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;

    const handleReset = () => setRawValue(initialDigits);
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [initialDigits]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder={placeholder}
        className={className}
        value={formatWithDots(rawValue)}
        onChange={(e) => setRawValue(toDigits(e.target.value))}
        {...rest}
      />
      <input type="hidden" name={name} value={rawValue} />
    </>
  );
}