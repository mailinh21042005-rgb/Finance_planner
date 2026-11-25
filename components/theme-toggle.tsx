"use client";

import type { MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (
      typeof document === "undefined" ||
      typeof document.startViewTransition !== "function" ||
      prefersReducedMotion
    ) {
      setTheme(nextTheme);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      // Đồng bộ class ngay lập tức để snapshot mới bắt trúng màu theme mới
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Chuyển đổi giao diện sáng tối"
      title="Đổi giao diện Sáng / Tối"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent"
    >
      <Sun className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}