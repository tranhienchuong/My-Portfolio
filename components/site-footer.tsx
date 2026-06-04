import { Container } from "@/components/ui/container";
import { profile } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>{profile.location}</p>
      </Container>
    </footer>
  );
}
