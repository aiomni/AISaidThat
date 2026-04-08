import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center rounded-full border font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    size === "md" && "h-11 px-5 text-sm",
    size === "lg" && "h-12 px-6 text-sm",
    variant === "primary" &&
      "border-[color:var(--ink)] bg-[var(--ink)] text-white shadow-[0_10px_20px_rgba(31,26,20,0.12)] hover:-translate-y-0.5 hover:bg-black",
    variant === "secondary" &&
      "border-[color:var(--ink)]/15 bg-white/70 text-[color:var(--ink)] backdrop-blur hover:-translate-y-0.5 hover:bg-white",
    variant === "ghost" &&
      "border-transparent bg-transparent text-[color:var(--ink)] hover:bg-black/5",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      type={type}
      {...props}
    />
  );
}
