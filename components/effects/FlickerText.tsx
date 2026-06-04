import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FlickerTextProps = ComponentPropsWithoutRef<"span"> & {
  children: ReactNode;
};

export function FlickerText({ children, className, ...props }: FlickerTextProps) {
  const label = typeof children === "string" ? children : undefined;

  return (
    <span className={cn("cyber-flicker", className)} data-text={label} {...props}>
      {children}
    </span>
  );
}
