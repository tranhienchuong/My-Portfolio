import type { CSSProperties } from "react";

const particles = [
  { left: "8%", top: "18%", size: 2, delay: "-1.2s", duration: "18s", x: "18px" },
  { left: "14%", top: "72%", size: 1, delay: "-7.5s", duration: "22s", x: "-14px" },
  { left: "21%", top: "38%", size: 2, delay: "-4.1s", duration: "20s", x: "12px" },
  { left: "28%", top: "84%", size: 1, delay: "-10s", duration: "24s", x: "-18px" },
  { left: "35%", top: "22%", size: 1, delay: "-2.7s", duration: "19s", x: "16px" },
  { left: "42%", top: "66%", size: 2, delay: "-13s", duration: "26s", x: "-12px" },
  { left: "49%", top: "44%", size: 1, delay: "-5.8s", duration: "21s", x: "20px" },
  { left: "56%", top: "78%", size: 2, delay: "-9.3s", duration: "23s", x: "-16px" },
  { left: "63%", top: "28%", size: 1, delay: "-3.4s", duration: "18s", x: "14px" },
  { left: "70%", top: "58%", size: 2, delay: "-11.4s", duration: "25s", x: "-20px" },
  { left: "77%", top: "16%", size: 1, delay: "-6.6s", duration: "20s", x: "18px" },
  { left: "84%", top: "74%", size: 2, delay: "-14.2s", duration: "27s", x: "-10px" },
  { left: "91%", top: "34%", size: 1, delay: "-8.1s", duration: "22s", x: "12px" },
  { left: "17%", top: "52%", size: 1, delay: "-12.6s", duration: "24s", x: "-18px" },
  { left: "68%", top: "88%", size: 1, delay: "-15.3s", duration: "28s", x: "16px" },
];

export function ParticleBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block motion-reduce:hidden"
    >
      <div className="absolute inset-0 opacity-55 mix-blend-screen">
        {particles.map((particle) => (
          <span
            className="cyber-particle absolute rounded-full bg-neon-cyan shadow-[0_0_14px_hsl(var(--neon-cyan)/0.45)]"
            key={`${particle.left}-${particle.top}`}
            style={
              {
                "--particle-x": particle.x,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                height: `${particle.size}px`,
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
