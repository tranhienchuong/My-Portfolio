import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  href,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
        variant === "primary"
          ? "bg-accent text-accent-foreground hover:bg-accent/90"
          : "border border-border bg-transparent text-foreground hover:bg-muted",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
