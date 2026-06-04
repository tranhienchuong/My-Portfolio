"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/motion";

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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={fadeUp}
      viewport={{ once, amount: 0.24 }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}
