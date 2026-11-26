"use client";

import { usePathname } from "next/navigation";

export function NeonBackground() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_65%,transparent_100%)]" />
      <div className="animate-neon-flicker motion-reduce:animate-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-500/25 blur-[120px]" />
      <div className="animate-neon-flicker motion-reduce:animate-none absolute -top-20 -right-24 h-96 w-96 rounded-full bg-pink-500/25 blur-[120px] [animation-delay:2.1s]" />
      <div className="animate-neon-breathe motion-reduce:animate-none absolute -bottom-32 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
    </div>
  );
}