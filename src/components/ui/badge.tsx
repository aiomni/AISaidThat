import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color:var(--ink)]/10 bg-white/70 px-3 py-1 text-xs font-medium tracking-[0.14em] uppercase text-[color:var(--muted)]",
        className,
      )}
      {...props}
    />
  );
}

