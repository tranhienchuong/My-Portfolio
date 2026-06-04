"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !parallaxRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
    });

    return () => {
      context.revert();
    };
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        ref={parallaxRef}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0% 0%", "100% 45%", "0% 0%"] }
        }
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, hsl(var(--neon-cyan) / 0.16), transparent 28rem), radial-gradient(circle at 82% 12%, hsl(var(--neon-purple) / 0.16), transparent 30rem), radial-gradient(circle at 68% 74%, hsl(var(--neon-pink) / 0.12), transparent 34rem)",
          backgroundSize: "130% 130%",
        }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.18, 0.32, 0.18] }}
        className="absolute inset-x-0 top-0 h-2/3 bg-[linear-gradient(115deg,transparent,theme(colors.neon.cyan/0.08),transparent,theme(colors.neon.pink/0.07),transparent)] blur-3xl"
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
