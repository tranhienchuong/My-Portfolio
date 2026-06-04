"use client";

import { motion, useReducedMotion } from "motion/react";

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, hsl(var(--neon-cyan) / 0.16), transparent 28rem), radial-gradient(circle at 82% 12%, hsl(var(--neon-purple) / 0.16), transparent 30rem), radial-gradient(circle at 68% 74%, hsl(var(--neon-pink) / 0.12), transparent 34rem)",
          backgroundSize: "130% 130%",
        }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.14, 0.22, 0.14] }}
        className="absolute inset-x-0 top-0 h-2/3 bg-[linear-gradient(115deg,transparent,theme(colors.neon.cyan/0.08),transparent,theme(colors.neon.pink/0.07),transparent)] blur-2xl sm:blur-3xl"
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
