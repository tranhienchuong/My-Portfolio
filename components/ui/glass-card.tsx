"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type GlassCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  keyof HTMLMotionProps<"div">
> &
  Omit<HTMLMotionProps<"div">, "children"> & {
    children: ReactNode;
    interactive?: boolean;
  };

export function GlassCard({
  className,
  children,
  interactive = false,
  ...props
}: GlassCardProps) {
  const reduceMotion = useReducedMotion();
  const hoverProps =
    interactive && !reduceMotion
      ? {
          whileHover: { y: -6, scale: 1.015, rotateX: 1.5, rotateY: -1.5 },
          transition: { type: "spring" as const, stiffness: 260, damping: 22 },
        }
      : {};

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] shadow-soft backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/12 before:via-transparent before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:border after:border-white/[0.035]",
        interactive && "transform-gpu hover:border-neon-cyan/45",
        className,
      )}
      {...hoverProps}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
