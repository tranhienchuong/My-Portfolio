"use client";

import { useEffect, useRef, useState } from "react";

export function CyberCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const touchQuery = window.matchMedia("(hover: none)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () =>
      setEnabled(
        pointerQuery.matches &&
          !touchQuery.matches &&
          !reducedMotionQuery.matches,
      );

    updateEnabled();
    pointerQuery.addEventListener("change", updateEnabled);
    touchQuery.addEventListener("change", updateEnabled);
    reducedMotionQuery.addEventListener("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled);
      touchQuery.removeEventListener("change", updateEnabled);
      reducedMotionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("cyber-cursor-enabled");
      return undefined;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      return undefined;
    }

    let frameId = 0;
    let isPressed = false;
    let isHoveringInteractive = false;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trailing = { x: mouse.x, y: mouse.y };

    document.body.classList.add("cyber-cursor-enabled");

    const setOpacity = (opacity: string) => {
      dot.style.opacity = opacity;
      ring.style.opacity = opacity;
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      isHoveringInteractive = Boolean(
        target?.closest("a, button, [role='button']"),
      );
      setOpacity("1");
    };

    const handlePointerDown = () => {
      isPressed = true;
    };

    const handlePointerUp = () => {
      isPressed = false;
    };

    const handlePointerLeave = () => {
      setOpacity("0");
    };

    const animate = () => {
      trailing.x += (mouse.x - trailing.x) * 0.18;
      trailing.y += (mouse.y - trailing.y) * 0.18;

      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      dot.style.boxShadow = isHoveringInteractive
        ? "0 0 18px hsl(var(--neon-cyan) / 0.95), 0 0 32px hsl(var(--neon-purple) / 0.34)"
        : "0 0 16px hsl(var(--neon-cyan) / 0.72)";
      ring.style.borderColor = isHoveringInteractive
        ? "hsl(var(--neon-cyan) / 0.42)"
        : "hsl(var(--neon-cyan) / 0.24)";
      ring.style.boxShadow = isHoveringInteractive
        ? "0 0 30px hsl(var(--neon-cyan) / 0.26), 0 0 48px hsl(var(--neon-purple) / 0.18)"
        : "0 0 20px hsl(var(--neon-cyan) / 0.14), 0 0 34px hsl(var(--neon-purple) / 0.1)";
      ring.style.transform = `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%) scale(${isPressed ? 0.76 : isHoveringInteractive ? 1.18 : 1})`;

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.body.classList.remove("cyber-cursor-enabled");
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-neon-cyan opacity-0 shadow-[0_0_18px_hsl(var(--neon-cyan)/0.75)] will-change-transform"
        ref={dotRef}
      />
      <div
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-neon-cyan/25 bg-neon-purple/[0.025] opacity-0 shadow-[0_0_20px_hsl(var(--neon-cyan)/0.14),0_0_34px_hsl(var(--neon-purple)/0.1)] transition-[border-color,box-shadow] duration-200 will-change-transform"
        ref={ringRef}
      />
    </div>
  );
}
