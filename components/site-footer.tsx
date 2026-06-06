import { Container } from "@/components/ui/container";
import { profile } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col gap-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1">
            {profile.role} making tools, interfaces, stories, and honest experiments.
          </p>
          <p className="mt-1">&copy; {new Date().getFullYear()} {profile.name}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {profile.socials.map((social) => (
            <a
              aria-label={`Visit ${profile.name} on ${social.label}`}
              className="transition-colors hover:text-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
              href={social.href}
              key={social.label}
              rel="noreferrer"
              target="_blank"
            >
              {social.label}
            </a>
          ))}
          <a
            className="transition-colors hover:text-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
            href={`mailto:${profile.email}`}
          >
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
