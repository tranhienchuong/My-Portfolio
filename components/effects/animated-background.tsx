export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(circle at 16% 18%, hsl(var(--neon-cyan) / 0.13), transparent 27rem), radial-gradient(circle at 84% 10%, hsl(var(--neon-purple) / 0.12), transparent 29rem), radial-gradient(circle at 70% 78%, hsl(var(--neon-pink) / 0.1), transparent 32rem)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.12) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.12) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(circle at 50% 20%, black, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.26) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black, transparent 78%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
