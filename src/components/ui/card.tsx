import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-[color:var(--ink)]/10 bg-white/75 shadow-[0_18px_50px_rgba(31,26,20,0.08)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
