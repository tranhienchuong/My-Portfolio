"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type GlowButtonProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  keyof HTMLMotionProps<"a">
> &
  Omit<HTMLMotionProps<"a">, "children" | "href"> & {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function GlowButton({
  className,
  href,
  variant = "primary",
  children,
  ...props
}: GlowButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionLink
      className={cn(
        "relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-5 text-sm font-semibold transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background",
        variant === "primary"
          ? "bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-white shadow-glow hover:brightness-110"
          : "border border-white/12 bg-white/[0.055] text-foreground backdrop-blur-md hover:border-neon-cyan/50 hover:bg-white/[0.08] sm:backdrop-blur-xl",
        className,
      )}
      href={href}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      whileHover={reduceMotion ? undefined : { scale: 1.035, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
