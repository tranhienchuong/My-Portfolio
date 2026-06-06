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
        "relative inline-flex h-11 transform-gpu select-none items-center justify-center overflow-hidden rounded-md px-5 text-sm font-semibold transition-[background-color,border-color,box-shadow,color,filter] duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background",
        variant === "primary"
          ? "bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-white shadow-[0_0_26px_hsl(var(--neon-cyan)/0.2),0_0_46px_hsl(var(--neon-purple)/0.14)] hover:brightness-110 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.26),0_0_58px_hsl(var(--neon-pink)/0.16)]"
          : "border border-white/12 bg-white/[0.045] text-foreground shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)] backdrop-blur-sm hover:border-neon-cyan/45 hover:bg-white/[0.07] hover:text-white sm:backdrop-blur-md",
        className,
      )}
      href={href}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      whileHover={reduceMotion ? undefined : { scale: 1.018, y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985, y: 0 }}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
