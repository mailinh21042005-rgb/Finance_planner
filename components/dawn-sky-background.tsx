const SUN_SPARKLES = [
  { id: "d1", pos: "top-[12%] left-[10%]", size: "h-3.5 w-3.5", color: "text-amber-400/80", delay: "0s", dur: "3.2s" },
  { id: "d2", pos: "top-[18%] left-[22%]", size: "h-2.5 w-2.5", color: "text-sky-400/80", delay: "1.2s", dur: "3.8s" },
  { id: "d3", pos: "top-[10%] right-[14%]", size: "h-4 w-4", color: "text-amber-400/85", delay: "0.6s", dur: "3.0s" },
  { id: "d4", pos: "top-[22%] right-[24%]", size: "h-2.5 w-2.5", color: "text-pink-400/75", delay: "1.9s", dur: "3.6s" },
  { id: "d5", pos: "top-[36%] left-[7%]", size: "h-3 w-3", color: "text-violet-400/70", delay: "0.9s", dur: "4.0s" },
  { id: "d6", pos: "top-[42%] right-[9%]", size: "h-3.5 w-3.5", color: "text-sky-400/75", delay: "2.3s", dur: "3.4s" },
  { id: "d7", pos: "top-[60%] left-[12%]", size: "h-2.5 w-2.5", color: "text-pink-400/70", delay: "1.5s", dur: "3.9s" },
  { id: "d8", pos: "top-[66%] right-[13%]", size: "h-3 w-3", color: "text-amber-400/75", delay: "0.4s", dur: "3.5s" },
  { id: "d9", pos: "top-[80%] left-[18%]", size: "h-3 w-3", color: "text-sky-400/70", delay: "2.0s", dur: "4.1s" },
  { id: "d10", pos: "top-[82%] right-[20%]", size: "h-2.5 w-2.5", color: "text-violet-400/70", delay: "1.1s", dur: "3.3s" },
];

function SunGlint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

export function DawnSkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 block overflow-hidden dark:hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-rose-50/40 to-white" />
      <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-amber-200/45 blur-[95px]" />
      <div className="absolute -top-20 right-[18%] h-[32rem] w-28 rotate-[26deg] bg-gradient-to-b from-amber-100/65 via-white/30 to-transparent blur-2xl" />
      <div className="absolute -top-24 right-[34%] h-[28rem] w-20 rotate-[26deg] bg-gradient-to-b from-sky-100/55 via-white/25 to-transparent blur-2xl" />

      <div
        style={{ animationDuration: "20s" }}
        className="animate-cloud-drift motion-reduce:animate-none absolute top-[8%] -left-16 h-40 w-96 rounded-full bg-sky-200/45 blur-3xl"
      />
      <div
        style={{ animationDelay: "3s", animationDuration: "24s" }}
        className="animate-cloud-drift motion-reduce:animate-none absolute top-[18%] right-[4%] h-44 w-[28rem] rounded-full bg-pink-200/40 blur-3xl"
      />
      <div
        style={{ animationDelay: "6s", animationDuration: "22s" }}
        className="animate-cloud-drift motion-reduce:animate-none absolute top-[46%] -left-20 h-48 w-[26rem] rounded-full bg-violet-200/30 blur-3xl"
      />
      <div
        style={{ animationDelay: "1.5s", animationDuration: "26s" }}
        className="animate-cloud-drift motion-reduce:animate-none absolute bottom-[8%] right-[-4rem] h-48 w-[30rem] rounded-full bg-sky-200/35 blur-3xl"
      />

      <div
        style={{ animationDelay: "2s", animationDuration: "19s" }}
        className="animate-cloud-drift motion-reduce:animate-none absolute top-[14%] left-[12%] h-14 w-44 rounded-full bg-white/80 blur-xl"
      />
      <div
        style={{ animationDelay: "5s", animationDuration: "23s" }}
        className="animate-cloud-drift motion-reduce:animate-none absolute top-[26%] right-[14%] h-16 w-52 rounded-full bg-white/80 blur-xl"
      />

      {SUN_SPARKLES.map((item) => (
        <span
          key={item.id}
          style={{ animationDelay: item.delay, animationDuration: item.dur }}
          className={`animate-sun-sparkle motion-reduce:animate-none absolute drop-shadow-[0_0_6px_rgba(251,191,36,0.45)] ${item.pos} ${item.color}`}
        >
          <SunGlint className={item.size} />
        </span>
      ))}
    </div>
  );
}