"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Độ trễ (ms) nếu muốn nhiều khối hiện nối tiếp nhau */
  delay?: 0 | 100 | 200 | 300;
};

const DELAY_CLASSES: Record<NonNullable<ScrollRevealProps["delay"]>, string> = {
  0: "delay-0",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.classList.remove("translate-y-8", "opacity-0");
      el.classList.add("translate-y-0", "opacity-100");
    };

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.12, // Thấy khoảng 12% khối là bắt đầu trượt lên
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "min-w-0 transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none",
        DELAY_CLASSES[delay],
        "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}