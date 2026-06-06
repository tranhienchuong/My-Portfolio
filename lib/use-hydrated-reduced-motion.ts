"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const hasMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return hasMounted && Boolean(prefersReducedMotion);
}
