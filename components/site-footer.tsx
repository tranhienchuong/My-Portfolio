import { Container } from "@/components/ui/container";
import { profile } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-background/45 py-10 sm:py-12">
      <Container className="flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-base font-semibold text-foreground">{profile.name}</p>
          <p className="mt-2 leading-6">
            {profile.role} making tools, interfaces, stories, and honest experiments.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.socials.map((social) => (
            <a
              aria-label={`Visit ${profile.name} on ${social.label}`}
              className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-neon-cyan/35 hover:bg-neon-cyan/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
              href={social.href}
              key={social.label}
              rel="noreferrer"
              target="_blank"
            >
              {social.label}
            </a>
          ))}
          <a
            className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-neon-cyan/35 hover:bg-neon-cyan/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
            href={`mailto:${profile.email}`}
          >
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
