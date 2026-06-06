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
    performance?: boolean;
  };

export function GlassCard({
  className,
  children,
  interactive = false,
  performance = false,
  ...props
}: GlassCardProps) {
  const reduceMotion = useReducedMotion();
  const hoverProps =
    interactive && !performance && !reduceMotion
      ? {
          whileHover: { y: -4, scale: 1.01 },
          transition: { type: "spring" as const, stiffness: 260, damping: 24 },
        }
      : {};

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/[0.09] transition-[background-color,border-color,box-shadow] duration-200",
        performance
          ? "bg-white/[0.045] shadow-[0_20px_58px_hsl(240_70%_4%_/_0.32),0_0_30px_hsl(var(--neon-cyan)/0.08)] backdrop-blur-sm"
          : "bg-white/[0.046] shadow-[0_18px_52px_hsl(260_70%_4%_/_0.32)] backdrop-blur-sm sm:backdrop-blur-md",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:border after:border-white/[0.03]",
        interactive &&
          !performance &&
          "transform-gpu hover:border-neon-cyan/35 hover:bg-white/[0.058] hover:shadow-[0_20px_58px_hsl(260_70%_4%_/_0.38),0_0_22px_hsl(var(--neon-cyan)/0.08)]",
        className,
      )}
      {...hoverProps}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
