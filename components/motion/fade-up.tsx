"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
};

export function FadeUp({
  children,
  className,
  once = true,
}: FadeUpProps) {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      variants={reduceMotion ? undefined : fadeUp}
      viewport={reduceMotion ? undefined : { once, amount: 0.2 }}
      whileInView={reduceMotion ? undefined : "visible"}
    >
      {children}
    </motion.div>
  );
}
