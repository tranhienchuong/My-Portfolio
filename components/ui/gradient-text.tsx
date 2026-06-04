import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type GradientTextProps = ComponentPropsWithoutRef<"span">;

export function GradientText({ className, children, ...props }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
