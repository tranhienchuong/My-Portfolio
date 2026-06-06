"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  twinkleSpeed: number;
  color: string;
};

type ShootingStar = {
  startX: number;
  startY: number;
  travelX: number;
  travelY: number;
  length: number;
  width: number;
  maxAlpha: number;
  color: string;
  startedAt: number;
  duration: number;
};

const palette = [
  "185 100% 58%",
  "214 100% 65%",
  "265 100% 68%",
  "322 100% 64%",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-3.5, 6),
    vy: randomBetween(-8, -2),
    radius: randomBetween(0.45, 1.35),
    alpha: randomBetween(0.14, 0.34),
    phase: Math.random() * Math.PI * 2,
    twinkleSpeed: randomBetween(0.0006, 0.0016),
    color: palette[Math.floor(Math.random() * palette.length)],
  };
}

function getShootingStarDelay(width: number) {
  return width < 640 ? randomBetween(5000, 8000) : randomBetween(2500, 5000);
}

function createShootingStar(width: number, height: number, startedAt: number): ShootingStar {
  const isMobile = width < 640;
  const length = isMobile ? randomBetween(64, 108) : randomBetween(106, 184);

  return {
    startX: randomBetween(-width * 0.08, width * 0.58),
    startY: randomBetween(height * 0.04, height * 0.38),
    travelX: randomBetween(width * 0.34, width * 0.52),
    travelY: randomBetween(height * 0.16, height * 0.28),
    length,
    width: isMobile ? randomBetween(0.85, 1.18) : randomBetween(1, 1.5),
    maxAlpha: randomBetween(0.75, 0.85),
    color: palette[Math.floor(Math.random() * palette.length)],
    startedAt,
    duration: randomBetween(900, 1350),
  };
}

function AnimatedStarLayer({ reduceMotion }: { reduceMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      reduceMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !context) {
      return undefined;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let lastTime = performance.now();
    let nextShootingStarAt = lastTime + getShootingStarDelay(window.innerWidth);
    let shootingStars: ShootingStar[] = [];
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = width < 640 ? 0 : width < 1024 ? 24 : 40;
      particles = Array.from({ length: particleCount }, () =>
        createParticle(width, height),
      );
    };

    const drawParticle = (particle: Particle, time: number, deltaSeconds: number) => {
      particle.x += particle.vx * deltaSeconds;
      particle.y += particle.vy * deltaSeconds;

      if (particle.y < -8) {
        particle.y = height + 8;
        particle.x = Math.random() * width;
      }

      if (particle.x < -8) {
        particle.x = width + 8;
      } else if (particle.x > width + 8) {
        particle.x = -8;
      }

      const twinkle = 0.72 + Math.sin(time * particle.twinkleSpeed + particle.phase) * 0.28;
      const alpha = particle.alpha * twinkle;

      context.beginPath();
      context.fillStyle = `hsl(${particle.color} / ${alpha})`;
      context.shadowColor = `hsl(${particle.color} / ${alpha * 0.75})`;
      context.shadowBlur = particle.radius > 0.9 ? 8 : 3;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    };

    const drawShootingStars = (time: number) => {
      const maxActiveStars = width < 640 ? 2 : 3;

      if (time > nextShootingStarAt) {
        if (shootingStars.length < maxActiveStars) {
          shootingStars = [...shootingStars, createShootingStar(width, height, time)];
        }

        nextShootingStarAt = time + getShootingStarDelay(width);
      }

      if (shootingStars.length === 0) {
        return;
      }

      shootingStars = shootingStars.filter((shootingStar) => {
        const progress = (time - shootingStar.startedAt) / shootingStar.duration;

        if (progress >= 1) {
          return false;
        }

        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const headX = shootingStar.startX + shootingStar.travelX * easedProgress;
        const headY = shootingStar.startY + shootingStar.travelY * easedProgress;
        const tailX = headX - shootingStar.length;
        const tailY = headY - shootingStar.length * 0.42;
        const alpha = Math.sin(progress * Math.PI) * shootingStar.maxAlpha;
        const gradient = context.createLinearGradient(tailX, tailY, headX, headY);

        gradient.addColorStop(0, `hsl(${shootingStar.color} / 0)`);
        gradient.addColorStop(0.62, `hsl(${shootingStar.color} / ${alpha * 0.36})`);
        gradient.addColorStop(0.88, `hsl(${shootingStar.color} / ${alpha * 0.72})`);
        gradient.addColorStop(1, `hsl(${shootingStar.color} / ${alpha})`);

        context.beginPath();
        context.strokeStyle = gradient;
        context.lineWidth = shootingStar.width;
        context.shadowColor = `hsl(${shootingStar.color} / ${alpha * 0.74})`;
        context.shadowBlur = width < 640 ? 18 : 24;
        context.moveTo(tailX, tailY);
        context.lineTo(headX, headY);
        context.stroke();

        context.beginPath();
        context.fillStyle = `hsl(${shootingStar.color} / ${alpha * 0.82})`;
        context.shadowBlur = width < 640 ? 16 : 22;
        context.arc(headX, headY, shootingStar.width * 1.45, 0, Math.PI * 2);
        context.fill();

        return true;
      });
    };

    const animate = (time: number) => {
      const deltaSeconds = Math.min(48, time - lastTime) / 1000;
      lastTime = time;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => drawParticle(particle, time, deltaSeconds));
      drawShootingStars(time);

      context.shadowBlur = 0;
      context.globalCompositeOperation = "source-over";
      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      className="absolute inset-0 h-full w-full opacity-70 motion-reduce:hidden"
      ref={canvasRef}
    />
  );
}

export function AnimatedBackground() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatedStarLayer reduceMotion={reduceMotion} />
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
