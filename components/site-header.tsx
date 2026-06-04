import Link from "next/link";
import { Container } from "@/components/ui/container";
import { profile } from "@/lib/portfolio";

const navItems = [
  { label: "Projects", href: "/#work" },
  { label: "Case Study", href: "/#case-study" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-x-5 gap-y-2 py-3">
        <Link
          aria-label={`${profile.name} homepage`}
          className="text-sm font-semibold text-foreground drop-shadow-[0_0_18px_hsl(var(--neon-cyan)/0.35)] focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
          href="/"
        >
          {profile.name}
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex max-w-full items-center gap-4 overflow-x-auto text-nowrap pb-1 md:gap-7 md:overflow-visible md:pb-0"
        >
          {navItems.map((item) => (
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
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
