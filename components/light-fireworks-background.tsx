"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";

type SparkStyle = CSSProperties & {
  "--tx": string;
  "--ty": string;
  "--fall": string;
};

const BURSTS = [
  {
    id: "top-left",
    pos: "top-[12%] left-[12%]",
    delay: "0s",
    ring: "border-sky-400/40",
    colors: ["bg-sky-400", "bg-violet-400", "bg-pink-400", "bg-amber-400"],
  },
  {
    id: "top-center",
    pos: "top-[14%] left-[48%]",
    delay: "0.9s",
    ring: "border-amber-400/40",
    colors: ["bg-amber-400", "bg-pink-400", "bg-sky-400", "bg-rose-400"],
  },
  {
    id: "top-right",
    pos: "top-[18%] right-[14%]",
    delay: "0.35s",
    ring: "border-pink-400/40",
    colors: ["bg-pink-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400"],
  },
  {
    id: "upper-left",
    pos: "top-[32%] left-[24%]",
    delay: "1.45s",
    ring: "border-emerald-400/40",
    colors: ["bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-amber-400"],
  },
  {
    id: "upper-right",
    pos: "top-[35%] right-[24%]",
    delay: "1.15s",
    ring: "border-sky-400/40",
    colors: ["bg-sky-400", "bg-pink-400", "bg-amber-400", "bg-emerald-400"],
  },
  {
    id: "mid-left",
    pos: "top-[50%] left-[8%]",
    delay: "0.65s",
    ring: "border-violet-400/40",
    colors: ["bg-violet-400", "bg-sky-400", "bg-rose-400", "bg-amber-400"],
  },
  {
    id: "mid-right",
    pos: "top-[54%] right-[9%]",
    delay: "1.75s",
    ring: "border-emerald-400/40",
    colors: ["bg-emerald-400", "bg-sky-400", "bg-pink-400", "bg-violet-400"],
  },
  {
    id: "low-left",
    pos: "top-[70%] left-[18%]",
    delay: "1.95s",
    ring: "border-rose-400/40",
    colors: ["bg-rose-400", "bg-amber-400", "bg-sky-400", "bg-violet-400"],
  },
  {
    id: "low-right",
    pos: "top-[68%] right-[18%]",
    delay: "0.2s",
    ring: "border-violet-400/40",
    colors: ["bg-violet-400", "bg-pink-400", "bg-emerald-400", "bg-sky-400"],
  },
];

const SPARKS = [
  { id: "s1", tx: "50px", ty: "0px", fall: "95px", offset: 0, shape: "h-[3px] w-[3px] rounded-full" },
  { id: "s2", tx: "46px", ty: "19px", fall: "110px", offset: 0.02, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "s3", tx: "35px", ty: "35px", fall: "120px", offset: 0.04, shape: "h-1 w-1 rounded-full" },
  { id: "s4", tx: "19px", ty: "46px", fall: "105px", offset: 0.01, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "s5", tx: "0px", ty: "50px", fall: "125px", offset: 0.03, shape: "h-[3px] w-[3px] rounded-full" },
  { id: "s6", tx: "-19px", ty: "46px", fall: "100px", offset: 0.05, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "s7", tx: "-35px", ty: "35px", fall: "118px", offset: 0.02, shape: "h-1 w-1 rounded-full" },
  { id: "s8", tx: "-46px", ty: "19px", fall: "98px", offset: 0.06, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "s9", tx: "-50px", ty: "0px", fall: "92px", offset: 0.03, shape: "h-[3px] w-[3px] rounded-full" },
  { id: "s10", tx: "-46px", ty: "-19px", fall: "112px", offset: 0.01, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "s11", tx: "-35px", ty: "-35px", fall: "124px", offset: 0.04, shape: "h-1 w-1 rounded-full" },
  { id: "s12", tx: "-19px", ty: "-46px", fall: "115px", offset: 0.06, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "s13", tx: "0px", ty: "-50px", fall: "120px", offset: 0, shape: "h-[3px] w-[3px] rounded-full" },
  { id: "s14", tx: "19px", ty: "-46px", fall: "108px", offset: 0.03, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "s15", tx: "35px", ty: "-35px", fall: "122px", offset: 0.05, shape: "h-1 w-1 rounded-full" },
  { id: "s16", tx: "46px", ty: "-19px", fall: "104px", offset: 0.02, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "m1", tx: "30px", ty: "-10px", fall: "88px", offset: 0.04, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "m2", tx: "26px", ty: "16px", fall: "96px", offset: 0.07, shape: "h-[3px] w-[3px] rounded-full" },
  { id: "m3", tx: "12px", ty: "28px", fall: "90px", offset: 0.05, shape: "h-[2px] w-[2px] rounded-full" },
  { id: "m4", tx: "-12px", ty: "28px", fall: "98px", offset: 0.08, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "m5", tx: "-26px", ty: "16px", fall: "86px", offset: 0.03, shape: "h-[3px] w-[3px] rounded-full" },
  { id: "m6", tx: "-30px", ty: "-10px", fall: "92px", offset: 0.06, shape: "h-[2px] w-[2px] rounded-full" },
  { id: "m7", tx: "-18px", ty: "-26px", fall: "84px", offset: 0.04, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "m8", tx: "0px", ty: "-30px", fall: "94px", offset: 0.07, shape: "h-[2.5px] w-[2.5px] rounded-full" },
  { id: "m9", tx: "18px", ty: "-26px", fall: "85px", offset: 0.05, shape: "h-[2px] w-[2px] rounded-full" },
  { id: "i1", tx: "12px", ty: "-8px", fall: "75px", offset: 0.08, shape: "h-[2px] w-[2px] rounded-full" },
  { id: "i2", tx: "-10px", ty: "8px", fall: "78px", offset: 0.09, shape: "h-[2px] w-[2px] rounded-full" },
  { id: "i3", tx: "2px", ty: "14px", fall: "82px", offset: 0.06, shape: "h-[2px] w-[2px] rounded-full" },
];

export function LightFireworksBackground() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 block overflow-hidden dark:hidden"
    >
      {BURSTS.map((burst, burstIndex) => {
        const baseDelay = Number.parseFloat(burst.delay);

        return (
          <div key={burst.id} className={`absolute ${burst.pos}`}>
            <span
              style={{ animationDelay: burst.delay }}
              className={`animate-firework-ring motion-reduce:hidden absolute -top-2 -left-2 h-4 w-4 rounded-full border ${burst.ring}`}
            />

            {SPARKS.map((spark, sparkIndex) => {
              const colorClass =
                burst.colors[(burstIndex + sparkIndex) % burst.colors.length];
              const style: SparkStyle = {
                "--tx": spark.tx,
                "--ty": spark.ty,
                "--fall": spark.fall,
                animationDelay: `${(baseDelay + spark.offset).toFixed(2)}s`,
              };

              return (
                <span
                  key={spark.id}
                  style={style}
                  className={`animate-firework-spark motion-reduce:hidden absolute opacity-0 ${spark.shape} ${colorClass}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}