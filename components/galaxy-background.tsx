const STARS = [
  { id: "st1", pos: "top-[8%] left-[10%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "0s", dur: "2.6s" },
  { id: "st2", pos: "top-[12%] left-[26%]", size: "h-[3px] w-[3px]", color: "bg-sky-200", delay: "1.1s", dur: "3.4s" },
  { id: "st3", pos: "top-[6%] left-[44%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "0.4s", dur: "2.9s" },
  { id: "st4", pos: "top-[15%] left-[62%]", size: "h-[2.5px] w-[2.5px]", color: "bg-violet-200", delay: "1.8s", dur: "3.8s" },
  { id: "st5", pos: "top-[9%] right-[18%]", size: "h-[3px] w-[3px]", color: "bg-pink-200", delay: "0.7s", dur: "2.7s" },
  { id: "st6", pos: "top-[19%] right-[7%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "2.2s", dur: "3.3s" },
  { id: "st7", pos: "top-[24%] left-[7%]", size: "h-[3px] w-[3px]", color: "bg-sky-300", delay: "1.5s", dur: "3.1s" },
  { id: "st8", pos: "top-[28%] left-[19%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "0.2s", dur: "4.0s" },
  { id: "st9", pos: "top-[22%] left-[37%]", size: "h-[2px] w-[2px]", color: "bg-violet-200", delay: "2.5s", dur: "3.2s" },
  { id: "st10", pos: "top-[26%] right-[28%]", size: "h-[2.5px] w-[2.5px]", color: "bg-white", delay: "0.9s", dur: "2.8s" },
  { id: "st11", pos: "top-[31%] right-[14%]", size: "h-[2px] w-[2px]", color: "bg-sky-200", delay: "1.9s", dur: "3.6s" },
  { id: "st12", pos: "top-[38%] left-[12%]", size: "h-[2px] w-[2px]", color: "bg-pink-200", delay: "0.6s", dur: "3.0s" },
  { id: "st13", pos: "top-[42%] left-[28%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "2.1s", dur: "4.2s" },
  { id: "st14", pos: "top-[40%] right-[21%]", size: "h-[3px] w-[3px]", color: "bg-violet-300", delay: "1.3s", dur: "2.9s" },
  { id: "st15", pos: "top-[46%] right-[8%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "0.3s", dur: "3.5s" },
  { id: "st16", pos: "top-[54%] left-[6%]", size: "h-[2.5px] w-[2.5px]", color: "bg-sky-200", delay: "1.7s", dur: "3.1s" },
  { id: "st17", pos: "top-[58%] left-[22%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "0.8s", dur: "3.9s" },
  { id: "st18", pos: "top-[52%] right-[33%]", size: "h-[2px] w-[2px]", color: "bg-pink-200", delay: "2.4s", dur: "3.0s" },
  { id: "st19", pos: "top-[61%] right-[12%]", size: "h-[3px] w-[3px]", color: "bg-sky-200", delay: "1.0s", dur: "2.7s" },
  { id: "st20", pos: "top-[68%] left-[14%]", size: "h-[2px] w-[2px]", color: "bg-violet-200", delay: "2.0s", dur: "3.4s" },
  { id: "st21", pos: "top-[72%] left-[34%]", size: "h-[2.5px] w-[2.5px]", color: "bg-white", delay: "0.5s", dur: "3.7s" },
  { id: "st22", pos: "top-[75%] right-[26%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "1.6s", dur: "2.8s" },
  { id: "st23", pos: "top-[78%] right-[9%]", size: "h-[2.5px] w-[2.5px]", color: "bg-pink-200", delay: "0.1s", dur: "3.3s" },
  { id: "st24", pos: "top-[84%] left-[8%]", size: "h-[3px] w-[3px]", color: "bg-white", delay: "1.2s", dur: "3.5s" },
  { id: "st25", pos: "top-[88%] left-[46%]", size: "h-[2px] w-[2px]", color: "bg-sky-200", delay: "2.3s", dur: "3.1s" },
  { id: "st26", pos: "top-[86%] right-[19%]", size: "h-[2px] w-[2px]", color: "bg-violet-200", delay: "0.9s", dur: "3.8s" },
  { id: "st27", pos: "top-[18%] left-[52%]", size: "h-[2px] w-[2px]", color: "bg-white", delay: "1.4s", dur: "2.6s" },
  { id: "st28", pos: "top-[65%] left-[56%]", size: "h-[2px] w-[2px]", color: "bg-sky-200", delay: "2.6s", dur: "3.6s" },
];

const SPARKLE_STARS = [
  { id: "sp1", pos: "top-[14%] left-[16%]", size: "h-3.5 w-3.5", color: "text-sky-200", delay: "0.3s", dur: "3.4s" },
  { id: "sp2", pos: "top-[20%] right-[19%]", size: "h-3 w-3", color: "text-pink-200", delay: "1.5s", dur: "4.0s" },
  { id: "sp3", pos: "top-[48%] left-[11%]", size: "h-3 w-3", color: "text-violet-200", delay: "2.1s", dur: "3.6s" },
  { id: "sp4", pos: "top-[56%] right-[15%]", size: "h-3.5 w-3.5", color: "text-sky-200", delay: "0.9s", dur: "3.8s" },
  { id: "sp5", pos: "top-[76%] left-[24%]", size: "h-2.5 w-2.5", color: "text-white/90", delay: "1.8s", dur: "3.2s" },
  { id: "sp6", pos: "top-[82%] right-[30%]", size: "h-3 w-3", color: "text-pink-200", delay: "0.5s", dur: "4.2s" },
];

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
    </svg>
  );
}

export function GalaxyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#17153b_0%,#09090b_55%,#050508_100%)] opacity-85" />
      <div className="animate-nebula-drift motion-reduce:animate-none absolute -top-24 -left-1/4 h-[28rem] w-[140%] -rotate-12 rounded-full bg-gradient-to-r from-sky-500/15 via-violet-500/20 to-pink-500/15 blur-[110px]" />
      <div className="animate-nebula-drift motion-reduce:animate-none absolute -bottom-28 -right-1/4 h-[24rem] w-[110%] -rotate-12 rounded-full bg-gradient-to-r from-indigo-500/15 via-fuchsia-500/15 to-sky-400/15 blur-[120px] [animation-delay:4s]" />

      {STARS.map((star) => (
        <span
          key={star.id}
          style={{ animationDelay: star.delay, animationDuration: star.dur }}
          className={`animate-star-twinkle motion-reduce:animate-none absolute rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)] ${star.pos} ${star.size} ${star.color}`}
        />
      ))}

      {SPARKLE_STARS.map((star) => (
        <span
          key={star.id}
          style={{ animationDelay: star.delay, animationDuration: star.dur }}
          className={`animate-star-twinkle motion-reduce:animate-none absolute drop-shadow-[0_0_6px_rgba(186,230,253,0.75)] ${star.pos} ${star.color}`}
        >
          <FourPointStar className={star.size} />
        </span>
      ))}

      <span
        style={{ animationDelay: "1.5s", animationDuration: "8.5s" }}
        className="animate-shooting-star motion-reduce:hidden absolute top-[14%] right-[12%] h-[1.5px] w-28 rounded-full bg-gradient-to-r from-white via-sky-200/80 to-transparent opacity-0 shadow-[0_0_8px_rgba(186,230,253,0.9)]"
      />
      <span
        style={{ animationDelay: "5.2s", animationDuration: "10s" }}
        className="animate-shooting-star motion-reduce:hidden absolute top-[32%] right-[28%] h-[1.5px] w-20 rounded-full bg-gradient-to-r from-white via-pink-200/80 to-transparent opacity-0 shadow-[0_0_8px_rgba(251,207,232,0.8)]"
      />
    </div>
  );
}