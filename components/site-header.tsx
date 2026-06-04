import Link from "next/link";
import { Container } from "@/components/ui/container";
import { profile } from "@/lib/portfolio";

const navItems = [
  { label: "Projects", href: "#work" },
  { label: "Case Study", href: "#case-study" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link className="text-sm font-semibold text-foreground drop-shadow-[0_0_18px_hsl(var(--neon-cyan)/0.35)]" href="/">
          {profile.name}
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
