"use client";

import Lenis from "lenis";
import type { ReactNode } from "react";
import { useEffect } from "react";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.45,
      easing: (time) => 1 - Math.pow(1 - time, 3),
      smoothWheel: true,
      wheelMultiplier: 1.25,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return children;
}
